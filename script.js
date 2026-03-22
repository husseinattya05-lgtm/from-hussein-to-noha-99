document.addEventListener('DOMContentLoaded', ()=>{

  const scene = document.querySelector('.scene');
  const overlay = document.querySelector('.overlay');
  const overlayMessage = document.querySelector('.overlay-message');

  const messages = [
    {emoji:'🐺', text:"You're strong-minded and smart like a wolf 🐺", effect:'wolf-effect'},
    {emoji:'😌', text:"You give me peace and comfort 😌", effect:'peace-effect'},
    {emoji:'🔥', text:"You're pure excitement 🔥", effect:'fire-effect'},
    {emoji:'😸', text:"انتي بتتنمري عمتا 😸", effect:'bounce-effect'},
    {emoji:'🙄', text:"When you sing and I understand nothing 🙄", effect:'spin-effect'},
    {emoji:'❤️', text:"Honestly... my whole day changes just from the little time I spend with you ❤️", effect:'final-effect'}
  ];

  let particles = [];
  let currentIndex = 0;
  let animating = false;

  // ابدأ اللعبة مباشرة
  showNextMessage();
  animating = true;
  animateParticles();

  function initParticles(){
    const type = messages[currentIndex];
    for(let i=0;i<10;i++){
      const el = document.createElement('div');
      el.className='particle';
      el.innerText = type.emoji;
      el.dataset.active="true";
      el.x = Math.random()*window.innerWidth;
      el.y = Math.random()*window.innerHeight;
      el.vx = (Math.random()-0.5)*2;
      el.vy = (Math.random()-0.5)*2;
      if(i===0) el.classList.add('active-glow'); // أول نسخة للنشاط
      el.addEventListener('click', ()=>handleClick(el));
      scene.appendChild(el);
      particles.push(el);
    }
  }

  function handleClick(el){
    if(el.dataset.active!=="true") return;
    el.dataset.active="false";
    el.style.transform+=" scale(1.5)";
    el.style.opacity="0";
    setTimeout(()=>el.remove(),300);

    // تحديث glow للنسخ المتبقية
    const activeParticles = particles.filter(p=>p.dataset.active==="true");
    activeParticles.forEach(p=>p.classList.remove('active-glow'));
    if(activeParticles[0]) activeParticles[0].classList.add('active-glow');

    if(activeParticles.length===0){
      showOverlay();
    }
  }

  function showOverlay(){
    overlayMessage.className='overlay-message '+messages[currentIndex].effect;
    overlay.style.pointerEvents="auto";
    overlayMessage.style.opacity="1";
    typeMessage(messages[currentIndex].text, overlayMessage, ()=>{
      setTimeout(()=>{
        overlayMessage.style.opacity="0";
        overlay.style.pointerEvents="none";
        currentIndex++;
        if(currentIndex < messages.length){
          showNextMessage();
        }
      },1500);
    });
  }

  function typeMessage(text, element, callback){
    element.textContent='';
    let i=0;
    function step(){
      if(i<text.length){
        element.textContent += text[i];
        i++;
        setTimeout(step,40);
      } else if(callback) callback();
    }
    step();
  }

  function showNextMessage(){
    particles.forEach(p=>p.remove());
    particles=[];
    initParticles();
  }

  function animateParticles(){
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0 || p.x>window.innerWidth-30) p.vx*=-1;
      if(p.y<0 || p.y>window.innerHeight-30) p.vy*=-1;
      p.style.transform=`translate(${p.x}px, ${p.y}px)`;
    });
    requestAnimationFrame(animateParticles);
  }

});