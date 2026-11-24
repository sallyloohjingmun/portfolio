(function(){
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
// progress + nav shadow
const bar=$('#progress'),nav=$('#nav');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';nav.classList.toggle('stuck',h.scrollTop>10)},{passive:true});
$('#yr').textContent=new Date().getFullYear();
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.card,.camp,.tl,.sec-head,.flow,.two,.row,.gallery').forEach(el=>{el.classList.add('reveal');io.observe(el)});
// counters
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target,t=+b.dataset.count;let n=0;const s=Math.max(1,Math.ceil(t/40));const id=setInterval(()=>{n=Math.min(t,n+s);b.textContent=n+(t>=10?'+':'');if(n>=t)clearInterval(id)},30);co.unobserve(b)}));
$$('[data-count]').forEach(b=>co.observe(b));
// scrollspy
const links=$$('a[data-spy]');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));
// filters
$$('.chip').forEach(c=>c.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('on'));c.classList.add('on');
 $$('.card').forEach(k=>k.classList.toggle('hide',c.dataset.f!=='all'&&k.dataset.cat!==c.dataset.f))});
// event flow
$$('.flow-tabs button').forEach(b=>b.onclick=()=>{$$('.flow-tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');$$('.step').forEach((s,i)=>s.classList.toggle('on',i==b.dataset.step))});
// modal
const modal=$('#modal'),mb=$('#modal-body');
const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
$$('.card').forEach(c=>c.onclick=()=>{mb.innerHTML='';mb.appendChild($('#'+c.dataset.modal).content.cloneNode(true));modal.classList.add('open');modal.setAttribute('aria-hidden','false')});
modal.onclick=e=>{if(e.target===modal||e.target.classList.contains('x')||e.target.hasAttribute('data-close'))close()};
// lightbox
const lb=$('#lb'),lbi=$('img',lb),cap=$('#lb-cap');let set=[],idx=0;
const show=i=>{idx=(i+set.length)%set.length;const im=set[idx];lbi.src=im.src;cap.textContent=im.alt||''};
$$('[data-lightbox]').forEach(g=>{const imgs=$$('img',g);imgs.forEach((im,i)=>im.addEventListener('click',()=>{set=imgs;show(i);lb.classList.add('open')}))});
lb.onclick=e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')};
$('.prev',lb).onclick=()=>show(idx-1);$('.next',lb).onclick=()=>show(idx+1);
addEventListener('keydown',e=>{if(e.key==='Escape'){close();lb.classList.remove('open')}
 if(lb.classList.contains('open')){if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)}});
// copy email
$('#copy').onclick=function(){navigator.clipboard&&navigator.clipboard.writeText('sallyloohjingmun@gmail.com');this.textContent='Copied ✓';setTimeout(()=>this.textContent='Copy email',1800)};
})();
