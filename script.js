const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

// Emoji types + messages
const emojiTypes = [
  {emoji:'🐺', message:"You're strong-minded and smart like a wolf 🐺"},
  {emoji:'😌', message:"You give me peace and comfort 😌"},
  {emoji:'🔥', message:"You're pure excitement 🔥"},
  {emoji:'😸', message:"Your playful teasing is something else 😸"},
  {emoji:'🙄', message:"When you sing and I understand nothing 🙄"}
];

const finalMessage = "Honestly... my whole day changes just from the little time I spend with you ❤️";

let particles = [];
let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };

let currentTypeIndex = 0;
let currentActiveIndex = 0;

// Track mouse
window.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Create 10 particles per emoji type
emojiTypes.forEach(type=>{
  type.particles = [];
  for(let i=0;i<10;i++){
    const el = document.createElement('div');
    el.className = 'particle';
    el.innerText = type.emoji;
    el.x = Math.random()*(window.innerWidth-50);
    el.y = Math.random()*(window.innerHeight-50);
    el.vx = (Math.random()-0.5)*1.5;
    el.vy = (Math.random()-0.5)*1.5;
    el.style.left = el.x+'px';
    el.style.top = el.y+'px';
    scene.appendChild(el);
    particles.push(el);
    type.particles.push(el);
  }
});

// Set the active particle
function setActiveParticle(){
  const type = emojiTypes[currentTypeIndex];
  if(!type || type.particles.length === 0){
    overlayMessage.textContent = finalMessage;
    overlay.classList.add('show');
    nextBtn.style.display = 'none';
    return;
  }
  type.particles.forEach(p=>p.classList.remove('active'));
  type.particles[currentActiveIndex].classList.add('active');
}

// Next button click
nextBtn.addEventListener('click', ()=>{
  const type = emojiTypes[currentTypeIndex];
  const p = type.particles[currentActiveIndex];
  p.remove();
  type.particles.splice(currentActiveIndex,1);

  if(type.particles.length === 0){
    currentTypeIndex++;
    currentActiveIndex = 0;
  }
  setActiveParticle();
  overlay.classList.remove('show');
});

// Click listener for active particle
scene.addEventListener('click', e=>{
  const type = emojiTypes[currentTypeIndex];
  const active = type ? type.particles[currentActiveIndex] : null;
  if(active && e.target === active){
    overlayMessage.textContent = type.message;
    overlay.classList.add('show');
  }
});

// Animate function
function animate(){
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0 || p.x > window.innerWidth-50) p.vx *= -1;
    if(p.y < 0 || p.y > window.innerHeight-50) p.vy *= -1;

    // Magnet effect ONLY for current active particle
    const type = emojiTypes[currentTypeIndex];
    const active = type ? type.particles[currentActiveIndex] : null;
    if(active === p){
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 200){ // نطاق واضح
        p.vx += dx*0.05; 
        p.vy += dy*0.05;
      }
      p.vx *= 0.9; // smooth
      p.vy *= 0.9;
    }

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  requestAnimationFrame(animate);
}

// Start game
setActiveParticle();
animate();