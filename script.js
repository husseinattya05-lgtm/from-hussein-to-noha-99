const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const tutorial = document.querySelector('.tutorial');
const startBtn = document.querySelector('.start-btn');

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

startBtn.addEventListener('click', ()=>{
  tutorial.style.display='none';
  nextMessage();
  animate();
});

// تهيئة النسخ للنوع الحالي
function initParticles(){
  const type = messages[currentIndex];
  for(let i=0;i<10;i++){
    const el = document.createElement('div');
    el.className='particle';
    el.innerText=type.emoji;
    el.dataset.active = "true"; // النسخ الحالية قابلة للتفاعل
    el.x = Math.random()*window.innerWidth;
    el.y = Math.random()*window.innerHeight;
    el.vx = (Math.random()-0.5)*1.5;
    el.vy = (Math.random()-0.5)*1.5;
    el.addEventListener('click', ()=>handleInteraction(el));
    scene.appendChild(el);
    particles.push(el);
  }
}

// التفاعل مع النسخ
function handleInteraction(el){
  if(el.dataset.active!=="true") return; // غير نشطة
  el.dataset.active="false";
  el.style.transition="transform 0.3s, opacity 0.3s";
  el.style.transform+=" scale(1.5)";
  el.style.opacity="0";
  setTimeout(()=>el.remove(),300);

  // تحقق إذا انتهت جميع النسخ
  if(particles.every(p=>p.dataset.active==="false")){
    showOverlay();
  }
}

// Typing effect
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

// عرض الرسالة
function showOverlay(){
  overlayMessage.className='overlay-message '+messages[currentIndex].effect;
  overlay.classList.add('show');
  typeMessage(messages[currentIndex].text, overlayMessage, ()=>{
    setTimeout(()=>{
      overlay.classList.remove('show');
      currentIndex++;
      if(currentIndex<messages.length){
        nextMessage();
      }
    },1500);
  });
}

// الانتقال للنوع التالي
function nextMessage(){
  // إزالة أي نسخ قديمة
  particles.forEach(p=>p.remove());
  particles=[];
  initParticles();
}

// تحريك النسخ
function animate(){
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x<0 || p.x>window.innerWidth-30) p.vx*=-1;
    if(p.y<0 || p.y>window.innerHeight-30) p.vy*=-1;
    p.style.transform=`translate(${p.x}px, ${p.y}px)`;
  });
  requestAnimationFrame(animate);
}