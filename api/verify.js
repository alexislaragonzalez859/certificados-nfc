import { google } from 'googleapis';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = '1pyawaq2WTNLDOwMn5CZXBW8k_4I6KhW_5bYCZpuTtjU';

  if (req.method === 'GET') {
    const { uid } = req.query;
    if (!uid) return res.status(400).json({ error: 'UID requerido' });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Hoja1!A:F',
    });

    const rows = response.data.values || [];
    const chip = rows.find(row => row[0]?.trim() === uid.trim());

    if (!chip) return res.status(404).json({ found: false });

    return res.status(200).json({
      found: true,
      diseño: chip[1] || null,
      talla: chip[2] || null,
      serie: chip[3] || null,
      nombre: chip[4] || null,
    });
  }

  if (req.method === 'POST') {
    const { uid, nombre, codigo } = req.body;
    if (!uid || !nombre || !codigo) return res.status(400).json({ error: 'Faltan datos' });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Hoja1!A:F',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0]?.trim() === uid.trim());

    if (rowIndex === -1) return res.status(404).json({ found: false });
    if (rows[rowIndex][4]) return res.status(400).json({ error: 'Ya registrado' });

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Hoja1!E${rowIndex + 1}:F${rowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[nombre, codigo]] },
    });

    return res.status(200).json({ success: true });
  }
}
