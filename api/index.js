export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verificar Autenticidad — Autodoping</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#000;min-height:100vh;display:flex;align-items:flex-start;justify-content:center}
.wrap{width:100%;min-height:100vh;position:relative;background:#1a1a1a}
.bg-img{position:fixed;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.85;z-index:0}
.overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.05) 25%,rgba(0,0,0,0.6) 55%,rgba(0,0,0,0.97) 72%);z-index:1}
.content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:16px 24px 40px}
.top-bar{width:100%;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
.shop-btn{font-family:'Oswald',sans-serif;font-size:10px;color:#fff;letter-spacing:2px;text-transform:uppercase;text-decoration:none;border:0.5px solid rgba(255,255,255,0.3);padding:6px 12px;border-radius:6px}
.shop-btn:hover{background:rgba(255,255,255,0.1)}
.brand-header{display:flex;flex-direction:column;align-items:center;gap:0px}
.brand-logo{width:52px;height:52px;object-fit:contain;margin-bottom:6px}
.brand-title-img{width:80px;object-fit:contain;margin-top:-10px;mix-blend-mode:screen}
.brand-sub{font-family:'Oswald',sans-serif;font-size:9px;color:#aaa;letter-spacing:5px;text-transform:uppercase;margin-top:4px;text-align:center}
.divider{width:60%;height:0.5px;background:rgba(255,255,255,0.2);margin:4px auto}
.shirt-wrap{width:280px;height:280px;display:flex;align-items:center;justify-content:center;margin:-40px auto 0}
.shirt-img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 20px 50px rgba(0,0,0,0.9));animation:float 4s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
.cert-badge{font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#fff;margin:16px 0 4px;text-align:center}
.cert-name{font-family:'Oswald',sans-serif;font-size:20px;color:#fff;text-align:center;font-weight:400;letter-spacing:1px}
.cert-owner{font-family:'Oswald',sans-serif;font-size:9px;color:#777;letter-spacing:3px;text-transform:uppercase;margin:4px 0 16px;text-align:center}
.info-card{width:100%;background:rgba(0,0,0,0.55);border:0.5px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px 18px;margin-bottom:14px}
.info-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:0.5px solid rgba(255,255,255,0.06)}
.info-row:last-child{border-bottom:none}
.info-label{font-family:'Oswald',sans-serif;font-size:10px;color:#666;letter-spacing:2px;text-transform:uppercase}
.info-value{font-family:'Oswald',sans-serif;font-size:13px;color:#ddd}
.wa-btn{width:100%;padding:14px;background:#fff;border:none;color:#000;font-family:'Oswald',sans-serif;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px}
.wa-btn:hover{background:#ddd}
.wa-hint{font-family:'Oswald',sans-serif;font-size:9px;color:#555;text-align:center;letter-spacing:1px;text-transform:uppercase;margin-top:8px}
.screen{display:none}.screen.active{display:flex;flex-direction:column;align-items:center;width:100%}
.form-group{width:100%;margin-bottom:12px}
.form-label{font-family:'Oswald',sans-serif;font-size:10px;color:#888;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;display:block}
.form-input{width:100%;background:rgba(0,0,0,0.6);border:0.5px solid rgba(255,255,255,0.15);border-radius:8px;padding:12px 14px;color:#fff;font-family:'Oswald',sans-serif;font-size:15px;outline:none}
.form-input:focus{border-color:rgba(255,255,255,0.4)}
.form-hint{font-family:'Oswald',sans-serif;font-size:10px;color:#555;margin-top:4px;letter-spacing:1px}
.btn{width:100%;padding:14px;border:0.5px solid #fff;background:transparent;color:#fff;font-family:'Oswald',sans-serif;font-size:13px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-radius:8px;cursor:pointer;margin-top:4px}
.btn:hover{background:#fff;color:#000}
.alert-box{width:100%;background:rgba(0,0,0,0.7);border:0.5px solid rgba(255,255,255,0.2);border-radius:12px;padding:1.5rem;text-align:center;margin-bottom:1rem}
.alert-code{font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:6px;background:rgba(0,0,0,0.5);border:1px dashed rgba(255,255,255,0.3);border-radius:8px;padding:1rem;margin:1rem 0}
.status-card{width:100%;background:rgba(0,0,0,0.55);border:0.5px solid rgba(255,255,255,0.1);border-radius:12px;padding:1.5rem;text-align:center;margin-bottom:1rem}
.no-uid-text{font-family:'Oswald',sans-serif;font-size:13px;color:#666;letter-spacing:2px;text-transform:uppercase;line-height:1.8;text-align:center;margin-top:1rem}
</style>
</head>
<body>
<div class="wrap">
  <img class="bg-img" src="https://cdn.shopify.com/s/files/1/0969/7850/1923/files/ChatGPT_Image_7_may_2026_02_05_58_p.m..png?v=1778183919" alt="">
  <div class="overlay"></div>
  <div class="content">
    <div class="top-bar">
      <a href="https://autodopingshop.myshopify.com/" class="shop-btn">← Ir a la tienda</a>
      <i class="ti ti-nfc" style="font-size:18px;color:#555" aria-hidden="true"></i>
    </div>
    <div class="brand-header">
      <img class="brand-title-img" src="https://cdn.shopify.com/s/files/1/0969/7850/1923/files/Adobe_Express_-_file_1.png?v=1768082655" alt="Autodoping">
      <div class="brand-sub">Verificación de autenticidad NFC</div>
    </div>
    <div class="divider"></div>

    <div id="screen-loading" class="screen active" style="margin-top:2rem">
      <i class="ti ti-loader" style="font-size:32px;color:#444"></i>
      <p style="font-family:'Oswald',sans-serif;color:#666;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-top:1rem">Verificando...</p>
    </div>

    <div id="screen-no-uid" class="screen">
      <i class="ti ti-nfc" style="font-size:48px;color:#444;margin-top:2rem"></i>
      <p class="no-uid-text">Escanea el chip NFC<br>de tu prenda para continuar</p>
    </div>

    <div id="screen-not-found" class="screen">
      <div class="status-card" style="border-color:rgba(139,0,0,0.5);margin-top:1rem">
        <i class="ti ti-circle-x" style="font-size:40px;color:#ff4444"></i>
        <p style="font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;color:#ff4444;margin-top:1rem">No autenticado</p>
        <p style="font-family:'Oswald',sans-serif;font-size:11px;color:#666;letter-spacing:1px;text-transform:uppercase;margin-top:4px">Este chip no está registrado</p>
      </div>
      <p style="font-family:'Oswald',sans-serif;font-size:11px;color:#555;text-align:center;letter-spacing:1px;line-height:1.8">Compra únicamente en canales oficiales de Autodoping.</p>
    </div>

    <div id="screen-register" class="screen" style="width:100%">
      <div class="shirt-wrap"><img class="shirt-img" src="https://cdn.shopify.com/s/files/1/0969/7850/1923/files/preview-removebg-preview.png?v=1778184506" alt="Forever Together"></div>
      <div class="status-card" style="margin-top:1rem">
        <i class="ti ti-shield-check" style="font-size:36px;color:#fff"></i>
        <p style="font-family:'Oswald',sans-serif;font-size:18px;font-weight:700;letter-spacing:2px;color:#fff;margin-top:8px">Prenda auténtica</p>
        <p style="font-family:'Oswald',sans-serif;font-size:10px;color:#888;letter-spacing:2px;text-transform:uppercase;margin-top:4px">Registra tu certificado</p>
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
      <div class="alert-box" style="margin-top:1rem">
        <i class="ti ti-alert-triangle" style="font-size:32px;color:#fff"></i>
        <p style="font-family:'Oswald',sans-serif;font-size:13px;color:#fff;letter-spacing:1px;text-transform:uppercase;margin-top:1rem;font-weight:700">Toma captura ahora</p>
        <p style="font-family:'Oswald',sans-serif;font-size:10px;color:#666;margin-top:0.5rem;letter-spacing:1px">Esta es la única vez que verás tu código</p>
        <div class="alert-code" id="reveal-code">———</div>
        <p style="font-family:'Oswald',sans-serif;font-size:10px;color:#ff4444;letter-spacing:1px;text-transform:uppercase">Sin este código no podemos ayudarte en soporte</p>
      </div>
      <button class="btn" onclick="showCertificate()">Ya tomé captura, continuar</button>
    </div>

    <div id="screen-certified" class="screen">
      <div class="shirt-wrap"><img class="shirt-img" src="https://cdn.shopify.com/s/files/1/0969/7850/1923/files/preview-removebg-preview.png?v=1778184506" alt="Forever Together"></div>
      <div class="cert-badge">✦ Certificado ✦</div>
      <div class="cert-name" id="cert-name">—</div>
      <div class="cert-owner">Dueño del certificado</div>
      <div class="info-card">
        <div class="info-row"><span class="info-label">Diseño</span><span class="info-value" id="cert-diseno">—</span></div>
        <div class="info-row"><span class="info-label">Talla</span><span class="info-value" id="cert-talla">—</span></div>
        <div class="info-row"><span class="info-label">Serie</span><span class="info-value" id="cert-serie">—</span></div>
      </div>
      <button class="wa-btn" onclick="openWhatsApp()">
        <i class="ti ti-brand-whatsapp" style="font-size:16px"></i>
        Transferir certificado — \$100
      </button>
      <div class="wa-hint">Necesitarás tu código de transferencia</div>
    </div>
  </div>
</div>
<script>
const VERCEL='https://certificados-nfc.vercel.app';
const WA='524494802870';
let currentUID=null,currentData=null,pendingName='',pendingCode='';
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
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
  document.getElementById('cert-diseno').textContent=d.diseño||'—';
  document.getElementById('cert-talla').textContent=d.talla||'—';
  document.getElementById('cert-serie').textContent=d.serie||'—';
}
async function registerCert(){
  const name=document.getElementById('input-name').value.trim();
  const code1=document.getElementById('input-code1').value.trim();
  const code2=document.getElementById('input-code2').value.trim();
  if(!name){alert('Ingresa tu nombre');return}
  if(!code1){alert('Crea un código de transferencia');return}
  if(code1!==code2){alert('Los códigos no coinciden');return}
  try{
    const res=await fetch(VERCEL+'/api/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({uid:currentUID,nombre:name,codigo:code1})});
    const data=await res.json();
    if(data.error==='Ya registrado'){alert('Esta prenda ya tiene un certificado registrado');return}
    pendingName=name;pendingCode=code1;
    document.getElementById('reveal-code').textContent=code1;
    show('screen-code-reveal');
  }catch(e){alert('Error al registrar, intenta de nuevo')}
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
