const scene = document.querySelector('.scene');
const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

const emojis = ['🐺','😌','🔥','😸','🙄'];
const messages = {
  '🐺': "You're strong-minded and smart like a wolf 🐺",
  '😌': "You give me peace and comfort 😌",
  '🔥': "You're pure excitement 🔥",
  '😸': "Your playful teasing is something else 😸",
  '🙄': "When you sing and I understand nothing 🙄"
};

const finalMessage = "Honestly... my whole day changes just from the little time I spend with you ❤️";

let particles = [];

// Create particles
emojis.forEach(emoji=>{
  const el = document.createElement('div');
  el.className = 'particle';
  el.innerText = emoji;
  el.style.left = Math.random()*(window.innerWidth-50)+'px';
  el.style.top = Math.random()*(window.innerHeight-50)+'px';
  scene.appendChild(el);
  particles.push(el);
});

// Click handler
particles.forEach(p=>{
  p.addEventListener('click', ()=>{
    showOverlay(p);
  });
});

function showOverlay(particle){
  overlayMessage.textContent = messages[particle.innerText];
  overlay.classList.add('show');
  currentParticle = particle;
}

let currentParticle = null;

nextBtn.addEventListener('click', ()=>{
  if(currentParticle){
    // Remove clicked particle
    currentParticle.remove();
    currentParticle = null;
    overlay.classList.remove('show');

    // Check if finished
    if(document.querySelectorAll('.particle').length === 0){
      // Show final message
      overlayMessage.textContent = finalMessage;
      overlay.classList.add('show');
      nextBtn.style.display = 'none';
    }
  }
});