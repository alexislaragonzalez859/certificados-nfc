export default async function handler(req, res) {
  const { uid } = req.query;

  if (!uid) {
    return res.status(400).json({ error: "UID requerido" });
  }

  const sheetId = "1pyawaq2WTNLDOwMn5CZXBW8k_4I6KhW_5bYCZpuTtjU";
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

  const response = await fetch(url);
  const text = await response.text();
  const json = JSON.parse(text.substr(47).slice(0, -2));
  const rows = json.table.rows;

  const chip = rows.find(row => row.c[0]?.v === uid);

  if (!chip) {
    return res.status(404).json({ found: false });
  }

  return res.status(200).json({
    found: true,
    diseño: chip.c[1]?.v,
    talla: chip.c[2]?.v,
    serie: chip.c[3]?.v,
    nombre: chip.c[4]?.v,
  });
}
