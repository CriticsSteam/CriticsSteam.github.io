(function(){
  const G=(window.CS&&window.CS.games)||{};
  const PRE=/\/games\//.test(location.pathname)?'../':'';
  const $ = id => document.getElementById(id);
  const sh = a => a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
  function linkPost(href, label){
    if(!href) return '';
    return '<a class="ghost sm" href="'+PRE+href+'">'+(label||'К посту →')+'</a>';
  }

  /* —— Угадай знаменитость is still powered by v3.js #quiz —— */

  /* —— Что за игра? —— */
  const ig = $('game-igra');
  if(ig && G.igra && G.igra.length){
    const names=[...new Set(G.igra.map(x=>x.game))];
    let qs=sh(G.igra).slice(0,10), i=0, sc=0;
    function show(){
      if(i>=qs.length) return fin();
      const c=qs[i];
      $('gi-n').textContent=(i+1)+'/'+qs.length;
      $('gi-s').textContent='Счёт: '+sc;
      $('gi-q').textContent='«'+c.excerpt+'»';
      $('gi-r').innerHTML='';
      const opts=sh([c.game, ...sh(names.filter(n=>n!==c.game)).slice(0,3)]);
      const box=$('gi-o'); box.innerHTML='';
      opts.forEach(o=>{
        const b=document.createElement('button'); b.textContent=o;
        b.onclick=()=>{
          [...box.children].forEach(x=>{x.disabled=true; if(x.textContent===c.game)x.classList.add('ok')});
          if(o===c.game){sc++;} else b.classList.add('bad');
          $('gi-r').innerHTML=(o===c.game?'<b class="verdict-ok">Верно.</b>':'<b class="verdict-no">Мимо.</b> Это «'+c.game+'».')
            +' '+linkPost(c.post)+' <button class="btn sm" id="gi-nx">'+(i<qs.length-1?'Дальше →':'Результат')+'</button>';
          $('gi-nx').onclick=()=>{i++;show()};
          $('gi-s').textContent='Счёт: '+sc;
        };
        box.appendChild(b);
      });
    }
    function fin(){
      $('gi-o').innerHTML=''; $('gi-q').textContent='';
      $('gi-r').innerHTML='<div class="final"><b>'+sc+'/'+qs.length+'</b><p>'+(sc>=8?'Глаз критика натренирован.':sc>=5?'Уже узнаёте почерк.':'Ещё один круг по архиву не помешает.')+'</p><div class="cta"><button class="btn" onclick="location.reload()">Ещё раз</button><a class="ghost" href="../games.html">К испытаниям</a></div></div>';
    }
    show();
  }

  /* —— Год в летописи —— */
  const ye=$('game-leto');
  if(ye && G.year && G.year.length){
    const years=[...new Set(G.year.map(x=>x.year))].sort();
    let qs=sh(G.year).slice(0,10), i=0, sc=0;
    function show(){
      if(i>=qs.length) return fin();
      const c=qs[i];
      $('gy-n').textContent=(i+1)+'/'+qs.length;
      $('gy-s').textContent='Счёт: '+sc;
      $('gy-q').textContent='«'+c.excerpt+'»';
      $('gy-t').textContent=c.title||'';
      $('gy-r').innerHTML='';
      let pool=years.filter(y=>y!==c.year);
      const near=sh(pool).slice(0,3);
      const opts=sh([c.year, ...near]);
      const box=$('gy-o'); box.innerHTML='';
      opts.forEach(o=>{
        const b=document.createElement('button'); b.textContent=o;
        b.onclick=()=>{
          [...box.children].forEach(x=>{x.disabled=true; if(x.textContent===String(c.year))x.classList.add('ok')});
          if(String(o)===String(c.year)) sc++; else b.classList.add('bad');
          $('gy-r').innerHTML=(String(o)===String(c.year)?'<b class="verdict-ok">Верно.</b>':'<b class="verdict-no">Мимо.</b> Этот пост вышел в '+c.year+' году.')
            +(c.when?' <span class="mt">'+c.when+'</span>':'')
            +' '+linkPost(c.post)+' <button class="btn sm" id="gy-nx">'+(i<qs.length-1?'Дальше →':'Результат')+'</button>';
          $('gy-nx').onclick=()=>{i++;show()};
          $('gy-s').textContent='Счёт: '+sc;
        };
        box.appendChild(b);
      });
    }
    function fin(){
      $('gy-o').innerHTML=''; $('gy-q').textContent=''; $('gy-t').textContent='';
      $('gy-r').innerHTML='<div class="final"><b>'+sc+'/'+qs.length+'</b><p>'+(sc>=8?'Летопись у вас в руках.':sc>=5?'Чувство времени есть.':'Годы путаются — это честно.')+'</p><div class="cta"><button class="btn" onclick="location.reload()">Ещё раз</button><a class="ghost" href="../games.html">К испытаниям</a></div></div>';
    }
    show();
  }

  /* —— Правда или выдумка —— */
  const pr=$('game-pravda');
  if(pr && G.pravda && G.pravda.length){
    let qs=sh(G.pravda).slice(0,10), i=0, sc=0;
    function show(){
      if(i>=qs.length) return fin();
      const c=qs[i];
      $('gp-n').textContent=(i+1)+'/'+qs.length;
      $('gp-s').textContent='Счёт: '+sc;
      $('gp-q').textContent='«'+c.text+'»';
      $('gp-r').innerHTML='';
      const box=$('gp-o'); box.innerHTML='';
      [['true','Это было в архиве'],['false','Этого не было']].forEach(([val,label])=>{
        const b=document.createElement('button'); b.textContent=label;
        b.onclick=()=>{
          [...box.children].forEach(x=>x.disabled=true);
          const ok=(val==='true')===!!c.real;
          if(ok){sc++; b.classList.add('ok')} else b.classList.add('bad');
          let msg=ok?'<b class="verdict-ok">Верно.</b> ':'<b class="verdict-no">Мимо.</b> ';
          msg+=c.real?'Эта строка правда стоит в архиве.':'Такой публикации в архиве нет — это выдумка для испытания, не факт из жизни проекта.';
          $('gp-r').innerHTML=msg+' '+(c.real?linkPost(c.post):'')+' <button class="btn sm" id="gp-nx">'+(i<qs.length-1?'Дальше →':'Результат')+'</button>';
          $('gp-nx').onclick=()=>{i++;show()};
          $('gp-s').textContent='Счёт: '+sc;
        };
        box.appendChild(b);
      });
    }
    function fin(){
      $('gp-o').innerHTML=''; $('gp-q').textContent='';
      $('gp-r').innerHTML='<div class="final"><b>'+sc+'/'+qs.length+'</b><p>'+(sc>=8?'Отличаете голос архива от подделки.':sc>=5?'Чутьё есть, но архив ещё может удивить.':'Ещё почитайте стену — и вернитесь.')+'</p><div class="cta"><button class="btn" onclick="location.reload()">Ещё раз</button><a class="ghost" href="../games.html">К испытаниям</a></div></div>';
    }
    show();
  }

  /* —— Машина времени —— */
  const tm=$('game-mashina');
  if(tm && G.times && G.times.length){
    const btn=$('tm-go');
    const stage=$('tm-stage');
    function land(){
      const c=G.times[Math.floor(Math.random()*G.times.length)];
      const img=c.img?('<a href="'+PRE+c.post+'"><img src="'+PRE+c.img+'" alt=""></a>'):'';
      stage.innerHTML='<div class="time-card">'+img+'<div class="time-body"><span class="kick">'+c.when+' · '+(c.src==='vk'?'ВКонтакте':'Telegram')+'</span><h2>'+c.title+'</h2><p>'+c.excerpt+'</p><div class="cta"><a class="btn" href="'+PRE+c.post+'">Открыть этот день</a><button class="ghost" id="tm-again">Ещё один прыжок</button></div></div></div>';
      const a=$('tm-again'); if(a) a.onclick=spin;
    }
    function spin(){
      stage.innerHTML='<div class="time-spin" id="tm-spin">…</div>';
      const el=$('tm-spin');
      let n=0;
      const iv=setInterval(()=>{
        const c=G.times[Math.floor(Math.random()*G.times.length)];
        el.textContent=c.when||c.year||'—';
        n++;
        if(n>12){clearInterval(iv); land()}
      },80);
    }
    if(btn) btn.onclick=spin;
  }
})();
