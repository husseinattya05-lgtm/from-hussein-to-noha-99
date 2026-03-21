const scene = document.querySelector('.scene');
const messageBox = document.querySelector('.message');
const tutorial = document.querySelector('.tutorial');

const emojis = ['🐺','😌','🔥','😸','🙄'];
const particles = [];

let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };

// Messages
const messages = {
  '🐺': "You're strong-minded and smart like a wolf 🐺",
  '😌': "You give me peace and comfort 😌",
  '🔥': "You're pure excitement 🔥",
  '😸': "Your playful teasing is something else 😸",
  '🙄': "When you sing and I understand nothing 🙄"
};

let collected = new Set();

// Tutorial steps
const steps = [
  "Move your mouse and collect the emojis 👀",
  "Get close to attract them 🧲",
  "Collect the same type to reveal a message 😏"
];

let step = 0;

// Show tutorial
function showTutorial(){
  if(step < steps.length){
    tutorial.textContent = steps[step];
    tutorial.classList.add('show');

    setTimeout(()=>{
      tutorial.classList.remove('show');
      step++;
      setTimeout(showTutorial, 500);
    }, 2000);
  }
}

showTutorial();

// Create particles
for(let i=0;i<50;i++){
  const el = document.createElement('div');
  el.className = 'particle';
  el.innerText = emojis[Math.floor(Math.random()*emojis.length)];

  el.x = Math.random()*window.innerWidth;
  el.y = Math.random()*window.innerHeight;

  scene.appendChild(el);
  particles.push(el);
}

// Mouse tracking
window.addEventListener('mousemove', e=>{
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  tutorial.classList.remove('show'); // hide tutorial when moving
});

// Check collection
function checkCollection() {
  let counts = { '🐺':0,'😌':0,'🔥':0,'😸':0,'🙄':0 };

  particles.forEach(p=>{
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 80){
      counts[p.innerText]++;
    }
  });

  for(let key in counts){
    if(counts[key] >= 8 && !collected.has(key)){
      collected.add(key);
      triggerMessage(key);
    }
  }

  // Final message
  if(collected.size === emojis.length){
    setTimeout(()=>{
      messageBox.textContent = "Honestly... my whole day changes just from the little time I spend with you ❤️";
      messageBox.classList.add('show');
    }, 1000);
  }
}

// Show message
function triggerMessage(type){
  messageBox.textContent = messages[type];
  messageBox.classList.add('show');

  setTimeout(()=>{
    messageBox.classList.remove('show');
  }, 2000);
}

// Animation
function animate(){
  particles.forEach(p=>{
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx*dx + dy*dy);

    if(dist < 150){
      p.x += dx * 0.05;
      p.y += dy * 0.05;
    } else {
      p.x += (Math.random()-0.5)*2;
      p.y += (Math.random()-0.5)*2;
    }

    p.style.transform = `translate(${p.x}px, ${p.y}px)`;
  });

  checkCollection();
  requestAnimationFrame(animate);
}

animate();