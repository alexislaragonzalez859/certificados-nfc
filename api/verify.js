export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID requerido" });
  }

  const sheetId = "1pyawaq2WTNLDOwMn5CZXBW8k_4I6KhW_5bYCZpuTtjU";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Hoja1`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const clean = text.replace("/*O_o*/", "").replace("google.visualization.Query.setResponse(", "").slice(0, -2);
    const json = JSON.parse(clean);
    const rows = json.table.rows;

    const chip = rows.find(row => row.c[0]?.v?.toString().trim() === uid.trim());

    if (!chip) {
      return res.status(404).json({ found: false });
    }

    return res.status(200).json({
      found: true,
      diseño: chip.c[1]?.v || null,
      talla: chip.c[2]?.v || null,
      serie: chip.c[3]?.v || null,
      nombre: chip.c[4]?.v || null,
    });
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
}
