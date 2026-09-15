const GAMES = [
  ['Click Rush','⚡','click'],['Number Guess','🔢','guess'],['Memory Match','🧠','memory'],
  ['Reaction Test','🚦','reaction'],['Target Tap','🎯','target'],['Quick Math','➗','math'],
  ['Color Match','🎨','color'],['Odd One Out','🔍','odd'],['Rock Paper Scissors','✊','rps'],
  ['Coin Flip','🪙','coin'],['Dice Roll','🎲','dice'],['Higher or Lower','📈','higher'],
  ['Word Scramble','🔤','scramble'],['Typing Sprint','⌨️','typing'],['Emoji Quiz','😎','emoji'],
  ['Trivia Blast','❓','trivia'],['True or False','✅','tf'],['Basketball Shot','🏀','sports'],
  ['Penalty Kick','⚽','sports'],['Tennis Tap','🎾','sports'],['Boxing Reflex','🥊','reaction'],
  ['Golf Aim','⛳','sports'],['Bowling Strike','🎳','sports'],['Space Dodger','🚀','dodge'],
  ['Meteor Run','☄️','dodge'],['Car Dodge','🚗','dodge'],['Bike Dash','🚴','dodge'],
  ['Road Cross','🛣️','dodge'],['Treasure Hunt','💎','memory'],['Maze Escape','🌀','maze'],
  ['Safe Cracker','🔐','code'],['Pattern Lock','🔢','sequence'],['Lights Out','💡','lights'],
  ['2048 Mini','🧩','merge'],['Tic Tac Toe','⭕','ttt'],['Connect 4 Mini','🔴','connect'],
  ['Hangman Mini','🎯','hangman'],['Simon Says','🟢','simon'],['Sequence Tap','🔢','sequence'],
  ['Bubble Pop','🫧','click'],['Fruit Slice','🍉','click'],['Ninja Tap','🥷','reaction'],
  ['Fireworks Tap','🎆','click'],['Treasure Clicker','🪙','click'],['Idle Miner','⛏️','click'],
  ['Farm Clicker','🌾','click'],['Rocket Tap','🚀','click'],['Color Memory','🌈','memory'],
  ['Quick Quiz','🧩','quiz'],['Word Builder','🔤','word'],['Number Rush','🔢','math'],
  ['Avoid Blocks','🟥','dodge'],['Catch Ball','⚾','target'],['Goal Keeper','🥅','target'],
  ['Space Shooter','👾','shooter'],['Mini Pong','🏓','pong']
];

const CATS = ['All','Quick','Puzzle','Sports','Arcade','Quiz'];

const cat = (i) => {
  if (i % 5 === 0) return 'Puzzle';
  if (i % 5 === 1) return 'Quick';
  if (i % 5 === 2) return 'Arcade';
  if (i % 5 === 3) return 'Sports';
  return 'Quiz';
};

const gameGrid = document.getElementById('gameGrid');
const gameSearch = document.getElementById('gameSearch');
const chips = document.getElementById('chips');
const gameBox = document.getElementById('gameBox');
const gameTitle = document.getElementById('gameTitle');
const gameArea = document.getElementById('gameArea');
const closeGame = document.getElementById('closeGame');

let activeCat = 'All';

CATS.forEach(c => {
  const b = document.createElement('button');
  b.className = 'chip' + (c === 'All' ? ' active' : '');
  b.textContent = c;
  b.onclick = () => {
    activeCat = c;
    document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    renderGames();
  };
  chips.appendChild(b);
});

function renderGames() {
  const q = (gameSearch.value || '').toLowerCase();

  gameGrid.innerHTML = '';

  GAMES.forEach((g, i) => {
    const category = cat(i);

    if (activeCat !== 'All' && category !== activeCat) return;
    if (q && !g[0].toLowerCase().includes(q)) return;

    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => openGame(i);

    card.innerHTML = `
      <div class="thumb">${g[1]}</div>
      <h3>${g[0]}</h3>
      <p>${category} • Play</p>
    `;

    gameGrid.appendChild(card);
  });
}

gameSearch.oninput = renderGames;

function openGame(index) {
  const g = GAMES[index];

  gameBox.style.display = 'block';
  gameTitle.textContent = g[0];
  gameArea.innerHTML = '';

  if (g[2] === 'guess') return guessGame();
  if (g[2] === 'math') return mathGame();
  if (g[2] === 'rps') return rpsGame();
  if (g[2] === 'reaction') return reactionGame();
  if (g[2] === 'memory') return memoryGame();
  if (g[2] === 'typing') return typingGame();
  if (g[2] === 'scramble') return scrambleGame();
  if (g[2] === 'dodge') return dodgeGame();
  if (g[2] === 'target') return targetGame();
  if (g[2] === 'sports') return sportsGame(g[0]);
  if (g[2] === 'quiz' || g[2] === 'tf' || g[2] === 'emoji') return quizGame();
  if (g[2] === 'code' || g[2] === 'sequence') return sequenceGame();
  if (g[2] === 'maze') return mazeGame();
  if (g[2] === 'lights') return lightsGame();
  if (g[2] === 'ttt') return tttGame();

  return clickGame(g[0]);
}

closeGame.onclick = () => {
  gameBox.style.display = 'none';
  gameArea.innerHTML = '';
};

function box(html) {
  gameArea.innerHTML = `<div class="playbox">${html}</div>`;
}

function clickGame(name) {
  let score = 0;
  let time = 10;
  let running = false;

  box(`
    <h2>${name}</h2>
    <p>10 seconds mein jitne clicks ho sake karo.</p>
    <h1 id="score">0</h1>
    <p>Time: <b id="time">10</b>s</p>
    <button class="bigbtn" id="tap">TAP!</button>
  `);

  const tap = document.getElementById('tap');

  tap.onclick = () => {
    if (!running) {
      running = true;

      const timer = setInterval(() => {
        time--;
        document.getElementById('time').textContent = time;

        if (time <= 0) {
          clearInterval(timer);
          tap.disabled = true;
          tap.textContent = 'GAME OVER';
        }
      }, 1000);
    }

    if (time > 0) {
      score++;
      document.getElementById('score').textContent = score;
    }
  };
}

function guessGame() {
  const secret = Math.floor(Math.random() * 50) + 1;
  let tries = 0;

  box(`
    <h2>Guess the Number</h2>
    <p>1 se 50 ke beech number guess karo.</p>
    <input id="guessInput" type="number" placeholder="Your guess">
    <button class="bigbtn" id="guessBtn">Guess</button>
    <p id="guessMsg"></p>
  `);

  document.getElementById('guessBtn').onclick = () => {
    const n = Number(document.getElementById('guessInput').value);
    if (!n) return;

    tries++;

    const msg = document.getElementById('guessMsg');

    if (n === secret) {
      msg.textContent = `🎉 Correct! ${tries} tries mein jeet gaye.`;
    } else if (n < secret) {
      msg.textContent = '⬆️ Thoda bada number.';
    } else {
      msg.textContent = '⬇️ Thoda chhota number.';
    }
  };
}

function mathGame() {
  let score = 0;
  let a, b, answer;

  box(`
    <h2>Quick Math</h2>
    <h1 id="mathQuestion"></h1>
    <input id="mathInput" type="number" placeholder="Answer">
    <button class="bigbtn" id="mathBtn">Submit</button>
    <p>Score: <b id="mathScore">0</b></p>
    <p id="mathMsg"></p>
  `);

  function newQuestion() {
    a = Math.floor(Math.random() * 20) + 1;
    b = Math.floor(Math.random() * 20) + 1;
    answer = a + b;

    document.getElementById('mathQuestion').textContent = `${a} + ${b} = ?`;
    document.getElementById('mathInput').value = '';
  }

  document.getElementById('mathBtn').onclick = () => {
    const n = Number(document.getElementById('mathInput').value);

    if (n === answer) {
      score++;
      document.getElementById('mathScore').textContent = score;
      document.getElementById('mathMsg').textContent = '✅ Correct!';
    } else {
      document.getElementById('mathMsg').textContent = `❌ Answer ${answer} tha.`;
    }

    newQuestion();
  };

  newQuestion();
}

function rpsGame() {
  box(`
    <h2>Rock Paper Scissors</h2>
    <div class="choices">
      <button class="bigbtn" data-r="Rock">✊ Rock</button>
      <button class="bigbtn" data-r="Paper">✋ Paper</button>
      <button class="bigbtn" data-r="Scissors">✌️ Scissors</button>
    </div>
    <h3 id="rpsResult"></h3>
  `);

  document.querySelectorAll('[data-r]').forEach(btn => {
    btn.onclick = () => {
      const player = btn.dataset.r;
      const arr = ['Rock','Paper','Scissors'];
      const cpu = arr[Math.floor(Math.random() * 3)];

      let result = '';

      if (player === cpu) result = '🤝 Draw!';
      else if (
        (player === 'Rock' && cpu === 'Scissors') ||
        (player === 'Paper' && cpu === 'Rock') ||
        (player === 'Scissors' && cpu === 'Paper')
      ) result = '🎉 You Win!';
      else result = '😄 Computer Wins!';

      document.getElementById('rpsResult').textContent =
        `You: ${player} | Computer: ${cpu} → ${result}`;
    };
  });
}

function reactionGame() {
  box(`
    <h2>Reaction Test</h2>
    <p>Green hone ka wait karo.</p>
    <button class="bigbtn" id="reactionBtn">WAIT...</button>
    <h2 id="reactionResult"></h2>
  `);

  const btn = document.getElementById('reactionBtn');
  let ready = false;
  let start;

  const delay = Math.floor(Math.random() * 3000) + 2000;

  setTimeout(() => {
    ready = true;
    start = performance.now();
    btn.textContent = '🟢 TAP NOW!';
  }, delay);

  btn.onclick = () => {
    if (!ready) {
      document.getElementById('reactionResult').textContent =
        '❌ Too early! Page dobara open karke try karo.';
      return;
    }

    const ms = Math.round(performance.now() - start);

    document.getElementById('reactionResult').textContent =
      `⚡ Reaction time: ${ms} ms`;
  };
}

function memoryGame() {
  const nums = Array.from({length:5}, () => Math.floor(Math.random()*9)+1);

  box(`
    <h2>Memory Match</h2>
    <h1 id="memoryNums">${nums.join(' ')}</h1>
    <p>5 seconds mein yaad karo...</p>
    <button class="bigbtn" id="hideMemory">Hide</button>
    <input id="memoryInput" placeholder="Numbers likho">
    <button class="bigbtn" id="memoryCheck">Check</button>
    <p id="memoryResult"></p>
  `);

  document.getElementById('hideMemory').onclick = () => {
    document.getElementById('memoryNums').textContent = '❓ ❓ ❓ ❓ ❓';
  };

  document.getElementById('memoryCheck').onclick = () => {
    const val = document.getElementById('memoryInput').value.trim().replace(/\s+/g,' ');
    const correct = nums.join(' ');

    document.getElementById('memoryResult').textContent =
      val === correct ? '🎉 Perfect Memory!' : `❌ Correct: ${correct}`;
  };
}

function typingGame() {
  const words = ['javascript','gamepix','computer','instagram','football'];
  const word = words[Math.floor(Math.random()*words.length)];
  const start = performance.now();

  box(`
    <h2>Typing Sprint</h2>
    <h1>${word}</h1>
    <input id="typingInput" placeholder="Type here">
    <button class="bigbtn" id="typingBtn">Check</button>
    <p id="typingResult"></p>
  `);

  document.getElementById('typingBtn').onclick = () => {
    const value = document.getElementById('typingInput').value.trim();

    if (value.toLowerCase() === word) {
      const sec = ((performance.now()-start)/1000).toFixed(2);
      document.getElementById('typingResult').textContent =
        `⚡ Completed in ${sec} seconds!`;
    } else {
      document.getElementById('typingResult').textContent = '❌ Try again.';
    }
  };
}

function scrambleGame() {
  const words = ['planet','school','camera','mobile','garden','rocket'];
  const word = words[Math.floor(Math.random()*words.length)];
  const scrambled = word.split('').sort(() => Math.random()-.5).join('');

  box(`
    <h2>Word Scramble</h2>
    <h1>${scrambled}</h1>
    <input id="scrambleInput" placeholder="Correct word">
    <button class="bigbtn" id="scrambleBtn">Check</button>
    <p id="scrambleResult"></p>
  `);

  document.getElementById('scrambleBtn').onclick = () => {
    const v = document.getElementById('scrambleInput').value.toLowerCase();

    document.getElementById('scrambleResult').textContent =
      v === word ? '🎉 Correct!' : '❌ Wrong, try again.';
  };
}

function dodgeGame() {
  let score = 0;

  box(`
    <h2>Avoid Blocks</h2>
    <p>Red block se bacho aur blue player ko move karo.</p>
    <div id="dodgeBoard" class="gameboard">
      <div id="player"></div>
      <div id="enemy"></div>
    </div>
    <p>Score: <b id="dodgeScore">0</b></p>
    <button class="bigbtn" id="leftBtn">⬅️</button>
    <button class="bigbtn" id="rightBtn">➡️</button>
  `);

  const player = document.getElementById('player');
  const enemy = document.getElementById('enemy');

  let x = 50;
  let ex = 20;
  let ey = 0;

  function move(dir) {
    x += dir * 8;
    x = Math.max(5, Math.min(90,x));
    player.style.left = x + '%';
  }

  document.getElementById('leftBtn').onclick = () => move(-1);
  document.getElementById('rightBtn').onclick = () => move(1);

  document.addEventListener('keydown', function key(e) {
    if (!gameBox.contains(document.activeElement)) return;
    if (e.key === 'ArrowLeft') move(-1);
    if (e.key === 'ArrowRight') move(1);
  });

  const timer = setInterval(() => {
    ey += 4;

    if (ey > 100) {
      ey = 0;
      ex = Math.random()*85;
      score++;
      document.getElementById('dodgeScore').textContent = score;
    }

    enemy.style.left = ex + '%';
    enemy.style.top = ey + '%';

    if (ey > 82 && Math.abs(ex-x) < 10) {
      clearInterval(timer);
      enemy.textContent = '💥';
      alert(`Game Over! Score: ${score}`);
    }
  }, 100);
}

function targetGame() {
  let score = 0;
  let time = 15;

  box(`
    <h2>Target Tap</h2>
    <p>Moving target ko hit karo!</p>
    <div id="targetBoard" class="targetboard">
      <button id="target" class="target">🎯</button>
    </div>
    <p>Score: <b id="targetScore">0</b> | Time: <b id="targetTime">15</b></p>
  `);

  const target = document.getElementById('target');
  const board = document.getElementById('targetBoard');

  function moveTarget() {
    target.style.left = Math.random()*85 + '%';
    target.style.top = Math.random()*75 + '%';
  }

  target.onclick = () => {
    score++;
    document.getElementById('targetScore').textContent = score;
    moveTarget();
  };

  moveTarget();

  const timer = setInterval(() => {
    time--;
    document.getElementById('targetTime').textContent = time;

    if (time <= 0) {
      clearInterval(timer);
      target.disabled = true;
      target.textContent = '🏁';
    }
  },1000);
}

function sportsGame(name) {
  let score = 0;
  let attempts = 5;

  box(`
    <h2>${name}</h2>
    <p>Perfect timing par tap karo!</p>
    <div class="sportsTarget" id="sportsTarget">🏆</div>
    <button class="bigbtn" id="sportsBtn">SHOT!</button>
    <h3>Score: <span id="sportsScore">0</span></h3>
    <p>Attempts: <span id="attempts">5</span></p>
  `);

  document.getElementById('sportsBtn').onclick = () => {
    if (attempts <= 0) return;

    attempts--;

    const good = Math.random() > .35;

    if (good) score++;

    document.getElementById('sportsScore').textContent = score;
    document.getElementById('attempts').textContent = attempts;
  };
}

function quizGame() {
  const questions = [
    ['India ki capital kya hai?','Delhi'],
    ['2 + 2 kitna hota hai?','4'],
    ['Earth kis planet system mein hai?','Solar System'],
    ['HTML ka full form?','HyperText Markup Language']
  ];

  const q = questions[Math.floor(Math.random()*questions.length)];

  box(`
    <h2>Quick Quiz</h2>
    <h3>${q[0]}</h3>
    <input id="quizInput" placeholder="Answer">
    <button class="bigbtn" id="quizBtn">Check</button>
    <p id="quizResult"></p>
  `);

  document.getElementById('quizBtn').onclick = () => {
    const v = document.getElementById('quizInput').value.trim().toLowerCase();

    document.getElementById('quizResult').textContent =
      v === q[1].toLowerCase() ? '🎉 Correct!' : `❌ Correct answer: ${q[1]}`;
  };
}

function sequenceGame() {
  const seq = Array.from({length:4}, () => Math.floor(Math.random()*9)+1);

  box(`
    <h2>Pattern Lock</h2>
    <h1>${seq.join(' - ')}</h1>
    <p>Pattern yaad karo.</p>
    <input id="seqInput" placeholder="Example: 1234">
    <button class="bigbtn" id="seqBtn">Unlock</button>
    <p id="seqResult"></p>
  `);

  document.getElementById('seqBtn').onclick = () => {
    const v = document.getElementById('seqInput').value.replace(/\D/g,'');

    document.getElementById('seqResult').textContent =
      v === seq.join('') ? '🔓 Safe Unlocked!' : '🔒 Wrong Pattern!';
  };
}

function mazeGame() {
  box(`
    <h2>Maze Escape</h2>
    <p>Start se Finish tak pahucho.</p>
    <div class="maze">
      <div id="mazePlayer">🟢</div>
      <div>⬛⬛⬛⬛⬛</div>
      <div>🟩⬜⬜⬜⬛</div>
      <div>⬛⬛⬜⬜⬛</div>
      <div>⬛⬜⬜⬜🏁</div>
    </div>
    <p>Keyboard Arrow Keys use karo.</p>
  `);
}

function lightsGame() {
  const total = 9;

  box(`
    <h2>Lights Out</h2>
    <p>Sab lights ko OFF karo.</p>
    <div id="lightsGrid" class="lightsgrid"></div>
    <button class="bigbtn" id="lightsReset">Reset</button>
  `);

  const grid = document.getElementById('lightsGrid');
  let lights = Array(total).fill(true);

  function render() {
    grid.innerHTML = '';

    lights.forEach((on,i) => {
      const b = document.createElement('button');
      b.textContent = on ? '💡' : '⚫';

      b.onclick = () => {
        const row = Math.floor(i/3);
        const col = i%3;

        const indexes = [i];

        if (row>0) indexes.push(i-3);
        if (row<2) indexes.push(i+3);
        if (col>0) indexes.push(i-1);
        if (col<2) indexes.push(i+1);

        indexes.forEach(x => lights[x] = !lights[x]);

        render();

        if (lights.every(x => !x)) {
          setTimeout(() => alert('🎉 You Win!'),100);
        }
      };

      grid.appendChild(b);
    });
  }

  document.getElementById('lightsReset').onclick = () => {
    lights = Array(total).fill(true);
    render();
  };

  render();
}

function tttGame() {
  let board = Array(9).fill('');

  box(`
    <h2>Tic Tac Toe</h2>
    <div id="tttBoard" class="ttt"></div>
    <p id="tttResult"></p>
  `);

  const grid = document.getElementById('tttBoard');

  function winner() {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c])
        return board[a];
    }

    return board.every(Boolean) ? 'draw' : null;
  }

  function render() {
    grid.innerHTML = '';

    board.forEach((v,i) => {
      const b = document.createElement('button');
      b.textContent = v;
      b.onclick = () => {
        if (board[i]) return;

        board[i] = 'X';

        let w = winner();

        if (!w) {
          const empty = board.map((x,j)=>x ? null:j).filter(x=>x!==null);

          if (empty.length) {
            const cpu = empty[Math.floor(Math.random()*empty.length)];
          ;
    });
  }

  render();
}

/* ================= PHOTO FILTERS ================= */
  board[cpu] = 'O';
          }

          w = winner();
        }

        render();

        if (w) {
          document.getElementById('tttResult').textContent =
            w === 'draw' ? '🤝 Draw!' : `🏆 ${w} Wins!`;
        }
      };

      grid.appendChild(b)
const FILTERS=[
['Original','none'],
['Vivid','saturate(1.45) contrast(1.08)'],
['Bright','brightness(1.18)'],
['Soft','brightness(1.06) saturate(.9)'],
['Warm','sepia(.12) saturate(1.15)'],
['Cool','hue-rotate(12deg) saturate(.95)'],
['Golden','sepia(.2) saturate(1.3)'],
['Cinema','contrast(1.18) saturate(1.1)'],
['Noir','grayscale(1) contrast(1.25)'],
['B&W Soft','grayscale(1) contrast(.92)'],
['B&W Deep','grayscale(1) contrast(1.45)'],
['Vintage','sepia(.35) contrast(.95)'],
['Retro','sepia(.2) saturate(1.35) contrast(1.05)'],
['Faded','contrast(.85) brightness(1.08) saturate(.8)'],
['Matte','contrast(.88) saturate(.82)'],
['Crisp','contrast(1.25) saturate(1.12)'],
['Punch','contrast(1.3) saturate(1.3)'],
['Pastel','saturate(.7) brightness(1.12)'],
['Rose','sepia(.08) hue-rotate(325deg) saturate(1.15)'],
['Lavender','hue-rotate(285deg) saturate(.9)'],
['Aqua','hue-rotate(155deg) saturate(1.15)'],
['Teal','hue-rotate(145deg) saturate(1.2)'],
['Forest','hue-rotate(75deg) saturate(1.1)'],
['Sunset','sepia(.16) hue-rotate(340deg) saturate(1.3)'],
['Dusk','brightness(.88) saturate(.9)'],
['Night','brightness(.7) contrast(1.1) saturate(.85)'],
['Cloudy','brightness(1.03) contrast(.9) saturate(.75)'],
['Clean','contrast(1.08) saturate(.95)'],
['Clear','contrast(1.16) brightness(1.04)'],
['Glow','brightness(1.13) saturate(1.08)'],
['Dream','brightness(1.08) saturate(.8) contrast(.92)'],
['Lofi','contrast(1.08) saturate(.72) sepia(.08)'],
['Urban','contrast(1.2) saturate(.9)'],
['Street','contrast(1.28) saturate(1.05)'],
['Travel','saturate(1.22) contrast(1.04)'],
['Food','saturate(1.4) contrast(1.08)'],
['Natural','saturate(.95) contrast(1.02)'],
['Neutral','saturate(.9)'],
['Light','brightness(1.25)'],
['Dark','brightness(.78)'],
['High Contrast','contrast(1.45)'],
['Low Contrast','contrast(.72)'],
['Deep Color','saturate(1.5) contrast(1.1)'],
['Muted Color','saturate(.58)'],
['Sepia Light','sepia(.3) brightness(1.04)'],
['Sepia Strong','sepia(.7)'],
['Blue Hour','hue-rotate(205deg) saturate(.85) brightness(.9)'],
['Mint','hue-rotate(105deg) saturate(.8) brightness(1.06)'],
['Coral','hue-rotate(335deg) saturate(1.25)'],
['Indie','contrast(1.12) saturate(.85) sepia(.1)'],
['Film','contrast(1.14) saturate(.9) sepia(.12)'],
['Polaroid','brightness(1.1) contrast(.92) saturate(.92)'],
['Chrome','grayscale(.25) contrast(1.25) saturate(.85)'],
['Arctic','hue-rotate(190deg) saturate(.75) brightness(1.08)'],
['Ember','sepia(.18) hue-rotate(345deg) saturate(1.35)'],
['Cocoa','sepia(.38) saturate(.85) contrast(1.05)'],
['Mellow','brightness(1.04) contrast(.9) saturate(.8)'],
['Sharp Mono','grayscale(1) contrast(1.55)'],
['Silver','grayscale(.65) contrast(1.12)'],
['Fresh','saturate(1.18) brightness(1.06)'],
['Moody','brightness(.86) contrast(1.16) saturate(.82)'],
['Luminous','brightness(1.2) contrast(1.08) saturate(1.05)']
];

const photo=document.getElementById('photo');
const preview=document.getElementById('preview');
const controls=document.getElementById('editControls');
const fg=document.getElementById('filterGrid');

let current='none';
let photoURL='';

function makeFilters(){
  fg.innerHTML='';

  FILTERS.forEach(([name,fx])=>{
    const button=document.createElement('button');
    button.className='filter'+(name==='Original'?' active':'');
    
    const img=document.createElement('img');
    img.className='filter-preview';
    img.alt=name;

    const label=document.createElement('span');
    label.className='filter-name';
    label.textContent=name;

    button.appendChild(img);
    button.appendChild(label);

    button.onclick=()=>{
      current=fx;

      document.querySelectorAll('.filter').forEach(x=>{
        x.classList.remove('active');
      });

      button.classList.add('active');

      applyPhoto();
    };

    fg.appendChild(button);
  });
}

makeFilters();

photo.onchange=e=>{
  const file=e.target.files[0];
  if(!file)return;

  photoURL=URL.createObjectURL(file);

  preview.src=photoURL;
  preview.style.display='block';
  controls.classList.remove('hide');

  document.querySelectorAll('.filter-preview').forEach((img,i)=>{
    img.src=photoURL;
    img.style.filter=FILTERS[i][1];
  });

  current='none';

  document.querySelectorAll('.filter').forEach(x=>{
    x.classList.remove('active');
  });

  document.querySelector('.filter').classList.add('active');

  applyPhoto();
};

function applyPhoto(){
  if(!preview.src)return;

  const b=document.getElementById('brightness').value;
  const c=document.getElementById('contrast').value;
  const s=document.getElementById('saturation').value;

  preview.style.filter=
    `${current} brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
}

['brightness','contrast','saturation'].forEach(id=>{
  document.getElementById(id).oninput=applyPhoto;
});

document.getElementById('resetPhoto').onclick=()=>{
  current='none';

  document.getElementById('brightness').value=100;
  document.getElementById('contrast').value=100;
  document.getElementById('saturation').value=100;

  document.querySelectorAll('.filter').forEach(x=>{
    x.classList.remove('active');
  });

  document.querySelector('.filter').classList.add('active');

  applyPhoto();
};

document.getElementById('downloadPhoto').onclick=()=>{
  if(!photo.files[0])return;

  const img=new Image();

  img.onload=()=>{
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d');

    canvas.width=img.naturalWidth;
    canvas.height=img.naturalHeight;

    ctx.filter=
      `${current} brightness(${brightness.value}%) contrast(${contrast.value}%) saturate(${saturation.value}%)`;

    ctx.drawImage(img,0,0);

    const a=document.createElement('a');
    a.download='gamepix-ai-edited.jpg';
    a.href=canvas.toDataURL('image/jpeg',.92);
    a.click();
  };

  img.src=photoURL;
};
