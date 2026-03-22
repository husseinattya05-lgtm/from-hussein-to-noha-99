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

function lerp(a,b,t){ return a + (b-a)*t; }

// Typing animation
function typeMessage(text, element, callback){
  element.textContent = '';
  let i=0;
  function step(){
    if(i<text.length){
      element.textContent += text[i];
      i++;
      setTimeout(step, 40);
    } else if(callback) callback();
  }
  step();
}

// Check if all collected
function checkAllCollected(type){
  return type.particles.every(p=>{
    const dx = p.x - window.innerWidth/2;
    const dy = p.y - window.innerHeight/2;
    return Math.sqrt(dx*dx + dy*dy) < 50;
  });
}

nextBtn.addEventListener('click', ()=>{
  const type = emojiTypes[currentTypeIndex];
  type.particles.forEach(p=>p.remove());
  currentTypeIndex++;
  overlay.classList.remove('show');
  if(currentTypeIndex >= emojiTypes.length){
    overlayMessage.textContent = finalMessage;
    nextBtn.style.display = 'none';
    overlay.classList.add('show');
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
      // Gradual magnet effect with slight delay
      p.x = lerp(p.x, window.innerWidth/2, 0.05);
      p.y = lerp(p.y, window.innerHeight/2, 0.05);
    }

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  const type = emojiTypes[currentTypeIndex];
  if(type && checkAllCollected(type) && !overlay.classList.contains('show')){
    overlay.classList.add('show');
    typeMessage(type.message, overlayMessage);
  }

  requestAnimationFrame(animate);
}

animate();