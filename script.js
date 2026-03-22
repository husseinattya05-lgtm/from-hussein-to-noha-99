const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

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
let isPressed = false;

let currentTypeIndex = 0;

window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mousedown', ()=>{ isPressed = true; });
window.addEventListener('mouseup', ()=>{ isPressed = false; });
window.addEventListener('touchstart', ()=>{ isPressed = true; });
window.addEventListener('touchend', ()=>{ isPressed = false; });

// Create 10 particles per type
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

function checkAllCollected(type){
  // Check if all particles are near center
  return type.particles.every(p=>{
    const dx = p.x - window.innerWidth/2;
    const dy = p.y - window.innerHeight/2;
    return Math.sqrt(dx*dx + dy*dy) < 50;
  });
}

nextBtn.addEventListener('click', ()=>{
  const type = emojiTypes[currentTypeIndex];
  // Remove all particles of current type
  type.particles.forEach(p=>p.remove());
  currentTypeIndex++;
  if(currentTypeIndex >= emojiTypes.length){
    overlayMessage.textContent = finalMessage;
    nextBtn.style.display = 'none';
  } else {
    overlay.classList.remove('show');
  }
});

function animate(){
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    if(p.x<0 || p.x>window.innerWidth-50) p.vx*=-1;
    if(p.y<0 || p.y>window.innerHeight-50) p.vy*=-1;

    const type = emojiTypes[currentTypeIndex];
    if(type.particles.includes(p) && isPressed){
      // magnet towards center
      const dx = window.innerWidth/2 - p.x;
      const dy = window.innerHeight/2 - p.y;
      p.vx += dx*0.02;
      p.vy += dy*0.02;
      p.vx *= 0.9;
      p.vy *= 0.9;
    }

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  // check if all collected
  const type = emojiTypes[currentTypeIndex];
  if(type && checkAllCollected(type)){
    overlayMessage.textContent = type.message;
    overlay.classList.add('show');
  }

  requestAnimationFrame(animate);
}

animate();