(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// progress + nav shadow
const bar=$('#progress'),nav=$('#nav');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';nav.classList.toggle('stuck',h.scrollTop>10)},{passive:true});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.card,.camp,.tl,.sec-head,.sec-title,.flow,.two,.gallery,.about-in,.case-head,.case-cols').forEach(el=>{el.classList.add('reveal');io.observe(el)});
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target,t=+b.dataset.count;let n=0;const s=Math.max(1,Math.ceil(t/40));const id=setInterval(()=>{n=Math.min(t,n+s);b.textContent=n+(n>=t?(b.dataset.suffix||''):'');if(n>=t)clearInterval(id)},30);co.unobserve(b)}));
$$('[data-count]').forEach(b=>co.observe(b));
// scrollspy
const links=$$('a[data-spy]');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
// jump to details
const jump=sel=>{const t=$(sel);t&&t.scrollIntoView({behavior:'smooth'})};
$$('.card[data-href]').forEach(c=>c.onclick=()=>jump(c.dataset.href));
// browse by category (built from the Featured cards)
const mini=$('#mini');
$$('.card').forEach(c=>{
  const img=$('img',c),href=c.dataset.href;
  const el=document.createElement(href?'a':'div');
  el.className='mini-card';el.dataset.cat=c.dataset.cat;
  if(href){el.href=href;el.onclick=e=>{e.preventDefault();jump(href)}}
  const year=$('.year',c),h3=$('h3',c),p=$$('p',c).pop();
  el.innerHTML=(img?`<img loading="lazy" src="${img.getAttribute('src')}" alt="" style="${img.getAttribute('style')||''}"${img.classList.contains('logo')?' class="logo"':''}>`:'<span class="ph"></span>')+
    `<div><span class="year">${year?year.textContent:''}</span><h3>${h3.textContent}</h3><p>${p?p.textContent:''}</p></div>`;
  mini.appendChild(el);
});
const showCat=f=>$$('.mini-card').forEach(m=>m.hidden=m.dataset.cat!==f);
$$('.browse .chip').forEach(c=>c.onclick=()=>{$$('.browse .chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');showCat(c.dataset.f)});
showCat('event');
// event flow
$$('.flow-tabs button').forEach(b=>b.onclick=()=>{$$('.flow-tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.step').forEach((s,i)=>s.classList.toggle('on',i==b.dataset.step))});
// lightbox
const lb=$('#lb'),lbi=$('img',lb),cap=$('#lb-cap');let set=[],idx=0;
const show=i=>{idx=(i+set.length)%set.length;const im=set[idx];lbi.src=im.src;cap.textContent=im.alt||''};
document.addEventListener('click',e=>{const im=e.target.closest('[data-lightbox] img');if(!im)return;const g=im.closest('[data-lightbox]');set=$$('img',g);show(set.indexOf(im));lb.classList.add('open')});
lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')};
$('.prev',lb).onclick=()=>show(idx-1);$('.next',lb).onclick=()=>show(idx+1);
addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open');
 if(lb.classList.contains('open')){if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)}});
// copy email
const cp=$('#copy');if(cp)cp.onclick=function(){navigator.clipboard&&navigator.clipboard.writeText('sallyloohjingmun@gmail.com');this.textContent='Copied ✓';setTimeout(()=>this.textContent='Copy email',1800)};
})();
