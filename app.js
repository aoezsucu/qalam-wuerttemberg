/* Qalam Württemberg — public JSON content edited through Pages CMS */
const fetchJSON = async (name) => {
  const response = await fetch(`content/${name}.json`, {cache:'no-cache'});
  if (!response.ok) throw new Error(`Inhalt fehlt: ${name}`);
  return response.json();
};
const escapeHTML = (s='') => String(s??'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const safeURL = (v) => {
  const s=String(v||'').trim();
  if (s.startsWith('#')) return s;
  if (/^https:\/\//i.test(s)) return s;
  if (s.startsWith('/assets/')) return s;
  return '#kontakt';
};
const initials=(str)=>String(str||'Q').trim().split(/\s+/).filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase();
const putText=(key,value)=>document.querySelectorAll(`[data-field="${key}"]`).forEach(el=>el.textContent=value ?? '');
function renderModules(items){
 const root=document.getElementById('modules-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map((x,i)=>`<article class="module-card"><span class="mod-code">${escapeHTML(x.code)}</span><span class="module-arrow" aria-hidden="true">↗</span><div class="module-card-body"><span class="module-line">${i?'GRUNDLAGENMODUL':'DEIN EINSTIEG'}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p><span class="mod-topics">${escapeHTML(x.topics)}</span></div></article>`).join('');
}
function renderValues(items){
 const root=document.getElementById('values-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<article class="value-card"><span class="value-num">${escapeHTML(x.number)}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p></article>`).join('');
}
function renderPeople(id,items){
 const root=document.getElementById(id);if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<article class="people-card"><div class="people-avatar">${x.photo&&safeURL(x.photo)!=='#kontakt'?`<img loading="lazy" src="${escapeHTML(safeURL(x.photo))}" alt="Porträt von ${escapeHTML(x.name)}">`:`<span class="initials" aria-hidden="true">${escapeHTML(initials(x.name))}</span>`}</div><h4 class="person-name">${escapeHTML(x.name)}</h4><p class="person-subtitle">${escapeHTML(x.subtitle)}</p></article>`).join('');
}
function renderNews(items){
 const root=document.getElementById('news-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<a class="news-card" href="${escapeHTML(safeURL(x.url))}" ${/^https:\/\//.test(safeURL(x.url))?'target="_blank" rel="noopener noreferrer"':''}><span class="news-date">${escapeHTML(x.date)}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p><span class="news-arrow" aria-hidden="true">↗</span></a>`).join('');
}
async function init(){
 const tasks=await Promise.allSettled(['home','modules','values','teachers','team','news'].map(fetchJSON));
 const get=i=>tasks[i].status==='fulfilled'?tasks[i].value:null;
 const home=get(0);
 if(home){
  ['brand','tagline','heroEyebrow','heroTitle','heroAccent','heroLead','heroNote','aboutTitle','aboutText','aboutTextSecond','missionQuote','moduleIntro','contactTitle','contactText'].forEach(key=>{if(home[key]!==undefined)putText(key,home[key]);});
  const instagram=safeURL(home.instagramUrl||'https://www.instagram.com/qalam.wuerttemberg/');
  for(const id of ['news-instagram','contact-insta'])document.getElementById(id)?.setAttribute('href',instagram);
  const button=document.getElementById('main-contact');
  if(button){if(home.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(home.contactEmail)){button.href='mailto:'+home.contactEmail;button.removeAttribute('target');button.textContent='E-Mail schreiben ↗';}else button.href=instagram;}
  if(document.body.dataset.page==='legal'){
   const legal=document.getElementById('legal-details');
   if(legal){
     const imprint=document.body.dataset.legal==='imprint';
     const fields=imprint?[['Verantwortlicher Träger',home.imprintResponsible],['Anschrift',home.imprintAddress],['Kontakt',home.contactEmail]]:[['Kontakt für Datenschutzanfragen',home.privacyContact||home.contactEmail]];
     legal.innerHTML=fields.map(([k,v])=>`<p><strong>${escapeHTML(k)}:</strong> ${v?escapeHTML(v):'<em>Noch zu ergänzen</em>'}</p>`).join('');
   }
  }
 }
 if(get(1))renderModules(get(1));if(get(2))renderValues(get(2));if(get(3))renderPeople('teachers-grid',get(3));if(get(4))renderPeople('team-grid',get(4));if(get(5))renderNews(get(5));
}
const toggle=document.querySelector('.nav-toggle');
const nav=document.getElementById('main-nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
document.getElementById('year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
init().catch(err=>console.error('Qalam content:',err));
