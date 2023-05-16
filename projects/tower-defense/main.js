const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const pause = document.querySelector('.stop');
const pauseIMG = document.querySelector('.stop img')
const theme = document.querySelector('.change-theme');
const blurcanvas = document.querySelector('.blur');
const tabs = document.querySelectorAll('.tab');

let moon = true;
let sun = false;

const width = (canvas.width = (window.innerWidth / 100 * 70));
const height = (canvas.height = window.innerHeight);

const windowwidth = width / 2;
const windowheight = height / 2;

const ratio = width / height;

let cash = 0;

let stats = {
  attack: {
    speed: 1,
    damage: 5,
    critChance: 1.00,
    critFactor: 1.20,
    range: 100,
    multiChance: 0.50 
  },
  defense: {
    health: 10,
    waveRegen: 1,
    armor: 2
  },
  utilities: {
    waveCash: 0
  }
}

let upgrades = {
  attack: {
    speed: stats.attack.speed,
    damage: stats.attack.damage,
    critChance: stats.attack.critChance,
    critFactor: stats.attack.critFactor,
    range: stats.attack.range,
    multiChance: stats.attack.multiChance
  },
  defense: {
    health: stats.defense.health,
    waveRegen: stats.defense.waveRegen,
    armor: stats.defense.armor
  },
  utilities: {
    waveCash: stats.utilities.waveCash
  }
}

function upgradeRefresh(lmnt){
  document.querySelector('.cash').textContent = cash + "$";
  document.querySelector('.damage').textContent = upgrades.attack.damage;
  document.querySelector('.speed').textContent = upgrades.attack.speed+"x";
  document.querySelector('.critchance').textContent = upgrades.attack.critChance+".00%";
  document.querySelector('.critfactor').textContent = upgrades.attack.critFactor+"x";
  document.querySelector('.range').innerHTML = upgrades.attack.range+"m<sup>2</sup>";
  if(lmnt == undefined) {
    return;
  }
  let btn = document.querySelector(`.${lmnt}`);
  let num = parseFloat(btn.textContent);
  btn.textContent = Math.round(parseFloat((num * 1.3).toFixed(2)));
}

upgradeRefresh(undefined);

let wave = 1;

function openTab(tab) {
  for(let i = 0; i < tabs.length; i++){
    tabs[i].setAttribute('style', 'background-color: transparent; color: var(--text-color)')
  }
  tab.setAttribute('style', 'background-color: var(--button-stroke); color: var(--menu-bg);')
}
function increment(num) {
  for(let i = 1; i <= wave; i++){
    num *= 1.1;
  }
  num = parseFloat(num.toFixed(2));
  return num;
}

let enemystats = {
  troop: {
    health: [4, increment(4)],
    damage: [2, increment(2)],
    speed: 1
  },
  sonic: {
    health: [3, increment(3)],
    damage: [1, increment(1)],
    speed: 1.5
  },
  tank: {
    health: [10, increment(10)],
    damage: [3, increment(3)],
    speed: 0.75
  },
  shooter: {
    health: [4, increment(4)],
    damage: [5, increment(5)],
    speed: 1.2,
    rate: 1
  },
  boss: {
    health: [15, increment(15)],
    damage: [1, increment(1)],
    speed: 0.5
  }
}

let colorScheme = ['rgb(30, 30, 40)', 'rgb( 230, 230, 230 )'];

const buttons = document.querySelectorAll('.upgrade');

for(const button of buttons) {
  button.addEventListener('click', function() {
    return;
  })
}

class Shape {
  constructor(x, y, width, height, color) {
    this.constX = x;
    this.constY = y;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
}
class Enemy extends Shape {
  constructor(x, y, width, height, color, dmg){
    super(x, y, width, height, color);
    this.shot = false;
    this.health = enemystats.troop.health[1];
    this.healthCopy = enemystats.troop.health[1];
    this.dmg = enemystats.troop.damage[1];
  }
  move() {
    const ratioX = (windowwidth -this.constX) / windowheight;
    const ratioY = (windowheight -this.constY) / windowwidth;

    if      ( this.constX < windowwidth && this.constY == 0      || this.constY == 0 && this.constX >= windowwidth      ) { this.x += ratioX ; this.y += 1             }
    else if ( this.constX == 0 && this.constY < windowheight     || this.constY > windowheight && this.constX == 0      ) { this.x += ratio ; this.y += ratioY * ratio }
    else if ( this.constY < windowheight && this.constX == width || this.constY >= windowheight && this.constX == width ) { this.x -= ratio ; this.y += ratioY * ratio }
    else if ( this.constY == height && this.constX < windowwidth || this.constY == height && this.constX >= windowwidth ) { this.x += ratioX ; this.y -= 1             }
  }
  borderDetect() {
    if((this.x >= windowwidth-25 && this.x <= windowwidth+25) && (this.y >= windowheight-25 && this.y <= windowheight+25)){
      tower.health -= this.dmg;
      tower.health = parseFloat(tower.health.toFixed(2))
      if(tower.health <= 0){
        endGame();
      }
      enemies.splice(enemies.indexOf(this), 1);
    }
  }
  spawn() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'red';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
class Tower extends Shape{
  constructor(x, y, width, height, color, range, dmg, health){
    super(x, y, width, height, color);
    this.range = range;
    this.health = health;
  }
  spawn() {
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.arc(this.x, this.y, upgrades.attack.range, 0, Math.PI*2);
    ctx.strokeStyle = colorScheme[1];
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 150, 0)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 150, 0)';
    ctx.arc(this.x, this.y, this.width/1.5, 0, Math.PI*2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 170, 0)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 170, 0)';
    ctx.arc(this.x, this.y, this.width/2, 0, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 190, 0)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 190, 0)';
    ctx.arc(this.x, this.y, this.width/2.5, 0, Math.PI*2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgb(0, 210, 0)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 210, 0)';
    ctx.arc(this.x, this.y, this.width/3, 0, Math.PI*2);
    ctx.fill();
  }
  shoot(enemy) {
    if(!(enemy.shot) && shot == false){
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;

      const distance = Math.sqrt(dx*dx + dy*dy);

      if(distance < upgrades.attack.range + enemy.width) {
        enemy.healthCopy -= upgrades.attack.damage;
        if(enemy.healthCopy < 0.01){
          enemy.shot = true;
        }
        bullets.push({
          target: enemy,
          speed: 10,
          direction: [ enemy.constX , enemy.constY ],
          x: windowwidth,
          y: windowheight,
          crit: false,
          shape: function () {
            ctx.beginPath()
            ctx.rect(this.x, this.y, 5, 5);
            ctx.shadowBlur = 10;
            ctx.shadowColor = "cyan";
            ctx.fillStyle = 'cyan';
            ctx.fill();
          }
        });
        shot = true;
      }
    }
  }
}
class Bullet extends Tower{
  move(bullet) {
    const ratioX = (windowwidth -bullet.target.constX) / windowheight;
    const ratioY = (windowheight -bullet.target.constY) / windowwidth;

    if      ( bullet.target.constX < windowwidth && bullet.target.constY == 0      || bullet.target.constY == 0 && bullet.target.constX >= windowwidth      ) { bullet.x += -ratioX * 2 ; bullet.y += -1 * 2             }
    else if ( bullet.target.constX == 0 && bullet.target.constY < windowheight     || bullet.target.constY > windowheight && bullet.target.constX == 0      ) { bullet.x += -ratio * 2 ; bullet.y += -ratioY * ratio * 2 }
    else if ( bullet.target.constY < windowheight && bullet.target.constX == width || bullet.target.constY >= windowheight && bullet.target.constX == width ) { bullet.x -= -ratio * 2 ; bullet.y += -ratioY * ratio * 2 }
    else if ( bullet.target.constY == height && bullet.target.constX < windowwidth || bullet.target.constY == height && bullet.target.constX >= windowwidth ) { bullet.x += -ratioX * 2 ; bullet.y -= -1 * 2             }
    bullet.shape(); 
  }
  hit(bullet, damage) {
    const dx = bullet.target.x - bullet.x; 
    const dy = bullet.target.y - bullet.y;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < 7 + bullet.target.width) {
      bullet.target.health -= upgrades.attack.damage;
      if(bullet.target.health < 0.01){
        cash++;
        enemies.splice(enemies.indexOf(bullet.target), 1);
      }
      bullets.splice(bullets.indexOf(bullet), 1);
    }
  }
}
let bullets = [];
let enemies = [];

let count = 0;
let tower = new Tower(windowwidth, windowheight, 20, 20, 'green', upgrades.attack.range, upgrades.attack.damage, upgrades.defense.health);

let fps_spawn, fpsInterval_spawn, startTime_spawn, now_spawn, then_spawn, elapsed_spawn;

let stopGame = false;

function endGame() {
  stopGame = true;
  pause.setAttribute('disabled', '');
  blurcanvas.setAttribute('style', 'display: block;')
  blurcanvas.style.width = "60vw";
  blurcanvas.style.height = height;
  blurcanvas.style.border = '5px solid var(--button-stroke)';
}
function animateSpawn() {
  fpsInterval_spawn = Math.floor(Math.random() * 1500 + 1500 );
  then_spawn = Date.now();
  startTime_spawn = then_spawn;
  spawn();
}

function spawn() {
  if(stopGame){
    return;
  }
  requestAnimationFrame(spawn);
  now_spawn = Date.now();
  elapsed_spawn = now_spawn - then_spawn;
  if (elapsed_spawn > fpsInterval_spawn) {
    then_spawn = now_spawn - (elapsed_spawn % fpsInterval_spawn);
    const square = new Enemy(Math.floor(Math.random() * width), 0, 10, 10);
    enemies.push(square);
    const ta = new Enemy(Math.floor(Math.random() * width), height, 10, 10);
    enemies.push(ta);
    // const sfrequare = new Enemy(0, Math.floor(Math.random() * height), 10, 10);
    // enemies.push(sfrequare);
    // const frae = new Enemy(width, Math.floor(Math.random() * height), 10, 10);
    // enemies.push(frae);
    count++
  }
}

animateSpawn();

let fps_loop, fpsInterval_loop, startTime_loop, now_loop, then_loop, elapsed_loop;

function animateLoop() {
  fpsInterval_loop = 5;
  then_loop = Date.now();
  startTime_loop = then_loop;
  loop();
}

function loop() {
  if(stopGame){
    return;
  }
  requestAnimationFrame(loop);
  now_loop = Date.now();
  elapsed_loop = now_loop - then_loop;
  if (elapsed_loop > fpsInterval_loop) {
    then_loop = now_loop - (elapsed_loop % fpsInterval_loop);
    const bullet = new Bullet(windowwidth, windowheight, 20, 20, 'green', upgrades.attack.range, upgrades.attack.damage, upgrades.defense.health);
    document.querySelector('.cash').textContent = cash + "$";
    ctx.fillStyle = colorScheme[0];
    ctx.fillRect(0, 0, width, height);
    tower.spawn()
    for (let enemy of enemies) {
      enemy.spawn();
      enemy.move();
      enemy.borderDetect();
    }
    for(const item of bullets){
      bullet.move(item);
      bullet.hit(item, upgrades.attack.damage);
    }
  }
}

animateLoop();

let shot = false;

let fps_shoot, fpsInterval_shoot, startTime_shoot, now_shoot, then_shoot, elapsed_shoot;

function animateShoot() {
  fpsInterval_shoot = 400 / upgrades.attack.speed;
  then_shoot = Date.now();
  startTime_shoot = then_shoot;
  shoot();
}

function shoot() {
  if(stopGame){
    return;
  }
  requestAnimationFrame(shoot);
  now_shoot = Date.now();
  elapsed_shoot = now_shoot - then_shoot;
  if (elapsed_shoot > fpsInterval_shoot) {
    then_shoot = now_shoot - (elapsed_shoot % fpsInterval_shoot);
    for(let enemy of enemies){
      tower.shoot(enemy);
    }
    shot = false;
  }
}

animateShoot();

pause.addEventListener('click', function() {
  if(stopGame){
    if(moon){
      pauseIMG.setAttribute('src', './pause.png');
    } else {
      pauseIMG.setAttribute('src', './pause-black.png');
    }
    stopGame = false;
    animateLoop();
    animateShoot();
    animateSpawn();
  } else {
    if(moon){
      pauseIMG.setAttribute('src', './play.png');
    } else {
      pauseIMG.setAttribute('src', './play-black.png');
    }
    stopGame = true;
  }
})

theme.addEventListener('click', function() {
  if(moon){
    theme.innerHTML = `<img src="./sun.png" alt="sun" class="theme">`;
    colorScheme = ['rgb( 230, 230, 230 )', 'rgb(30, 30, 40)'];
    document.documentElement.style.setProperty('--menu-bg', 'rgb(190, 190, 190)');
    document.documentElement.style.setProperty('--menu-shadow', 'rgb(190, 190, 190)');
    document.documentElement.style.setProperty('--button-stroke', 'rgb(20, 20, 30)');
    document.documentElement.style.setProperty('--text-color', 'rgb(20, 20, 30)');
    document.querySelector(".settings-icon").setAttribute('src', './settings-black.png')
    moon = false;
    sun = true;
    ctx.fillStyle = colorScheme[0];
    ctx.fillRect(0, 0, width, height);
    if(stopGame){
      pauseIMG.setAttribute('src', './play-black.png');
      animateLoop();
      animateShoot();
      animateSpawn();
    } else {
      pauseIMG.setAttribute('src', './pause-black.png');
    }
  } else {
    theme.innerHTML = `<img src="./moon.png" alt="moon" class="theme">`;
    colorScheme = ['rgb(30, 30, 40)', 'rgb( 230, 230, 230 )'];
    document.documentElement.style.setProperty('--menu-bg', 'rgb(20, 20, 30)');
    document.documentElement.style.setProperty('--menu-shadow', 'rgb(20, 20, 30)');
    document.documentElement.style.setProperty('--button-stroke', 'rgb(240, 240, 240)');
    document.documentElement.style.setProperty('--text-color', 'rgb(240, 240, 240)');
    document.querySelector(".settings-icon").setAttribute('src', './settings.png');
    moon = true;
    sun = false;
    ctx.fillStyle = colorScheme[0];
    ctx.fillRect(0, 0, width, height);
    if(stopGame){
      pauseIMG.setAttribute('src', './play.png');
      animateLoop();
      animateShoot();
      animateSpawn();
    } else {
      pauseIMG.setAttribute('src', './pause.png');
    }
  }
});