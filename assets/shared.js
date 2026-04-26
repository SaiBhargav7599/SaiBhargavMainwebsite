/* shared.js — canvas, cursor, nav, reveal, transitions */
'use strict';

/* ─ CURSOR ─ */
(function(){
  const cur=document.getElementById('cur'),rng=document.getElementById('crng');
  if(!cur||!rng)return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
  (function ar(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;rng.style.left=rx+'px';rng.style.top=ry+'px';requestAnimationFrame(ar);})();
  document.querySelectorAll('a,button,.gc,.cert-card,.art-item,.proj-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.classList.add('on');rng.classList.add('on');});
    el.addEventListener('mouseleave',()=>{cur.classList.remove('on');rng.classList.remove('on');});
  });
})();

/* ─ BG CANVAS ─ */
(function(){
  const c=document.getElementById('bgc');if(!c)return;
  const ctx=c.getContext('2d');let W,H,sc=0;
  function rs(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  rs();window.addEventListener('resize',rs);
  window.addEventListener('scroll',()=>sc=window.scrollY);
  const P=Array.from({length:85},()=>({x:Math.random()*2200,y:Math.random()*4000,z:Math.random()*820,sz:Math.random()*1.4+.28,sp:Math.random()*.34+.1,op:Math.random()*.48+.1}));
  const PX=900;
  function draw(){
    ctx.clearRect(0,0,W,H);
    const hz=H*.44+sc*.07;ctx.lineWidth=1;
    for(let i=0;i<22;i++){const t=i/22,y=hz+Math.pow(t,2.3)*H*2.3;if(y>H+60)continue;const s=PX/(PX+i*54);ctx.strokeStyle=`rgba(0,245,255,${t*.04})`;ctx.beginPath();ctx.moveTo(W/2-W*2*s,y);ctx.lineTo(W/2+W*2*s,y);ctx.stroke();}
    for(let i=-12;i<=12;i++){ctx.strokeStyle='rgba(0,245,255,.026)';ctx.beginPath();ctx.moveTo(W/2+i*112,hz);ctx.lineTo(W/2+i*1700,H+320);ctx.stroke();}
    P.forEach(p=>{const sx=(p.x-W/2)/(p.z/PX+1)+W/2,sy=(p.y-sc*.24)%(H+130)-66,s=p.sz*(PX/(PX+p.z));ctx.beginPath();ctx.arc(sx,sy,Math.max(s,.28),0,Math.PI*2);ctx.fillStyle=`rgba(0,245,255,${p.op*s})`;ctx.fill();p.y-=p.sp;if(p.y<-66)p.y=H+166;});
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ─ PAGE TRANSITION ─ */
window.addEventListener('load',()=>setTimeout(()=>{const pt=document.getElementById('pt');if(pt)pt.classList.add('gone');},60));

/* ─ REVEAL ─ */
(function(){
  const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis');});},{threshold:.08});
  document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(el=>obs.observe(el));
})();

/* ─ HAMBURGER ─ */
(function(){
  const ham=document.querySelector('.ham'),mob=document.getElementById('mobnav');
  if(ham&&mob){
    ham.addEventListener('click',()=>mob.classList.toggle('open'));
    mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mob.classList.remove('open')));
  }
})();

/* ─ SMOOTH HASH SCROLL ─ */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});
