const overlay = document.querySelector('.overlay');
const overlayMessage = document.querySelector('.overlay-message');
const nextBtn = document.querySelector('.next-btn');

const messages = [
  {text:"You're strong-minded and smart like a wolf 🐺", effect:"wolf-effect"},
  {text:"You give me peace and comfort 😌", effect:"peace-effect"},
  {text:"You're pure excitement 🔥", effect:"fire-effect"},
  {text:"انتي بتتنمري عمتا 😸", effect:"bounce-effect"},
  {text:"When you sing and I understand nothing 🙄", effect:"spin-effect"},
  {text:"Honestly... my whole day changes just from the little time I spend with you ❤️", effect:"final-effect"}
];

let currentIndex = 0;

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

function showMessage(index){
  overlayMessage.className = 'overlay-message '+messages[index].effect;
  overlay.classList.add('show');
  typeMessage(messages[index].text, overlayMessage);
}

nextBtn.addEventListener('click', ()=>{
  overlay.classList.remove('show');
  currentIndex++;
  if(currentIndex<messages.length){
    setTimeout(()=>{ showMessage(currentIndex); }, 500); // small transition delay
  } else {
    nextBtn.style.display = 'none';
  }
});

// Start with first message
showMessage(currentIndex);