'use strict';
for(const host of document.querySelectorAll('[data-flow]')){
 const rows=window.guideFlows[host.dataset.flow];let index=0;
 host.innerHTML=`<div class="step-copy"><div class="counter" aria-live="polite"></div><h3></h3><p class="explanation"></p><div class="controls"><button class="prev" type="button">← Zurück</button><button class="next" type="button">Weiter →</button></div></div><div class="steps" aria-label="Schritt auswählen"></div><div class="all-steps"></div>`;
 const counter=host.querySelector('.counter');counter.setAttribute('aria-live','polite');
 rows.forEach((row,i)=>{const b=document.createElement('button');b.textContent=String(i+1).padStart(2,'0');b.setAttribute('aria-label',`Schritt ${i+1}: ${row.title}`);b.onclick=()=>{index=i;render()};host.querySelector('.steps').append(b);const a=document.createElement('article'),h=document.createElement('h4'),p=document.createElement('p');h.textContent=`${i+1}. ${row.title}`;p.textContent=row.text;a.append(h,p);host.querySelector('.all-steps').append(a)});
 function render(){const r=rows[index];counter.textContent=`SCHRITT ${index+1} VON ${rows.length}`;host.querySelector('.step-copy h3').textContent=r.title;host.querySelector('.explanation').textContent=r.text;host.querySelector('.prev').disabled=index===0;host.querySelector('.next').disabled=index===rows.length-1;host.querySelectorAll('.steps button').forEach((b,i)=>b.setAttribute('aria-current',String(i===index)))}
 host.querySelector('.prev').onclick=()=>{index--;render()};host.querySelector('.next').onclick=()=>{index++;render()};
 render();
}
