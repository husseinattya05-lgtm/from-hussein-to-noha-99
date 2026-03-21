const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

// Define emoji types and messages
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
let currentActiveIndex = 0; // index of active particle in current type

// Track mouse
window.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Create 10 particles per emoji type
emojiTypes.forEach((type, typeIdx)=>{
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

    el.addEventListener('click', ()=>{
      if(typeIdx === currentTypeIndex && el === type.particles[currentActiveIndex]){
        overlayMessage.textContent = type.message;
        overlay.classList.add('show');
      }
    });
  }
});

function nextActive(){
  const currentType = emojiTypes[currentTypeIndex];
  currentActiveIndex++;
  if(currentActiveIndex >= currentType.particles.length){
    currentTypeIndex++;
    currentActiveIndex = 0;
    if(currentTypeIndex >= emojiTypes.length){
      overlayMessage.textContent = finalMessage;
      overlay.classList.add('show');
      nextBtn.style.display = 'none';
      return;
    }
  }
}

// Next button
nextBtn.addEventListener('click', ()=>{
  const currentType = emojiTypes[currentTypeIndex];
  const currentParticle = currentType.particles[currentActiveIndex];
  currentParticle.remove();
  overlay.classList.remove('show');
  nextActive();
});

// Animate function
function animate(){
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;

    // bounce edges
    if(p.x < 0 || p.x > window.innerWidth-50) p.vx *= -1;
    if(p.y < 0 || p.y > window.innerHeight-50) p.vy *= -1;

    // Apply magnet only to current active particle
    const currentType = emojiTypes[currentTypeIndex];
    if(currentType && currentType.particles[currentActiveIndex] === p){
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120){
        p.vx += dx*0.002;
        p.vy += dy*0.002;
      }
      p.vx *= 0.95;
      p.vy *= 0.95;
    }

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  requestAnimationFrame(animate);
}

// Start animation
animate();