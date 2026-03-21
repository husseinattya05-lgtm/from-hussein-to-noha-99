const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

const emojiQueue = ['🐺','😌','🔥','😸','🙄']; // ترتيب الظهور
const messages = {
  '🐺': "You're strong-minded and smart like a wolf 🐺",
  '😌': "You give me peace and comfort 😌",
  '🔥': "You're pure excitement 🔥",
  '😸': "Your playful teasing is something else 😸",
  '🙄': "When you sing and I understand nothing 🙄"
};
const finalMessage = "Honestly... my whole day changes just from the little time I spend with you ❤️";

let particles = [];
let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let activeEmoji = null;

// Track mouse
window.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Create all particles at once
emojiQueue.forEach(emoji=>{
  const el = document.createElement('div');
  el.className = 'particle';
  el.innerText = emoji;
  el.x = Math.random()*(window.innerWidth-50);
  el.y = Math.random()*(window.innerHeight-50);
  el.vx = (Math.random()-0.5)*1.5;
  el.vy = (Math.random()-0.5)*1.5;
  el.style.left = el.x+'px';
  el.style.top = el.y+'px';
  scene.appendChild(el);
  particles.push(el);

  el.addEventListener('click', ()=>{
    if(el === activeEmoji){
      overlayMessage.textContent = messages[emoji];
      overlay.classList.add('show');
    }
  });
});

// Function to activate next emoji
function activateNextEmoji(){
  if(particles.length === 0){
    overlayMessage.textContent = finalMessage;
    overlay.classList.add('show');
    nextBtn.style.display = 'none';
    return;
  }

  activeEmoji = particles.shift(); // first one in the list becomes active
}

// Next button click
nextBtn.addEventListener('click', ()=>{
  if(activeEmoji){
    activeEmoji.remove();
    activeEmoji = null;
    overlay.classList.remove('show');
    activateNextEmoji();
  }
});

// Animate function
function animate(){
  particles.forEach(p=>{
    // move all particles
    p.x += p.vx;
    p.y += p.vy;

    // simple bounce
    if(p.x < 0 || p.x > window.innerWidth-50) p.vx *= -1;
    if(p.y < 0 || p.y > window.innerHeight-50) p.vy *= -1;

    // magnet effect ONLY for active emoji
    if(p === activeEmoji){
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

// Start game
activateNextEmoji();
animate();