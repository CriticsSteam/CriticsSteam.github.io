(function(){
const CS=window.CS||{celebs:[],random:[]};
const PRE=/\/games\//.test(location.pathname)?'../':'';
// random
document.querySelectorAll('.rnd').forEach(b=>b.addEventListener('click',()=>{const r=CS.random;const id=r[Math.floor(Math.random()*r.length)];location.href=(b.dataset.pre||'')+'post/'+id+'.html'}));
// archive filter
const ag=document.getElementById('ag');
if(ag){let f='all',y='all',src='all';const q=document.getElementById('q'),c=document.getElementById('cnt');
 const run=()=>{const s=(q?q.value:'').toLowerCase().trim();let n=0;ag.querySelectorAll('.card').forEach(el=>{
  const rs=(el.dataset.r||'').split(/\s+/);
  const ok=(f=='all'||rs.includes(f))&&(y=='all'||el.dataset.y==y)&&(src=='all'||el.dataset.s==src)&&(!s||el.textContent.toLowerCase().includes(s));
  el.style.display=ok?'':'none';if(ok)n++});if(c)c.textContent='Найдено: '+n};
 document.querySelectorAll('.chip[data-f]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip[data-f]').forEach(x=>x.classList.remove('on'));b.classList.add('on');f=b.dataset.f;run()});
 document.querySelectorAll('.chip[data-y]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip[data-y]').forEach(x=>x.classList.remove('on'));b.classList.add('on');y=b.dataset.y;run()});
 document.querySelectorAll('.chip[data-s]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip[data-s]').forEach(x=>x.classList.remove('on'));b.classList.add('on');src=b.dataset.s;run()});
 const u=new URLSearchParams(location.search).get('q');if(u&&q)q.value=u;if(q)q.oninput=run;run();}
// free filter
const fl=document.getElementById('fl');
if(fl){let y='all';const q=document.getElementById('fq');const run=()=>{const s=q.value.toLowerCase();fl.querySelectorAll('.fg').forEach(el=>{el.style.display=((y=='all'||el.dataset.y==y)&&el.textContent.toLowerCase().includes(s))?'':'none'})};
 document.querySelectorAll('.chip[data-fy]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chip[data-fy]').forEach(x=>x.classList.remove('on'));b.classList.add('on');y=b.dataset.fy;run()});q.oninput=run;}
// quiz
const qz=document.getElementById('quiz');
if(qz){const pool=CS.celebs.filter(c=>c.quote);const names=[...new Set(CS.celebs.map(c=>c.celeb))];
 const sh=a=>a.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
 let qs=sh(pool).slice(0,10),i=0,sc=0;const $=id=>document.getElementById(id);
 function show(){if(i>=qs.length)return fin();const c=qs[i];$('qn').textContent=(i+1)+'/'+qs.length;$('qs').textContent='Счёт: '+sc;$('qg').textContent='Обзор на «'+c.game+'» · '+c.verdict;$('qq').textContent='«'+c.quote+'»';$('qr').innerHTML='';
  const opts=sh([c.celeb,...sh(names.filter(n=>n!==c.celeb)).slice(0,3)]);$('qo').innerHTML='';
  opts.forEach(o=>{const b=document.createElement('button');b.textContent=o;b.onclick=()=>{[...$('qo').children].forEach(x=>{x.disabled=true;if(x.textContent==c.celeb)x.classList.add('ok')});if(o==c.celeb)sc++;else b.classList.add('bad');
   $('qr').innerHTML=(o==c.celeb?'<b>Верно!</b>':'<b>Мимо.</b> Это был(а) '+c.celeb+'.')+(c.note?'<p class="nt">🔎 '+c.note+'</p>':'')+'<img src="'+PRE+c.img+'" alt=""><button class="btn" id="nx">'+(i<qs.length-1?'Дальше →':'Результат')+'</button> <a class="ghost sm" href="'+PRE+(c.post||('post/tg-'+c.id+'.html'))+'">пост</a>';$('nx').onclick=()=>{i++;show()};$('qs').textContent='Счёт: '+sc};$('qo').appendChild(b)})}
 function fin(){$('qo').innerHTML='';$('qq').textContent='';$('qg').textContent='';const t='Я угадал(а) '+sc+' из '+qs.length+' знаменитостей в квизе Критиков Steam 🎮 '+location.href;
  $('qr').innerHTML='<div class="final"><b>'+sc+'/'+qs.length+'</b><p>'+(sc>=8?'Легендарный критик.':sc>=5?'Улавливаете вайб.':'Третья волна отписок близко 😅')+'</p><div class="cta" style="justify-content:center"><button class="btn" id="cp">Скопировать результат</button><a class="ghost" target="_blank" href="https://t.me/share/url?url='+encodeURIComponent(location.href)+'&text='+encodeURIComponent('Я угадал(а) '+sc+' из '+qs.length+' в квизе Критиков Steam')+'">Поделиться в Telegram</a><button class="ghost" onclick="location.reload()">Ещё раз</button></div></div>';
  $('cp').onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(t);$('cp').textContent='Скопировано ✓'}}
 show();}
// quote cards
function wrap(ctx,t,x,y,w,lh){const words=t.split(' ');let line='',lines=[];for(const wd of words){const tt=line?line+' '+wd:wd;if(ctx.measureText(tt).width>w&&line){lines.push(line);line=wd}else line=tt}lines.push(line);lines.forEach((l,k)=>ctx.fillText(l,x,y+k*lh));return lines.length}
document.querySelectorAll('[data-card]').forEach(b=>b.addEventListener('click',async()=>{const c=CS.celebs.find(x=>x.id==b.dataset.card);if(!c)return;const pre=location.pathname.includes('/post/')?'../':'';
 const cv=document.createElement('canvas');cv.width=cv.height=1080;const x=cv.getContext('2d');await document.fonts.ready;
 const img=new Image();img.src=pre+c.img;await new Promise(r=>{img.onload=r;img.onerror=r});
 x.fillStyle='#0a0c10';x.fillRect(0,0,1080,1080);
 if(img.naturalWidth){const h=1080*img.naturalHeight/img.naturalWidth;x.globalAlpha=.35;x.drawImage(img,0,0,1080,h);x.globalAlpha=1}
 const g=x.createLinearGradient(0,200,0,1080);g.addColorStop(0,'#0a0c1000');g.addColorStop(.45,'#0a0c10f2');x.fillStyle=g;x.fillRect(0,0,1080,1080);
 x.fillStyle='#d4ff4f';x.font='600 26px "JetBrains Mono",monospace';x.fillText('ОБЗОР ЗНАМЕНИТОСТИ · '+c.verdict.toUpperCase(),80,120);
 const fs=c.quote.length>220?40:c.quote.length>120?50:60;x.fillStyle='#f2ede4';x.font='italic 400 '+fs+'px Fraunces,Georgia,serif';const n=wrap(x,'«'+c.quote+'»',80,330,920,fs*1.3);
 x.font='900 54px Fraunces,Georgia,serif';x.fillText(c.celeb,80,Math.min(330+n*fs*1.3+60,940));x.fillStyle='#66c0f4';x.font='600 30px Manrope,sans-serif';x.fillText('про «'+c.game+'»',80,Math.min(330+n*fs*1.3+110,990));
 x.fillStyle='#9aa3ad';x.font='600 24px "JetBrains Mono",monospace';x.fillText('t.me/criticssteam',80,1040);x.textAlign='right';x.fillText('КРИТИКИ STEAM',1000,1040);
 const a=document.createElement('a');a.download='criticssteam-'+c.id+'.png';a.href=cv.toDataURL('image/png');a.click()}));
})();

(function(){
  const stage=document.getElementById('heroStage');
  if(!stage) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=window.matchMedia('(pointer:fine)').matches;
  const layers=[...stage.querySelectorAll('[data-depth]')];
  let tx=0,ty=0,cx=0,cy=0;
  function tick(){
    cx+=(tx-cx)*0.07; cy+=(ty-cy)*0.07;
    if(!reduce){
      stage.style.transform='rotateX('+(-cy*5).toFixed(3)+'deg) rotateY('+(cx*6.5).toFixed(3)+'deg)';
      layers.forEach(el=>{
        const d=parseFloat(el.dataset.depth)||0;
        el.style.transform='translate3d('+(-cx*d*42).toFixed(2)+'px,'+(-cy*d*30).toFixed(2)+'px,0)';
      });
    }
    requestAnimationFrame(tick);
  }
  if(!reduce && fine){
    stage.addEventListener('mousemove',e=>{
      const r=stage.getBoundingClientRect();
      const w=r.width||1,h=r.height||1;
      tx=((e.clientX-r.left)/w-0.5)*2;
      ty=((e.clientY-r.top)/h-0.5)*2;
    });
    stage.addEventListener('mouseleave',()=>{tx=0;ty=0});
  }
  requestAnimationFrame(tick);

  const cv=document.getElementById('heroParts');
  if(!cv || reduce) return;
  const ctx=cv.getContext('2d');
  const dots=[];
  function resize(){
    const r=stage.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    cv.width=Math.floor(r.width*dpr); cv.height=Math.floor(r.height*dpr);
    cv.style.width=r.width+'px'; cv.style.height=r.height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function spawn(){
    const r=stage.getBoundingClientRect();
    const narrow=r.width<700;
    dots.length=0;
    const nBlue=narrow?12:20;
    const nEmber=narrow?10:16;
    for(let i=0;i<nBlue;i++){
      dots.push({
        kind:'blue',
        x:Math.random()*r.width,
        y:Math.random()*r.height,
        r:0.5+Math.random()*1.8,
        a:0.08+Math.random()*0.2,
        vx:(-0.12+Math.random()*0.24),
        vy:-0.08-Math.random()*0.16,
        w:0.4+Math.random()*1.2,
        ph:Math.random()*Math.PI*2
      });
    }
    for(let i=0;i<nEmber;i++){
      dots.push({
        kind:'ember',
        x:r.width*0.42+Math.random()*r.width*0.58,
        y:Math.random()*r.height,
        r:1+Math.random()*2.2,
        a:0.28+Math.random()*0.45,
        vx:(-0.06+Math.random()*0.14),
        vy:-0.22-Math.random()*0.38,
        w:0.5+Math.random()*1.4,
        ph:Math.random()*Math.PI*2
      });
    }
  }
  function draw(ts){
    const r=stage.getBoundingClientRect();
    if(!r.width){requestAnimationFrame(draw);return;}
    ctx.clearRect(0,0,r.width,r.height);
    const t=(ts||0)/1000;
    for(const d of dots){
      d.x+=d.vx+Math.sin((t+d.ph)*d.w)*0.16;
      d.y+=d.vy;
      if(d.y<-10){d.y=r.height+8;d.x=(d.kind==='ember'?r.width*0.42:0)+Math.random()*(d.kind==='ember'?r.width*0.58:r.width)}
      if(d.x<-8)d.x=r.width+8;
      if(d.x>r.width+8)d.x=-8;
      if(d.kind==='ember'){
        const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*3.2);
        g.addColorStop(0,'rgba(255,220,140,'+d.a+')');
        g.addColorStop(0.45,'rgba(232,180,80,'+(d.a*0.5)+')');
        g.addColorStop(1,'rgba(232,180,80,0)');
        ctx.fillStyle=g;
        ctx.beginPath();ctx.arc(d.x,d.y,d.r*3.2,0,Math.PI*2);ctx.fill();
      }else{
        ctx.beginPath();
        ctx.fillStyle='rgba(102,192,244,'+d.a+')';
        ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  resize(); spawn();
  window.addEventListener('resize',()=>{resize();spawn()});
  requestAnimationFrame(draw);
})();

(function(){
  const box=document.getElementById('filters'), btn=document.getElementById('filtToggle'), rows=document.getElementById('chipRows');
  if(!btn||!rows) return;
  const KEY='cs-archive-tags';
  const apply=on=>{
    rows.hidden=!on;
    btn.setAttribute('aria-expanded', on?'true':'false');
    btn.textContent=on?'Свернуть теги':'Показать теги';
    try{localStorage.setItem(KEY,on?'1':'0')}catch(e){}
  };
  let on=true;
  try{on=localStorage.getItem(KEY)!=='0'}catch(e){}
  try{
    const q=new URLSearchParams(location.search).get('tags');
    if(q==='off'||q==='0') on=false;
    if(q==='on'||q==='1') on=true;
  }catch(e){}
  apply(on);
  btn.addEventListener('click',()=>apply(rows.hidden));
})();
(function(){
  const drops=[...document.querySelectorAll('.nav-drop')];
  if(!drops.length) return;
  const fine=window.matchMedia('(pointer:fine)').matches;
  drops.forEach(d=>{
    const btn=d.querySelector('.nav-drop-btn');
    const tog=e=>{e.preventDefault();e.stopPropagation();
      const open=d.classList.toggle('open');
      if(btn) btn.setAttribute('aria-expanded', open?'true':'false');
    };
    if(btn) btn.addEventListener('click',tog);
    if(!fine){
      const a=d.querySelector('.nav-drop-t');
      if(a) a.addEventListener('click',e=>{
        if(!d.classList.contains('open')){e.preventDefault();d.classList.add('open');if(btn)btn.setAttribute('aria-expanded','true')}
      });
    }
  });
  document.addEventListener('click',e=>{
    drops.forEach(d=>{if(!d.contains(e.target)) {d.classList.remove('open'); const b=d.querySelector('.nav-drop-btn'); if(b)b.setAttribute('aria-expanded','false')}});
  });
})();
