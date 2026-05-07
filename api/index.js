export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verificar Autenticidad — Autodoping</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;font-family:'Oswald',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
.wrap{background:#0a0a0a;width:100%;max-width:420px;padding:2rem 1.5rem;border:0.5px solid #222;border-radius:12px}
.logo{text-align:center;margin-bottom:1.5rem}
.logo-text{font-size:28px;font-weight:700;color:#fff;letter-spacing:2px;text-transform:uppercase}
.logo-sub{font-size:11px;color:#666;letter-spacing:4px;text-transform:uppercase;margin-top:4px}
hr{border:none;border-top:1px solid #222;margin:1rem 0}
.screen{display:none}.screen.active{display:block}
.status-card{border:1px solid #222;border-radius:12px;padding:1.5rem;margin-bottom:1rem;text-align:center}
.status-title{font-size:22px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:0.5rem}
.status-sub{font-size:13px;color:#888;letter-spacing:1px;text-transform:uppercase}
.info-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:0.5px solid #1a1a1a}
.info-row:last-child{border-bottom:none}
.info-label{font-size:11px;color:#666;letter-spacing:2px;text-transform:uppercase}
.info-value{font-size:14px;color:#fff}
.owner-badge{background:#111;border:1px solid #333;border-radius:8px;padding:1rem;margin:1rem 0;display:flex;align-items:center;gap:12px}
.owner-avatar{width:40px;height:40px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#000;flex-shrink:0}
.owner-name{font-size:16px;color:#fff;font-weight:700;letter-spacing:1px}
.owner-label{font-size:10px;color:#666;letter-spacing:2px;text-transform:uppercase;margin-top:2px}
.form-group{margin-bottom:1rem}
.form-label{font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;display:block}
.form-input{width:100%;background:#111;border:1px solid #333;border-radius:8px;padding:12px 14px;color:#fff;font-family:'Oswald',sans-serif;font-size:15px;outline:none}
.form-input:focus{border-color:#fff}
.form-hint{font-size:11px;color:#555;margin-top:4px;letter-spacing:1px}
.btn{width:100%;padding:14px;border:1px solid #fff;background:transparent;color:#fff;font-family:'Oswald',sans-serif;font-size:14px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-radius:8px;cursor:pointer;margin-top:0.5rem}
.btn:hover{background:#fff;color:#000}
.alert-box{background:#0d0d0d;border:1px solid #333;border-radius:12px;padding:1.5rem;text-align:center;margin-bottom:1rem}
.alert-code{font-size:32px;font-weight:700;color:#fff;letter-spacing:6px;background:#111;border:1px dashed #444;border-radius:8px;padding:1rem;margin:1rem 0}
.alert-warning{font-size:12px;color:#ff4444;letter-spacing:1px;text-transform:uppercase;margin-top:0.5rem}
.no-uid{text-align:center;padding:2rem 0}
.no-uid-text{font-size:14px;color:#666;letter-spacing:1px;text-transform:uppercase;line-height:1.8}
.whatsapp-btn{width:100%;padding:14px;background:#128C7E;border:none;color:#fff;font-family:'Oswald',sans-serif;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:8px;cursor:pointer;margin-top:0.5rem;display:flex;align-items:center;justify-content:center;gap:8px}
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">
    <div class="logo-text">⬛ Autodoping</div>
    <div class="logo-sub">Verificación de autenticidad</div>
  </div>
  <hr>
  <div id="screen-loading" class="screen active" style="text-align:center;padding:2rem 0">
    <i class="ti ti-loader" style="font-size:32px;color:#444"></i>
    <p style="color:#666;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-top:1rem">Verificando chip...</p>
  </div>
  <div id="screen-no-uid" class="screen">
    <div class="no-uid">
      <i class="ti ti-nfc" style="font-size:48px;color:#333"></i>
      <p class="no-uid-text" style="margin-top:1rem">Escanea el chip NFC<br>de tu prenda para continuar</p>
    </div>
  </div>
  <div id="screen-not-found" class="screen">
    <div class="status-card" style="border-color:#8B0000">
      <i class="ti ti-circle-x" style="font-size:48px;color:#ff4444"></i>
      <div class="status-title" style="color:#ff4444;margin-top:1rem">No autenticado</div>
      <div class="status-sub">Este chip no está registrado</div>
    </div>
    <p style="font-size:12px;color:#555;text-align:center;letter-spacing:1px;line-height:1.6">Compra únicamente en canales oficiales de Autodoping.</p>
  </div>
  <div id="screen-register" class="screen">
    <div class="status-card" style="border-color:#333;margin-bottom:1.5rem">
      <i class="ti ti-shield-check" style="font-size:48px;color:#fff"></i>
      <div class="status-title" style="margin-top:1rem">Prenda auténtica</div>
      <div class="status-sub">Registra tu certificado</div>
    </div>
    <div class="form-group">
      <label class="form-label">Tu nombre completo</label>
      <input type="text" class="form-input" id="input-name" placeholder="Ej. Carlos Ramírez">
    </div>
    <div class="form-group">
      <label class="form-label">Crear código de transferencia</label>
      <input type="text" class="form-input" id="input-code1" placeholder="Crea un código secreto">
      <p class="form-hint">Lo necesitarás si quieres revender esta prenda.</p>
    </div>
    <div class="form-group">
      <label class="form-label">Confirmar código</label>
      <input type="text" class="form-input" id="input-code2" placeholder="Repite tu código">
    </div>
    <button class="btn" onclick="registerCert()">Registrar certificado</button>
  </div>
  <div id="screen-code-reveal" class="screen">
    <div class="alert-box">
      <i class="ti ti-alert-triangle" style="font-size:32px;color:#ff4444"></i>
      <p style="font-size:13px;color:#fff;letter-spacing:1px;text-transform:uppercase;margin-top:1rem;font-weight:700">⚠️ Toma captura ahora</p>
      <p style="font-size:11px;color:#666;margin-top:0.5rem;letter-spacing:1px">Esta es la única vez que verás tu código</p>
      <div class="alert-code" id="reveal-code">———</div>
      <p class="alert-warning">Sin este código no podemos ayudarte en soporte</p>
    </div>
    <button class="btn" onclick="showCertificate()">Ya tomé captura, continuar</button>
  </div>
  <div id="screen-certified" class="screen">
    <div class="status-card" style="border-color:#1a3a1a">
      <i class="ti ti-rosette-discount-check" style="font-size:48px;color:#4CAF50"></i>
      <div class="status-title" style="color:#4CAF50;margin-top:1rem">Certificado</div>
      <div class="status-sub">Prenda 100% auténtica de Autodoping</div>
    </div>
    <div class="owner-badge">
      <div class="owner-avatar" id="cert-avatar">AU</div>
      <div>
        <div class="owner-name" id="cert-name">—</div>
        <div class="owner-label">Dueño del certificado</div>
      </div>
    </div>
    <div style="background:#0d0d0d;border:0.5px solid #1a1a1a;border-radius:8px;padding:1rem;margin-bottom:1rem">
      <div class="info-row"><span class="info-label">Diseño</span><span class="info-value" id="cert-diseno">—</span></div>
      <div class="info-row"><span class="info-label">Talla</span><span class="info-value" id="cert-talla">—</span></div>
      <div class="info-row"><span class="info-label">Serie</span><span class="info-value" id="cert-serie">—</span></div>
    </div>
    <button class="whatsapp-btn" onclick="openWhatsApp()">
      <i class="ti ti-brand-whatsapp" style="font-size:20px"></i>
      Transferir certificado — $100
    </button>
    <p style="font-size:10px;color:#444;text-align:center;letter-spacing:1px;margin-top:8px;text-transform:uppercase">Necesitarás tu código de transferencia</p>
  </div>
</div>
<script>
const VERCEL='https://certificados-1wnro6m4z-alexislaragonzalez859-8144s-projects.vercel.app';
const WA='524494802870';
let currentUID=null,currentData=null,pendingName='',pendingCode='';
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
function getInitials(n){return n.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase()}
async function init(){
  const uid=new URLSearchParams(window.location.search).get('uid');
  if(!uid){show('screen-no-uid');return}
  currentUID=uid;
  try{
    const res=await fetch(VERCEL+'/api/verify?uid='+uid);
    const data=await res.json();
    if(!data.found){show('screen-not-found');return}
    currentData=data;
    if(!data.nombre){show('screen-register')}
    else{populateCert(data);show('screen-certified')}
  }catch(e){show('screen-not-found')}
}
function populateCert(d){
  document.getElementById('cert-name').textContent=d.nombre||'—';
  document.getElementById('cert-avatar').textContent=getInitials(d.nombre||'AU');
  document.getElementById('cert-diseno').textContent=d.diseño||'—';
  document.getElementById('cert-talla').textContent=d.talla||'—';
  document.getElementById('cert-serie').textContent=d.serie||'—';
}
function registerCert(){
  const name=document.getElementById('input-name').value.trim();
  const code1=document.getElementById('input-code1').value.trim();
  const code2=document.getElementById('input-code2').value.trim();
  if(!name){alert('Ingresa tu nombre');return}
  if(!code1){alert('Crea un código de transferencia');return}
  if(code1!==code2){alert('Los códigos no coinciden');return}
  pendingName=name;pendingCode=code1;
  document.getElementById('reveal-code').textContent=code1;
  show('screen-code-reveal');
}
function showCertificate(){
  if(currentData){currentData.nombre=pendingName;populateCert(currentData)}
  show('screen-certified');
}
function openWhatsApp(){
  const msg=encodeURIComponent('Hola, quiero transferir mi certificado Autodoping.\\nUID: '+currentUID);
  window.open('https://wa.me/'+WA+'?text='+msg,'_blank');
}
init();
</script>
</body>
</html>`);
}
