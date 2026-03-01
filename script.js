

/* ── DRAWER TOGGLE (fully working) ── */
const toggle=document.getElementById('nav-toggle');
const drawer=document.getElementById('nav-links');
const overlay=document.getElementById('drawer-overlay');

function openDrawer(){
  toggle.classList.add('open');
  drawer.classList.add('open');
  overlay.classList.add('open');
  toggle.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
}
function closeDrawer(){
  toggle.classList.remove('open');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}

toggle.addEventListener('click',()=>{
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
overlay.addEventListener('click', closeDrawer);
document.querySelectorAll('#nav-links a').forEach(a=>a.addEventListener('click', closeDrawer));
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeDrawer(); });

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(!t)return;
    e.preventDefault();
    window.scrollTo({top:t.getBoundingClientRect().top+scrollY-76,behavior:'smooth'});
  });
});

/* Reveal */
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');});},{threshold:0.07,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* Active nav */
const secs=[...document.querySelectorAll('section[id]')];
window.addEventListener('scroll',()=>{
  const sp=scrollY+100;
  secs.forEach(s=>{
    if(sp>=s.offsetTop&&sp<s.offsetTop+s.offsetHeight){
      document.querySelectorAll('.nav-links-desktop a, #nav-links .nav-item a').forEach(l=>l.classList.remove('active'));
      document.querySelectorAll(`.nav-links-desktop a[href="#${s.id}"], #nav-links .nav-item a[href="#${s.id}"]`).forEach(l=>l.classList.add('active'));
    }
  });
},{passive:true});

/* Scroll top */
const stb=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>stb.classList.toggle('show',scrollY>300),{passive:true});
stb.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* ══ AMENITIES SLIDER ══ */
(function(){
  const slider=document.getElementById('amSlider');
  const slides=[...slider.querySelectorAll('.am-slide')];
  const dotsWrap=document.getElementById('amDots');
  let current=0;
  let perView=4;
  let autoTimer=null;

  function getPerView(){
    if(window.innerWidth<=576)return 1;
    if(window.innerWidth<=900)return 2;
    return 4;
  }

  const totalGroups=()=>Math.ceil(slides.length/perView);

  function buildDots(){
    dotsWrap.innerHTML='';
    for(let i=0;i<totalGroups();i++){
      const d=document.createElement('button');
      d.className='am-dot'+(i===current?' active':'');
      d.setAttribute('aria-label',`Group ${i+1}`);
      d.addEventListener('click',()=>goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx){
    const groups=totalGroups();
    current=(idx+groups)%groups;
    const slideW=slides[0].offsetWidth+16;
    slider.scrollTo({left:current*perView*slideW,behavior:'smooth'});
    buildDots();
  }

  function startAuto(){
    autoTimer=setInterval(()=>goTo(current+1),3500);
  }
  function stopAuto(){clearInterval(autoTimer);}

  document.getElementById('amNext').addEventListener('click',()=>{stopAuto();goTo(current+1);startAuto();});
  document.getElementById('amPrev').addEventListener('click',()=>{stopAuto();goTo(current-1);startAuto();});

  window.addEventListener('resize',()=>{
    perView=getPerView();
    current=0;
    buildDots();
    slider.scrollTo({left:0,behavior:'auto'});
  });

  perView=getPerView();
  buildDots();
  startAuto();
})();

/* Phone validation */
function validPhone(p){return/^[6-9]\d{9}$/.test(p.replace(/\D/g,''));}

/* Hero form */
const hf=document.getElementById('heroForm');
hf.addEventListener('submit',function(e){
  e.preventDefault();
  const n=this.querySelector('[name="name"]').value.trim();
  const p=this.querySelector('[name="phone"]').value.trim();
  const pr=this.querySelector('[name="preference"]').value;
  if(!n||n.length<2){alert('Please enter your full name.');return;}
  if(!validPhone(p)){alert('Please enter a valid 10-digit Indian mobile number.');return;}
  if(!pr){alert('Please select a preference.');return;}
  const btn=this.querySelector('.btn-cta');
  btn.innerHTML='<i class="bi bi-hourglass-split"></i> Sending…';btn.disabled=true;
  setTimeout(()=>{this.reset();document.getElementById('heroSuccess').style.display='block';btn.innerHTML='<i class="bi bi-file-earmark-text"></i> Get Cost Sheet';btn.disabled=false;},1200);
});

document.getElementById('hf-pref').addEventListener('change',function(){
  const btn=document.getElementById('heroBtn');
  btn.innerHTML=this.value==='site-visit'
    ?'<i class="bi bi-calendar-check"></i> Book Site Visit →'
    :'<i class="bi bi-file-earmark-text"></i> Get Cost Sheet';
});

/* Contact form */
document.getElementById('enquiryForm').addEventListener('submit',function(e){
  e.preventDefault();
  const s=document.getElementById('cfSuccess');const er=document.getElementById('cfError');
  s.style.display='none';er.style.display='none';
  const n=document.getElementById('cf-name').value.trim();
  const m=document.getElementById('cf-mobile').value.trim();
  const err=msg=>{er.textContent=msg;er.style.display='block';};
  if(!n||n.length<2)return err('Please enter your full name.');
  if(!validPhone(m))return err('Please enter a valid 10-digit mobile number.');
  const btn=this.querySelector('.btn-cta');btn.innerHTML='<i class="bi bi-hourglass-split"></i> Sending…';btn.disabled=true;
  setTimeout(()=>{s.style.display='block';this.reset();btn.innerHTML='<i class="bi bi-send-fill"></i> Send Enquiry';btn.disabled=false;},1400);
});