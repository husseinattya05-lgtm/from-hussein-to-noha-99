// Magnet effect ONLY for current active particle
const active = type ? type.particles[currentActiveIndex] : null;
if(active === p){
    let dx = mouse.x - p.x;
    let dy = mouse.y - p.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if(dist < 200){ // نطاق أكبر للmagnet
        // قوة الجذب أقوى
        p.vx += dx*0.05; 
        p.vy += dy*0.05;
    }
    // إبطاء لتجنب السرعة الزائدة
    p.vx *= 0.9;
    p.vy *= 0.9;
}