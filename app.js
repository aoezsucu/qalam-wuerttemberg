/* Qalam Württemberg — public JSON content edited through Pages CMS */
const fetchJSON = async (name) => {
  const response = await fetch(`content/${name}.json`, {cache:'no-cache'});
  if (!response.ok) throw new Error(`Inhalt fehlt: ${name}`);
  return response.json();
};
const escapeHTML = (s='') => String(s??'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const safeURL = (v) => {
  const s=String(v||'').trim();
  if (/^#[a-z][\w-]*$/i.test(s)) return s;
  if (/^https:\/\//i.test(s)) {
    try { const url = new URL(s); if (!url.username && !url.password) return url.href; } catch {}
  }
  if (/^\/?assets\/[\w./-]+$/.test(s) && !s.includes('..')) return s.replace(/^\//, '');
  return '#kontakt';
};
const initials=(str)=>String(str||'Q').trim().split(/\s+/).filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase();
const putText=(key,value)=>document.querySelectorAll(`[data-field="${key}"]`).forEach(el=>el.textContent=value ?? '');
function renderModules(items){
 const root=document.getElementById('modules-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map((x,i)=>`<article class="module-card"><span class="mod-code">${escapeHTML(x.code)}</span><div class="module-card-body"><span class="module-line">${i?'GRUNDLAGENMODUL':'DEIN EINSTIEG'}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p><span class="mod-topics">${escapeHTML(x.topics)}</span></div></article>`).join('');
}
function renderValues(items){
 const root=document.getElementById('values-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<article class="value-card"><span class="value-num">${escapeHTML(x.number)}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p></article>`).join('');
}
function renderPeople(id,items){
 const root=document.getElementById(id);if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<article class="people-card"><div class="people-avatar">${x.photo&&safeURL(x.photo)!=='#kontakt'?`<img loading="lazy" decoding="async" width="320" height="375" src="${escapeHTML(safeURL(x.photo))}" alt="Porträt von ${escapeHTML(x.name)}">`:`<span class="initials" aria-hidden="true">${escapeHTML(initials(x.name))}</span>`}</div><h4 class="person-name">${escapeHTML(x.name)}</h4><p class="person-subtitle">${escapeHTML(x.subtitle)}</p></article>`).join('');
}
function renderSchedule(items){
 const root=document.getElementById('schedule-grid');
 if(!root || !Array.isArray(items) || items.length===0) return;
 const rows=items.filter(x=>x && (x.title || x.date));
 if(!rows.length) return;
 document.querySelector('.schedule-foot')?.removeAttribute('hidden');
 root.innerHTML=rows.map(x=>{
  const link=x.link && /^https:\/\//i.test(String(x.link).trim())?`<a href="${escapeHTML(safeURL(x.link))}" target="_blank" rel="noopener noreferrer">Weitere Informationen <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>`:'';
  return `<article class="schedule-card"><div class="schedule-card-top"><span class="schedule-date">${escapeHTML(x.date||'Termin')}</span>${x.format?`<span class="schedule-mode">${escapeHTML(x.format)}</span>`:''}</div><h3>${escapeHTML(x.title||'Unterricht')}</h3>${x.topics?`<p class="schedule-subject">${escapeHTML(x.topics)}</p>`:''}<div class="schedule-details">${x.time?`<span><strong>Uhrzeit:</strong> ${escapeHTML(x.time)}</span>`:''}${x.teacher?`<span><strong>Referent:</strong> ${escapeHTML(x.teacher)}</span>`:''}${x.place?`<span><strong>Ort:</strong> ${escapeHTML(x.place)}</span>`:''}</div>${link}</article>`;
 }).join('');
}
function renderNews(items){
 const root=document.getElementById('news-grid');if(!root||!Array.isArray(items))return;
 root.innerHTML=items.map(x=>`<a class="news-card" href="${escapeHTML(safeURL(x.url))}" ${/^https:\/\//.test(safeURL(x.url))?'target="_blank" rel="noopener noreferrer"':''}><span class="news-date">${escapeHTML(x.date)}</span><h3>${escapeHTML(x.title)}</h3><p>${escapeHTML(x.description)}</p><svg class="icon news-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>`).join('');
}
function applyHome(home){
 if(home){
  ['brand','tagline','heroEyebrow','heroTitle','heroAccent','heroLead','heroNote','aboutTitle','aboutText','aboutTextSecond','missionQuote','moduleIntro','contactTitle','contactText'].forEach(key=>{if(home[key]!==undefined)putText(key,home[key]);});
  const registration=/^https:\/\//i.test(String(home.registrationUrl||''))?safeURL(home.registrationUrl):'https://tally.so/r/zxpljE';
  document.querySelectorAll('.registration-link').forEach(el=>el.setAttribute('href',registration));
  const instagram=safeURL(home.instagramUrl||'https://www.instagram.com/qalam.wuerttemberg/');
  for(const id of ['news-instagram','contact-insta'])document.getElementById(id)?.setAttribute('href',instagram);
  if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(home.contactEmail||'')) {
   document.querySelectorAll('[data-contact-email]').forEach(el=>{
    el.href=`mailto:${home.contactEmail}`;
    el.textContent=home.contactEmail;
   });
  }
  if(document.body.dataset.page==='legal'){
   const legal=document.getElementById('legal-details');
   if(legal){
     const imprint=document.body.dataset.legal==='imprint';
     const fields=imprint?[['Verantwortlicher Träger',home.imprintResponsible],['Anschrift',home.imprintAddress],['Kontakt',home.contactEmail]]:[['Kontakt für Datenschutzanfragen',home.privacyContact||home.contactEmail]];
     legal.innerHTML=fields.map(([k,v])=>`<p><strong>${escapeHTML(k)}:</strong> ${v?escapeHTML(v):'<em>Noch zu ergänzen</em>'}</p>`).join('');
   }
  }
 }
}
async function init(){
 const renderers={home:applyHome,modules:renderModules,values:renderValues,teachers:items=>renderPeople('teachers-grid',items),team:items=>renderPeople('team-grid',items),news:renderNews,schedule:renderSchedule};
 const names=document.body.dataset.page==='legal'?['home']:Object.keys(renderers);
 await Promise.allSettled(names.map(async name=>{
  try { renderers[name](await fetchJSON(name)); }
  catch(error) { console.warn(`Qalam: ${name} konnte nicht aktualisiert werden. Die vorhandenen Inhalte bleiben sichtbar.`,error); }
 }));
}
const toggle=document.querySelector('.nav-toggle');
const nav=document.getElementById('main-nav');
if(toggle&&nav){
 document.documentElement.classList.add('has-nav');
 const setMenu=open=>{nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');};
 toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 document.addEventListener('keydown',event=>{if(event.key==='Escape' && nav.classList.contains('open')){setMenu(false);toggle.focus();}});
 document.addEventListener('click',event=>{if(!nav.contains(event.target)&&!toggle.contains(event.target))setMenu(false);});
 nav.addEventListener('focusout',()=>requestAnimationFrame(()=>{if(!nav.contains(document.activeElement)&&document.activeElement!==toggle)setMenu(false);}));
 window.matchMedia('(min-width: 901px)').addEventListener('change',()=>setMenu(false));
}
document.getElementById('year')?.replaceChildren(document.createTextNode(new Date().getFullYear()));
init().catch(err=>console.error('Qalam content:',err));
