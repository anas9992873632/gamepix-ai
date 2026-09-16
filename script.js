/* =========================================================
   GAMEPIX AI - MAIN JAVASCRIPT
   Games + Search + Categories + Photo Editor
   ========================================================= */

"use strict";

/* =========================
   GAME DATA
========================= */

const GAMES = [
  {
    id:"neon-racer",
    name:"Neon Racer",
    category:"racing",
    icon:"🏎️",
    color:"linear-gradient(135deg,#00c6ff,#0072ff)",
    description:"Avoid traffic and survive as long as possible.",
    type:"racer"
  },
  {
    id:"space-shooter",
    name:"Space Shooter",
    category:"action",
    icon:"🚀",
    color:"linear-gradient(135deg,#7b2ff7,#f107a3)",
    description:"Destroy incoming enemies and survive.",
    type:"shooter"
  },
  {
    id:"snake",
    name:"Snake Classic",
    category:"arcade",
    icon:"🐍",
    color:"linear-gradient(135deg,#11998e,#38ef7d)",
    description:"Eat food and grow your snake.",
    type:"snake"
  },
  {
    id:"pong",
    name:"Pong Duel",
    category:"sports",
    icon:"🏓",
    color:"linear-gradient(135deg,#141e30,#243b55)",
    description:"Beat the computer in classic pong.",
    type:"pong"
  },
  {
    id:"memory",
    name:"Memory Cards",
    category:"brain",
    icon:"🧠",
    color:"linear-gradient(135deg,#fc466b,#3f5efb)",
    description:"Match all the hidden pairs.",
    type:"memory"
  },
  {
    id:"tic-tac-toe",
    name:"Tic Tac Toe",
    category:"puzzle",
    icon:"⭕",
    color:"linear-gradient(135deg,#ee0979,#ff6a00)",
    description:"Beat the computer in Tic Tac Toe.",
    type:"ttt"
  },
  {
    id:"2048",
    name:"2048",
    category:"puzzle",
    icon:"🔢",
    color:"linear-gradient(135deg,#f7971e,#ffd200)",
    description:"Combine numbers to reach 2048.",
    type:"2048"
  },
  {
    id:"breakout",
    name:"Brick Breaker",
    category:"arcade",
    icon:"🧱",
    color:"linear-gradient(135deg,#4568dc,#b06ab3)",
    description:"Break every brick with the ball.",
    type:"breakout"
  },
  {
    id:"reaction",
    name:"Reaction Test",
    category:"skill",
    icon:"⚡",
    color:"linear-gradient(135deg,#f12711,#f5af19)",
    description:"Test your reaction speed.",
    type:"reaction"
  },
  {
    id:"whack",
    name:"Whack A Mole",
    category:"arcade",
    icon:"🔨",
    color:"linear-gradient(135deg,#56ab2f,#a8e063)",
    description:"Hit the mole before it disappears.",
    type:"whack"
  },
  {
    id:"click-speed",
    name:"Click Speed",
    category:"skill",
    icon:"👆",
    color:"linear-gradient(135deg,#2193b0,#6dd5ed)",
    description:"How many clicks can you make?",
    type:"click"
  },
  {
    id:"target",
    name:"Target Master",
    category:"skill",
    icon:"🎯",
    color:"linear-gradient(135deg,#cb2d3e,#ef473a)",
    description:"Hit targets before time runs out.",
    type:"target"
  },
  {
    id:"flappy",
    name:"Flappy Bird",
    category:"arcade",
    icon:"🐦",
    color:"linear-gradient(135deg,#56ccf2,#2f80ed)",
    description:"Fly through the pipes.",
    type:"flappy"
  },
  {
    id:"dodge",
    name:"Dodge Blocks",
    category:"skill",
    icon:"💥",
    color:"linear-gradient(135deg,#000428,#004e92)",
    description:"Move and dodge falling blocks.",
    type:"dodge"
  },
  {
    id:"minesweeper",
    name:"Minesweeper",
    category:"brain",
    icon:"💣",
    color:"linear-gradient(135deg,#485563,#29323c)",
    description:"Clear the board without hitting mines.",
    type:"mines"
  },
  {
    id:"hangman",
    name:"Hangman",
    category:"brain",
    icon:"🔤",
    color:"linear-gradient(135deg,#614385,#516395)",
    description:"Guess the hidden word.",
    type:"hangman"
  },
  {
    id:"simon",
    name:"Simon Says",
    category:"brain",
    icon:"🔴",
    color:"linear-gradient(135deg,#8e2de2,#4a00e0)",
    description:"Remember the colour sequence.",
    type:"simon"
  },
  {
    id:"connect4",
    name:"Connect Four",
    category:"puzzle",
    icon:"🔴",
    color:"linear-gradient(135deg,#1d2b64,#f8cdda)",
    description:"Connect four pieces to win.",
    type:"connect"
  },
  {
    id:"typing",
    name:"Typing Race",
    category:"skill",
    icon:"⌨️",
    color:"linear-gradient(135deg,#00b09b,#96c93d)",
    description:"Type words as fast as possible.",
    type:"typing"
  },
  {
    id:"color-match",
    name:"Color Match",
    category:"puzzle",
    icon:"🎨",
    color:"linear-gradient(135deg,#ff512f,#dd2476)",
    description:"Find the different colour.",
    type:"color"
  },
  {
    id:"number-memory",
    name:"Number Memory",
    category:"brain",
    icon:"🔢",
    color:"linear-gradient(135deg,#396afc,#2948ff)",
    description:"Remember the number sequence.",
    type:"number"
  },
  {
    id:"goalkeeper",
    name:"Goalkeeper",
    category:"sports",
    icon:"🥅",
    color:"linear-gradient(135deg,#11998e,#38ef7d)",
    description:"Save penalty kicks.",
    type:"goalkeeper"
  },
  {
    id:"penalty",
    name:"Penalty Shoot",
    category:"sports",
    icon:"⚽",
    color:"linear-gradient(135deg,#134e5e,#71b280)",
    description:"Score as many goals as possible.",
    type:"penalty"
  },
  {
    id:"basket",
    name:"Basket Shot",
    category:"sports",
    icon:"🏀",
    color:"linear-gradient(135deg,#f12711,#f5af19)",
    description:"Time your basketball shots.",
    type:"basket"
  },
  {
    id:"jump",
    name:"Jump Runner",
    category:"arcade",
    icon:"🏃",
    color:"linear-gradient(135deg,#00f260,#0575e6)",
    description:"Jump over obstacles.",
    type:"runner"
  },
  {
    id:"coin",
    name:"Coin Collector",
    category:"arcade",
    icon:"🪙",
    color:"linear-gradient(135deg,#f7971e,#ffd200)",
    description:"Collect falling coins.",
    type:"coin"
  },
  {
    id:"tower",
    name:"Tower Stack",
    category:"skill",
    icon:"🏗️",
    color:"linear-gradient(135deg,#fc4a1a,#f7b733)",
    description:"Build the tallest tower.",
    type:"tower"
  },
  {
    id:"reaction-color",
    name:"Color Reaction",
    category:"skill",
    icon:"🌈",
    color:"linear-gradient(135deg,#8e2de2,#4a00e0)",
    description:"Tap the correct colour quickly.",
    type:"colorReaction"
  },
  {
    id:"higher-lower",
    name:"Higher Or Lower",
    category:"brain",
    icon:"🃏",
    color:"linear-gradient(135deg,#1e3c72,#2a5298)",
    description:"Guess whether the next card is higher or lower.",
    type:"higher"
  },
  {
    id:"word-scramble",
    name:"Word Scramble",
    category:"brain",
    icon:"🔠",
    color:"linear-gradient(135deg,#5f2c82,#49a09d)",
    description:"Unscramble the word.",
    type:"scramble"
  },
  {
    id:"math",
    name:"Math Challenge",
    category:"brain",
    icon:"➗",
    color:"linear-gradient(135deg,#42275a,#734b6d)",
    description:"Solve maths problems against the clock.",
    type:"math"
  },
  {
    id:"quiz",
    name:"Quick Quiz",
    category:"brain",
    icon:"❓",
    color:"linear-gradient(135deg,#0575e6,#021b79)",
    description:"Answer questions correctly.",
    type:"quiz"
  },
  {
    id:"dots",
    name:"Connect Dots",
    category:"puzzle",
    icon:"🔵",
    color:"linear-gradient(135deg,#396afc,#2948ff)",
    description:"Connect matching dots.",
    type:"dots"
  },
  {
    id:"maze",
    name:"Maze Escape",
    category:"puzzle",
    icon:"🌀",
    color:"linear-gradient(135deg,#232526,#414345)",
    description:"Find your way out of the maze.",
    type:"maze"
  },
  {
    id:"lights",
    name:"Lights Out",
    category:"puzzle",
    icon:"💡",
    color:"linear-gradient(135deg,#141e30,#243b55)",
    description:"Turn all lights off.",
    type:"lights"
  },
  {
    id:"match3",
    name:"Match 3",
    category:"puzzle",
    icon:"💎",
    color:"linear-gradient(135deg,#ec008c,#fc6767)",
    description:"Match three or more objects.",
    type:"match3"
  },
  {
    id:"memory-number",
    name:"Pattern Memory",
    category:"brain",
    icon:"🧩",
    color:"linear-gradient(135deg,#667eea,#764ba2)",
    description:"Remember the pattern.",
    type:"pattern"
  },
  {
    id:"four-corners",
    name:"Four Corners",
    category:"skill",
    icon:"◼️",
    color:"linear-gradient(135deg,#4568dc,#b06ab3)",
    description:"Choose the safe corner.",
    type:"corners"
  },
  {
    id:"tap-order",
    name:"Tap In Order",
    category:"skill",
    icon:"🔢",
    color:"linear-gradient(135deg,#00c6ff,#0072ff)",
    description:"Tap numbers in order.",
    type:"order"
  },
  {
    id:"avoid-red",
    name:"Avoid Red",
    category:"skill",
    icon:"🔴",
    color:"linear-gradient(135deg,#cb2d3e,#ef473a)",
    description:"Touch everything except red.",
    type:"avoid"
  },
  {
    id:"balloon",
    name:"Balloon Pop",
    category:"arcade",
    icon:"🎈",
    color:"linear-gradient(135deg,#f953c6,#b91d73)",
    description:"Pop balloons before they escape.",
    type:"balloon"
  },
  {
    id:"fruit",
    name:"Fruit Catcher",
    category:"arcade",
    icon:"🍎",
    color:"linear-gradient(135deg,#56ab2f,#a8e063)",
    description:"Catch falling fruits.",
    type:"fruit"
  },
  {
    id:"fishing",
    name:"Fishing Time",
    category:"skill",
    icon:"🎣",
    color:"linear-gradient(135deg,#00c6ff,#0072ff)",
    description:"Catch fish at the right time.",
    type:"fishing"
  },
  {
    id:"parking",
    name:"Parking Master",
    category:"racing",
    icon:"🚗",
    color:"linear-gradient(135deg,#232526,#414345)",
    description:"Park the car without crashing.",
    type:"parking"
  },
  {
    id:"bike",
    name:"Bike Balance",
    category:"racing",
    icon:"🏍️",
    color:"linear-gradient(135deg,#141e30,#243b55)",
    description:"Keep your bike balanced.",
    type:"bike"
  },
  {
    id:"drift",
    name:"Drift King",
    category:"racing",
    icon:"🏁",
    color:"linear-gradient(135deg,#f12711,#f5af19)",
    description:"Drift around corners.",
    type:"drift"
  },
  {
    id:"pool",
    name:"Mini Pool",
    category:"sports",
    icon:"🎱",
    color:"linear-gradient(135deg,#134e5e,#71b280)",
    description:"Aim and pocket the balls.",
    type:"pool"
  },
  {
    id:"bowling",
    name:"Bowling",
    category:"sports",
    icon:"🎳",
    color:"linear-gradient(135deg,#373b44,#4286f4)",
    description:"Knock down all pins.",
    type:"bowling"
  },
  {
    id:"golf",
    name:"Mini Golf",
    category:"sports",
    icon:"⛳",
    color:"linear-gradient(135deg,#11998e,#38ef7d)",
    description:"Put the ball in the hole.",
    type:"golf"
  },
  {
    id:"boxing",
    name:"Boxing Timer",
    category:"action",
    icon:"🥊",
    color:"linear-gradient(135deg,#870000,#190a05)",
    description:"React to punches.",
    type:"boxing"
  },
  {
    id:"zombie",
    name:"Zombie Defense",
    category:"action",
    icon:"🧟",
    color:"linear-gradient(135deg,#283c86,#45a247)",
    description:"Defend yourself from zombies.",
    type:"zombie"
  },
  {
    id:"tank",
    name:"Tank Battle",
    category:"action",
    icon:"🛡️",
    color:"linear-gradient(135deg,#485563,#29323c)",
    description:"Aim your tank and fire.",
    type:"tank"
  },
  {
    id:"laser",
    name:"Laser Dodge",
    category:"action",
    icon:"🔫",
    color:"linear-gradient(135deg,#ff512f,#dd2476)",
    description:"Dodge moving lasers.",
    type:"laser"
  },
  {
    id:"castle",
    name:"Castle Defense",
    category:"action",
    icon:"🏰",
    color:"linear-gradient(135deg,#1f1c2c,#928dab)",
    description:"Protect your castle.",
    type:"castle"
  },
  {
    id:"space-dodge",
    name:"Space Dodge",
    category:"action",
    icon:"🌌",
    color:"linear-gradient(135deg,#000000,#434343)",
    description:"Dodge asteroids in space.",
    type:"space"
  },
  {
    id:"word-guess",
    name:"Word Guess",
    category:"brain",
    icon:"📝",
    color:"linear-gradient(135deg,#355c7d,#6c5b7b)",
    description:"Find the secret word.",
    type:"word"
  },
  {
    id:"find-different",
    name:"Find Different",
    category:"puzzle",
    icon:"🔍",
    color:"linear-gradient(135deg,#8360c3,#2ebf91)",
    description:"Find the different tile.",
    type:"different"
  },
  {
    id:"sequence",
    name:"Sequence Master",
    category:"brain",
    icon:"🔢",
    color:"linear-gradient(135deg,#4776e6,#8e54e9)",
    description:"Complete the sequence.",
    type:"sequence"
  },
  {
    id:"quick-tap",
    name:"Quick Tap",
    category:"skill",
    icon:"⚡",
    color:"linear-gradient(135deg,#fc4a1a,#f7b733)",
    description:"Tap the moving target.",
    type:"quicktap"
  }
];

/* =========================
   STATE
========================= */

let currentGame = null;
let currentCleanup = null;
let selectedCategory = "all";
let favourites = JSON.parse(localStorage.getItem("gamepix-favourites") || "[]");

/* =========================
   DOM
========================= */

const $ = id => document.getElementById(id);

const homePage = $("homePage");
const gamePage = $("gamePage");
const editorPage = $("editorPage");
const gamesGrid = $("gamesGrid");
const trendingGames = $("trendingGames");
const searchInput = $("searchInput");

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {

  renderGames();
  renderTrending();
  setupCategories();
  setupSearch();
  setupEditor();
  setupNavigation();

  $("heroPlay").onclick = () => openGame("neon-racer");

  $("restartBtn").onclick = () => {
    if (currentGame) openGame(currentGame.id);
  };

  $("pauseBtn").onclick = () => {
    if (window.gamePausedToggle) {
      window.gamePausedToggle();
    }
  };

  $("fullBtn").onclick = fullscreenGame;
  $("fullscreenBtn").onclick = fullscreenGame;

});

/* =========================
   GAME CARD
========================= */

function gameCard(game) {

  const fav = favourites.includes(game.id);

  return `
    <article class="game-card" data-id="${game.id}">
      <button class="fav-card ${fav ? "liked" : ""}"
        onclick="event.stopPropagation();toggleFavourite('${game.id}')">
        ${fav ? "♥" : "♡"}
      </button>

      <div class="game-thumb" style="background:${game.color}">
        <div class="thumb-glow"></div>
        <div class="thumb-icon">${game.icon}</div>
        <span class="play-overlay">▶</span>
      </div>

      <div class="game-info">
        <h3>${escapeHTML(game.name)}</h3>
        <div class="game-meta">
          <span>${categoryName(game.category)}</span>
          <span>★ 4.${Math.floor(Math.random()*4)+6}</span>
        </div>
      </div>
    </article>
  `;
}

function renderGames() {

  const query = (searchInput?.value || "").toLowerCase().trim();

  let list = GAMES.filter(game => {

    const categoryOK =
      selectedCategory === "all" ||
      game.category === selectedCategory;

    const searchOK =
      !query ||
      game.name.toLowerCase().includes(query) ||
      game.category.toLowerCase().includes(query);

    return categoryOK && searchOK;
  });

  $("gameCount").textContent = `${list.length} games`;

  gamesGrid.innerHTML =
    list.map(gameCard).join("");

  document.querySelectorAll(".game-card").forEach(card => {

    card.onclick = () => {
      openGame(card.dataset.id);
    };

  });
}

function renderTrending() {

  const list = GAMES.slice(0, 12);

  trendingGames.innerHTML =
    list.map(game => `
      <div class="mini-card" data-id="${game.id}">
        <div class="mini-thumb" style="background:${game.color}">
          <span>${game.icon}</span>
        </div>
        <strong>${escapeHTML(game.name)}</strong>
        <small>★ 4.8</small>
      </div>
    `).join("");

  document.querySelectorAll(".mini-card").forEach(card => {
    card.onclick = () => openGame(card.dataset.id);
  });
}

/* =========================
   CATEGORY
========================= */

function setupCategories() {

  document.querySelectorAll(".cat").forEach(button => {

    button.addEventListener("click", () => {

      document.querySelectorAll(".cat")
        .forEach(x => x.classList.remove("active"));

      button.classList.add("active");

      selectedCategory = button.dataset.cat;

      renderGames();

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

    });

  });

}

function setCategory(category) {

  selectedCategory = category;

  document.querySelectorAll(".cat").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.cat === category
    );
  });

  renderGames();
}

function categoryName(cat) {

  const names = {
    arcade:"Arcade",
    racing:"Racing",
    sports:"Sports",
    puzzle:"Puzzle",
    skill:"Skill",
    action:"Action",
    brain:"Brain"
  };

  return names[cat] || cat;
}

/* =========================
   SEARCH
========================= */

function setupSearch() {

  searchInput.addEventListener("input", () => {
    renderGames();
  });

}

/* =========================
   NAVIGATION
========================= */

function setupNavigation() {

  $("editorBtn").onclick = showEditor;

  $("favBtn").onclick = () => {

    const old = selectedCategory;

    const favGames = GAMES.filter(g =>
      favourites.includes(g.id)
    );

    if (!favGames.length) {
      toast("No favourite games yet ❤️");
      return;
    }

    homePage.classList.remove("hidden");
    gamePage.classList.add("hidden");
    editorPage.classList.add("hidden");

    selectedCategory = "__favourites__";

    const query = searchInput.value.toLowerCase();

    const list = favGames.filter(g =>
      !query || g.name.toLowerCase().includes(query)
    );

    $("gameCount").textContent =
      `${list.length} favourites`;

    gamesGrid.innerHTML =
      list.map(gameCard).join("");

    document.querySelectorAll(".game-card").forEach(card => {
      card.onclick = () => openGame(card.dataset.id);
    });

  };

  $("menuBtn").onclick = () => {

    document.querySelector(".category-bar")
      .classList.toggle("menu-open");

  };

}

function showHome() {

  cleanupGame();

  homePage.classList.remove("hidden");
  gamePage.classList.add("hidden");
  editorPage.classList.add("hidden");

  selectedCategory = "all";

  document.querySelectorAll(".cat")
    .forEach(x => x.classList.toggle(
      "active",
      x.dataset.cat === "all"
    ));

  renderGames();

  window.scrollTo(0,0);
}

function showEditor() {

  cleanupGame();

  homePage.classList.add("hidden");
  gamePage.classList.add("hidden");
  editorPage.classList.remove("hidden");

  window.scrollTo(0,0);
}

/* =========================
   OPEN GAME
========================= */

function openGame(id) {

  const game = GAMES.find(g => g.id === id);

  if (!game) return;

  cleanupGame();

  currentGame = game;

  homePage.classList.add("hidden");
  editorPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  $("gameTitle").textContent = game.name;
  $("gameCategory").textContent =
    categoryName(game.category);

  const stage = $("gameStage");

  stage.innerHTML = `
    <div class="loading-game">
      <div>🎮</div>
      <p>Loading ${escapeHTML(game.name)}...</p>
    </div>
  `;

  setTimeout(() => {

    stage.innerHTML = "";

    const fn = GAME_BUILDERS[game.type];

    if (fn) {
      currentCleanup = fn(stage);
    } else {
      currentCleanup =
        simpleGame(stage, game);
    }

  }, 100);

  window.scrollTo({
    top:0,
    behavior:"smooth"
  });
}

function cleanupGame() {

  if (typeof currentCleanup === "function") {

    try {
      currentCleanup();
    } catch(e) {}

  }

  currentCleanup = null;
  window.gamePausedToggle = null;
}

/* =========================
   FULLSCREEN
========================= */

function fullscreenGame() {

  const stage = $("gameStage");

  if (!document.fullscreenElement) {

    if (stage.requestFullscreen) {
      stage.requestFullscreen();
    }

  } else {

    document.exitFullscreen();

  }
}

/* =========================================================
   GAME BUILDERS
========================================================= */

const GAME_BUILDERS = {

  racer: buildRacer,
  shooter: buildShooter,
  snake: buildSnake,
  pong: buildPong,
  memory: buildMemory,
  ttt: buildTicTacToe,
  "2048": build2048,
  breakout: buildBreakout,
  reaction: buildReaction,
  whack: buildWhack,
  click: buildClick,
  target: buildTarget,
  flappy: buildFlappy,
  dodge: buildDodge,
  mines: buildMines,
  hangman: buildHangman,
  simon: buildSimon,
  connect: buildConnect,
  typing: buildTyping,
  color: buildColorMatch,
  number: buildNumberMemory,
  goalkeeper: buildGoalkeeper,
  penalty: buildPenalty,
  basket: buildBasket,
  runner: buildRunner,
  coin: buildCoin,
  tower: buildTower,
  colorReaction: buildColorReaction,
  higher: buildHigher,
  scramble: buildScramble,
  math: buildMath,
  quiz: buildQuiz,
  dots: buildDots,
  maze: buildMaze,
  lights: buildLights,
  match3: buildMatch3,
  pattern: buildPattern,
  corners: buildCorners,
  order: buildOrder,
  avoid: buildAvoid,
  balloon: buildBalloon,
  fruit: buildFruit,
  fishing: buildFishing,
  parking: buildParking,
  bike: buildBike,
  drift: buildDrift,
  pool: buildPool,
  bowling: buildBowling,
  golf: buildGolf,
  boxing: buildBoxing,
  zombie: buildZombie,
  tank: buildTank,
  laser: buildLaser,
  castle: buildCastle,
  space: buildSpace,
  word: buildWord,
  different: buildDifferent,
  sequence: buildSequence,
  quicktap: buildQuickTap
};

/* =========================
   GENERIC HELPERS
========================= */

function gameShell(title, subtitle="") {

  return `
    <div class="game-ui">
      <div class="game-top">
        <div>
          <h2>${escapeHTML(title)}</h2>
          <small>${escapeHTML(subtitle)}</small>
        </div>
        <div id="gameScore" class="score-box">Score: 0</div>
      </div>
      <div id="gameBoard" class="game-board"></div>
      <div id="gameMessage" class="game-message"></div>
    </div>
  `;
}

function escapeHTML(str) {

  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function score(value) {

  const el = $("gameScore");

  if (el) {
    el.textContent = `Score: ${value}`;
  }
}

function message(text) {

  const el = $("gameMessage");

  if (el) {
    el.textContent = text;
  }
}

function button(text, cls="game-btn") {

  return `<button class="${cls}">${escapeHTML(text)}</button>`;
}

/* =========================
   CLICK GAME
========================= */

function buildClick(stage) {

  stage.innerHTML = gameShell(
    "Click Speed",
    "Click as many times as possible in 10 seconds"
  );

  const board = $("gameBoard");

  let count = 0;
  let time = 10;
  let started = false;
  let timer = null;

  board.innerHTML = `
    <div class="big-game-number" id="clickTime">10</div>
    <button id="clickButton" class="giant-game-button">
      CLICK!
    </button>
  `;

  const btn = $("clickButton");
  const timeEl = $("clickTime");

  function finish() {

    clearInterval(timer);
    btn.disabled = true;

    message(`Time up! You made ${count} clicks.`);

  }

  btn.onclick = () => {

    if (!started) {

      started = true;

      timer = setInterval(() => {

        time--;

        timeEl.textContent = time;

        if (time <= 0) {
          finish();
        }

      },1000);

    }

    if (time > 0) {

      count++;

      score(count);

      btn.style.transform =
        `scale(${1 + Math.random()*0.05})`;

    }

  };

  return () => clearInterval(timer);
}

/* =========================
   REACTION
========================= */

function buildReaction(stage) {

  stage.innerHTML = gameShell(
    "Reaction Test",
    "Wait for green, then click"
  );

  const board = $("gameBoard");

  board.innerHTML = `
    <button id="reactionBtn" class="reaction-area">
      WAIT...
    </button>
  `;

  const btn = $("reactionBtn");

  let timeout = null;
  let start = 0;
  let ready = false;
  let finished = false;

  const delay =
    1500 + Math.random()*3500;

  timeout = setTimeout(() => {

    ready = true;
    start = performance.now();
    btn.textContent = "CLICK!";
    btn.classList.add("ready");

  },delay);

  btn.onclick = () => {

    if (finished) return;

    if (!ready) {

      clearTimeout(timeout);

      finished = true;

      btn.textContent = "Too early!";

      message("Wait for green next time.");

      return;
    }

    finished = true;

    const ms =
      Math.round(performance.now() - start);

    score(ms);

    btn.textContent = `${ms} ms`;

    message(
      ms < 250
        ? "Amazing reaction!"
        : "Good try!"
    );

  };

  return () => clearTimeout(timeout);
}

/* =========================
   TIC TAC TOE
========================= */

function buildTicTacToe(stage) {

  stage.innerHTML = gameShell(
    "Tic Tac Toe",
    "You are X"
  );

  const boardEl = $("gameBoard");

  boardEl.innerHTML = `
    <div class="ttt-board" id="tttBoard"></div>
  `;

  const grid = $("tttBoard");

  let board = Array(9).fill("");
  let over = false;

  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  function winner() {

    for (const [a,b,c] of lines) {

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }

    }

    if (board.every(Boolean)) {
      return "draw";
    }

    return null;
  }

  function render() {

    grid.innerHTML = "";

    board.forEach((value,index) => {

      const cell =
        document.createElement("button");

      cell.className = "ttt-cell";
      cell.textContent = value;

      cell.onclick = () => {

        if (over || board[index]) return;

        board[index] = "X";

        let win = winner();

        if (win) {
          finish(win);
          return;
        }

        const empty = board
          .map((x,i) => x ? null : i)
          .filter(x => x !== null);

        if (empty.length) {

          const cpu =
            empty[Math.floor(
              Math.random()*empty.length
            )];

          board[cpu] = "O";

        }

        win = winner();

        if (win) {
          finish(win);
          return;
        }

        render();

      };

      grid.appendChild(cell);

    });

  }

  function finish(result) {

    over = true;

    render();

    if (result === "draw") {
      message("🤝 Draw!");
    } else if (result === "X") {
      message("🏆 You win!");
      score(100);
    } else {
      message("Computer wins!");
    }

  }

  render();

  return () => {};
}

/* =========================
   SNAKE
========================= */

function buildSnake(stage) {

  stage.innerHTML = gameShell(
    "Snake Classic",
    "Arrow keys / WASD / touch buttons"
  );

  $("gameBoard").innerHTML = `
    <canvas id="snakeCanvas" width="420" height="420"></canvas>

    <div class="touch-pad">
      <button data-dir="up">▲</button>
      <div>
        <button data-dir="left">◀</button>
        <button data-dir="down">▼</button>
        <button data-dir="right">▶</button>
      </div>
    </div>
  `;

  const canvas = $("snakeCanvas");
  const ctx = canvas.getContext("2d");

  const size = 21;
  let snake = [
    {x:10,y:10},
    {x:9,y:10},
    {x:8,y:10}
  ];

  let food = randomSnakeFood();
  let dx = 1;
  let dy = 0;
  let nextDX = 1;
  let nextDY = 0;
  let points = 0;
  let timer = null;
  let stopped = false;

  function randomSnakeFood() {

    return {
      x:Math.floor(Math.random()*20),
      y:Math.floor(Math.random()*20)
    };

  }

  function move() {

    if (stopped) return;

    dx = nextDX;
    dy = nextDY;

    const head = {
      x:snake[0].x + dx,
      y:snake[0].y + dy
    };

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= 20 ||
      head.y >= 20 ||
      snake.some(p => p.x === head.x && p.y === head.y)
    ) {

      stopped = true;

      message(`Game over! Score: ${points}`);

      return;

    }

    snake.unshift(head);

    if (
      head.x === food.x &&
      head.y === food.y
    ) {

      points += 10;
      score(points);
      food = randomSnakeFood();

    } else {

      snake.pop();

    }

    draw();

  }

  function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#071633";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#ff4057";

    ctx.fillRect(
      food.x*size,
      food.y*size,
      size-2,
      size-2
    );

    ctx.fillStyle = "#36e47a";

    snake.forEach(p => {

      ctx.fillRect(
        p.x*size,
        p.y*size,
        size-2,
        size-2
      );

    });

  }

  function direction(name) {

    const dirs = {
      up:[0,-1],
      down:[0,1],
      left:[-1,0],
      right:[1,0]
    };

    const [x,y] = dirs[name];

    if (
      x === -dx &&
      y === -dy
    ) return;

    nextDX = x;
    nextDY = y;

  }

  function key(e) {

    const k = e.key.toLowerCase();

    if (
      ["arrowup","arrowdown","arrowleft","arrowright",
       "w","a","s","d"].includes(k)
    ) {
      e.preventDefault();
    }

    if (k==="arrowup" || k==="w") direction("up");
    if (k==="arrowdown" || k==="s") direction("down");
    if (k==="arrowleft" || k==="a") direction("left");
    if (k==="arrowright" || k==="d") direction("right");
  }

  document.addEventListener("keydown",key);

  document.querySelectorAll("[data-dir]")
    .forEach(btn => {
      btn.onclick = () => direction(btn.dataset.dir);
    });

  draw();

  timer = setInterval(move,120);

  return () => {

    clearInterval(timer);
    document.removeEventListener("keydown",key);

  };
}

/* =========================
   TARGET
========================= */

function buildTarget(stage) {

  stage.innerHTML = gameShell(
    "Target Master",
    "Hit as many targets as possible"
  );

  const board = $("gameBoard");

  board.innerHTML = `
    <div class="target-area" id="targetArea"></div>
  `;

  const area = $("targetArea");

  let points = 0;
  let time = 20;
  let timer = null;

  function spawn() {

    area.innerHTML = "";

    const target =
      document.createElement("button");

    target.className = "target-dot";

    target.style.left =
      `${10 + Math.random()*80}%`;

    target.style.top =
      `${10 + Math.random()*75}%`;

    target.onclick = () => {

      points += 10;

      score(points);

      spawn();

    };

    area.appendChild(target);

  }

  spawn();

  timer = setInterval(() => {

    time--;

    message(`${time}s remaining`);

    if (time <= 0) {

      clearInterval(timer);

      area.innerHTML = "";

      message(`Finished! Score: ${points}`);

    }

  },1000);

  return () => clearInterval(timer);
}

/* =========================
   MEMORY
========================= */

function buildMemory(stage) {

  stage.innerHTML = gameShell(
    "Memory Cards",
    "Find matching pairs"
  );

  const board = $("gameBoard");

  const symbols =
    ["🍎","🍌","🍇","🍉","🍒","🥝","🍋","🥭"];

  let cards =
    [...symbols,...symbols]
      .sort(() => Math.random()-0.5);

  let first = null;
  let second = null;
  let locked = false;
  let matched = 0;

  board.innerHTML =
    `<div class="memory-board"></div>`;

  const grid =
    board.querySelector(".memory-board");

  cards.forEach((symbol,index) => {

    const card =
      document.createElement("button");

    card.className = "memory-card";
    card.dataset.symbol = symbol;

    card.innerHTML = `
      <span class="back">?</span>
      <span class="front">${symbol}</span>
    `;

    card.onclick = () => {

      if (
        locked ||
        card.classList.contains("open") ||
        card.classList.contains("matched")
      ) return;

      card.classList.add("open");

      if (!first) {

        first = card;
        return;

      }

      second = card;
      locked = true;

      if (
        first.dataset.symbol ===
        second.dataset.symbol
      ) {

        first.classList.add("matched");
        second.classList.add("matched");

        matched++;

        score(matched * 10);

        first = null;
        second = null;
        locked = false;

        if (matched === symbols.length) {
          message("🏆 All pairs matched!");
        }

      } else {

        setTimeout(() => {

          first.classList.remove("open");
          second.classList.remove("open");

          first = null;
          second = null;
          locked = false;

        },700);

      }

    };

    grid.appendChild(card);

  });

  return () => {};
}

/* =========================
   2048
========================= */

function build2048(stage) {

  stage.innerHTML = gameShell(
    "2048",
    "Use arrow keys or swipe"
  );

  const board = $("gameBoard");

  board.innerHTML = `
    <div id="board2048" class="board2048"></div>
    <p>Use Arrow Keys / WASD</p>
  `;

  const grid = $("board2048");

  let tiles = Array(16).fill(0);

  add2048Tile();
  add2048Tile();
  render2048();

  function add2048Tile() {

    const empty =
      tiles
        .map((v,i) => v ? null : i)
        .filter(v => v !== null);

    if (!empty.length) return;

    const index =
      empty[Math.floor(Math.random()*empty.length)];

    tiles[index] =
      Math.random() < .9 ? 2 : 4;

  }

  function render2048() {

    grid.innerHTML = "";

    tiles.forEach(value => {

      const cell =
        document.createElement("div");

      cell.className =
        "tile2048 " +
        (value ? `n${value}` : "");

      cell.textContent = value || "";

      grid.appendChild(cell);

    });

  }

  function move(dir) {

    let changed = false;

    const old = [...tiles];

    if (dir === "left") {

      for (let r=0;r<4;r++) {

        let row =
          tiles.slice(r*4,r*4+4);

        row = combine2048(row);

        tiles.splice(r*4,4,...row);

      }

    }

    if (dir === "right") {

      for (let r=0;r<4;r++) {

        let row =
          tiles.slice(r*4,r*4+4).reverse();

        row = combine2048(row)
          .reverse();

        tiles.splice(r*4,4,...row);

      }

    }

    if (dir === "up") {

      for (let c=0;c<4;c++) {

        let col = [
          tiles[c],
          tiles[c+4],
          tiles[c+8],
          tiles[c+12]
        ];

        col = combine2048(col);

        for(let r=0;r<4;r++)
          tiles[c+r*4]=col[r];

      }

    }

    if (dir === "down") {

      for (let c=0;c<4;c++) {

        let col = [
          tiles[c],
          tiles[c+4],
          tiles[c+8],
          tiles[c+12]
        ].reverse();

        col = combine2048(col).reverse();

        for(let r=0;r<4;r++)
          tiles[c+r*4]=col[r];

      }

    }

    changed =
      JSON.stringify(old) !==
      JSON.stringify(tiles);

    if (changed) {

      add2048Tile();
      render2048();

      const max =
        Math.max(...tiles);

      score(max);

      if (max >= 2048) {
        message("🏆 You reached 2048!");
      }

    }

  }

  function key(e) {

    const map = {
      ArrowLeft:"left",
      ArrowRight:"right",
      ArrowUp:"up",
      ArrowDown:"down",
      a:"left",
      d:"right",
      w:"up",
      s:"down"
    };

    if (map[e.key]) {

      e.preventDefault();
      move(map[e.key]);

    }

  }

  document.addEventListener("keydown",key);

  let sx = 0;
  let sy = 0;

  grid.addEventListener("touchstart",e => {

    const t = e.changedTouches[0];

    sx = t.clientX;
    sy = t.clientY;

  });

  grid.addEventListener("touchend",e => {

    const t = e.changedTouches[0];

    const dx = t.clientX-sx;
    const dy = t.clientY-sy;

    if(Math.abs(dx) > Math.abs(dy)) {

      move(dx>0 ? "right":"left");

    } else {

      move(dy>0 ? "down":"up");

    }

  });

  return () => {
    document.removeEventListener("keydown",key);
  };
}

function combine2048(line) {

  let a =
    line.filter(Boolean);

  let result = [];

  for(let i=0;i<a.length;i++) {

    if(a[i] === a[i+1]) {

      result.push(a[i]*2);
      i++;

    } else {

      result.push(a[i]);

    }

  }

  while(result.length<4)
    result.push(0);

  return result;
}

/* =========================
   SIMPLE RACER
========================= */

function buildRacer(stage) {

  stage.innerHTML = gameShell(
    "Neon Racer",
    "Move left/right and avoid traffic"
  );

  $("gameBoard").innerHTML = `
    <canvas id="racerCanvas" width="420" height="620"></canvas>
    <div class="mobile-controls">
      <button id="leftCar">◀</button>
      <button id="rightCar">▶</button>
    </div>
  `;

  const canvas = $("racerCanvas");
  const ctx = canvas.getContext("2d");

  let carX = 190;
  let carY = 520;
  let enemyY = -80;
  let enemyX = 80;
  let points = 0;
  let speed = 4;
  let running = true;
  let animation = 0;

  function draw() {

    if(!running) return;

    ctx.fillStyle = "#071633";
    ctx.fillRect(0,0,420,620);

    ctx.fillStyle = "#252525";
    ctx.fillRect(70,0,280,620);

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 5;
    ctx.setLineDash([30,30]);

    ctx.lineDashOffset =
      -points*2;

    ctx.beginPath();
    ctx.moveTo(210,0);
    ctx.lineTo(210,620);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle = "#21d4fd";
    ctx.fillRect(carX,carY,40,70);

    ctx.fillStyle = "#ff3b30";
    ctx.fillRect(enemyX,enemyY,40,70);

    enemyY += speed;

    if(enemyY > 650) {

      enemyY = -100;
      enemyX =
        80 + Math.floor(Math.random()*6)*40;

      points++;

      speed =
        Math.min(10,4 + points*.05);

      score(points);

    }

    if(
      carX < enemyX+40 &&
      carX+40 > enemyX &&
      carY < enemyY+70 &&
      carY+70 > enemyY
    ) {

      running = false;

      message(`💥 Crash! Score: ${points}`);

      return;

    }

    animation =
      requestAnimationFrame(draw);

  }

  function left() {
    carX = Math.max(75,carX-45);
  }

  function right() {
    carX = Math.min(305,carX+45);
  }

  function key(e) {

    if(e.key==="ArrowLeft" || e.key==="a") left();
    if(e.key==="ArrowRight" || e.key==="d") right();

  }

  document.addEventListener("keydown",key);

  $("leftCar").onclick = left;
  $("rightCar").onclick = right;

  draw();

  return () => {

    running = false;
    cancelAnimationFrame(animation);
    document.removeEventListener("keydown",key);

  };
}

/* =========================
   SHOOTER
========================= */

function buildShooter(stage) {

  stage.innerHTML = gameShell(
    "Space Shooter",
    "Move and shoot enemies"
  );

  $("gameBoard").innerHTML = `
    <canvas id="shootCanvas" width="420" height="600"></canvas>
    <div class="mobile-controls">
      <button id="shootLeft">◀</button>
      <button id="shootFire">🔥 FIRE</button>
      <button id="shootRight">▶</button>
    </div>
  `;

  const canvas = $("shootCanvas");
  const ctx = canvas.getContext("2d");

  let player = {
    x:190,
    y:530,
    w:40,
    h:40
  };

  let bullets = [];
  let enemies = [];
  let keys = {};
  let points = 0;
  let running = true;
  let animation = 0;
  let spawnTimer = 0;

  function fire() {

    bullets.push({
      x:player.x+18,
      y:player.y-5
    });

  }

  function spawn() {

    enemies.push({
      x:20+Math.random()*360,
      y:-40,
      w:35,
      h:35,
      speed:1.5+Math.random()*2
    });

  }

  function loop() {

    if(!running) return;

    ctx.fillStyle="#02030b";
    ctx.fillRect(0,0,420,600);

    ctx.fillStyle="#fff";

    for(let i=0;i<30;i++) {

      ctx.fillRect(
        (i*73)%420,
        (i*113+points*2)%600,
        2,2
      );

    }

    if(keys.left)
      player.x=Math.max(0,player.x-5);

    if(keys.right)
      player.x=Math.min(380,player.x+5);

    ctx.fillStyle="#20d9ff";

    ctx.beginPath();

    ctx.moveTo(player.x+20,player.y);
    ctx.lineTo(player.x,player.y+40);
    ctx.lineTo(player.x+40,player.y+40);
    ctx.closePath();

    ctx.fill();

    ctx.fillStyle="#ffdd00";

    bullets.forEach(b => {

      b.y-=8;

      ctx.fillRect(b.x,b.y,4,12);

    });

    bullets =
      bullets.filter(b=>b.y>-20);

    spawnTimer++;

    if(spawnTimer>50) {

      spawn();
      spawnTimer=0;

    }

    ctx.fillStyle="#ff3650";

    enemies.forEach(e=>{

      e.y+=e.speed;

      ctx.fillRect(e.x,e.y,e.w,e.h);

    });

    enemies.forEach((e,ei)=>{

      bullets.forEach((b,bi)=>{

        if(
          b.x < e.x+e.w &&
          b.x+4 > e.x &&
          b.y < e.y+e.h &&
          b.y+12 > e.y
        ) {

          enemies.splice(ei,1);
          bullets.splice(bi,1);

          points+=10;
          score(points);

        }

      });

      if(e.y>620) {

        enemies.splice(ei,1);

      }

      if(
        player.x<e.x+e.w &&
        player.x+40>e.x &&
        player.y<e.y+e.h &&
        player.y+40>e.y
      ) {

        running=false;

        message(`💥 Game over! Score: ${points}`);

      }

    });

    animation =
      requestAnimationFrame(loop);

  }

  function keydown(e) {

    if(e.key==="ArrowLeft" || e.key==="a")
      keys.left=true;

    if(e.key==="ArrowRight" || e.key==="d")
      keys.right=true;

    if(e.key===" " || e.key==="ArrowUp") {
      e.preventDefault();
      fire();
    }

  }

  function keyup(e) {

    if(e.key==="ArrowLeft" || e.key==="a")
      keys.left=false;

    if(e.key==="ArrowRight" || e.key==="d")
      keys.right=false;

  }

  document.addEventListener("keydown",keydown);
  document.addEventListener("keyup",keyup);

  $("shootLeft").onmousedown=()=>keys.left=true;
  $("shootLeft").onmouseup=()=>keys.left=false;

  $("shootRight").onmousedown=()=>keys.right=true;
  $("shootRight").onmouseup=()=>keys.right=false;

  $("shootFire").onclick=fire;

  loop();

  return ()=>{

    running=false;
    cancelAnimationFrame(animation);

    document.removeEventListener("keydown",keydown);
    document.removeEventListener("keyup",keyup);

  };
}

/* =========================
   GENERIC REAL MINI GAME
========================= */

function simpleGame(stage, game) {

  stage.innerHTML = gameShell(
    game.name,
    game.description
  );

  const board = $("gameBoard");

  let points = 0;

  board.innerHTML = `
    <div class="simple-game-art">
      <div class="simple-icon">${game.icon}</div>
      <h2>${escapeHTML(game.name)}</h2>
      <p>${escapeHTML(game.description)}</p>

      <button id="simpleStart" class="giant-game-button">
        START GAME
      </button>

      <div id="simpleArea"></div>
    </div>
  `;

  const start = $("simpleStart");
  const area = $("simpleArea");

  start.onclick = () => {

    start.remove();

    const target =
      document.createElement("button");

    target.className="moving-target";
    target.textContent="🎯";

    area.appendChild(target);

    function move() {

      target.style.left =
        `${10+Math.random()*75}%`;

      target.style.top =
        `${10+Math.random()*65}%`;

    }

    target.onclick=()=>{

      points+=10;

      score(points);

      move();

    };

    move();

  };

  return ()=>{};
}

/* =========================================================
   ADDITIONAL MINI GAME BUILDERS
   ========================================================= */

function miniTapGame(stage,title,subtitle,icon) {

  stage.innerHTML = gameShell(
    title,
    subtitle
  );

  const board=$("gameBoard");

  let points=0;
  let time=15;
  let timer=null;

  board.innerHTML=`
    <div class="simple-game-art">
      <div class="simple-icon">${icon}</div>
      <div class="big-game-number" id="miniTime">15</div>
      <button id="miniTarget" class="giant-game-button">
        TAP
      </button>
    </div>
  `;

  const target=$("miniTarget");

  target.onclick=()=>{

    points+=10;
    score(points);

    target.style.transform=
      `rotate(${Math.random()*20-10}deg)`;

  };

  timer=setInterval(()=>{

    time--;

    $("miniTime").textContent=time;

    if(time<=0){

      clearInterval(timer);
      target.disabled=true;
      message(`Finished! Score: ${points}`);

    }

  },1000);

  return ()=>clearInterval(timer);
}

function buildWhack(stage) {
  return miniTapGame(
    stage,
    "Whack A Mole",
    "Hit the mole",
    "🔨"
  );
}

function buildQuickTap(stage) {
  return miniTapGame(
    stage,
    "Quick Tap",
    "Tap quickly",
    "⚡"
  );
}

function buildBalloon(stage) {
  return miniTapGame(
    stage,
    "Balloon Pop",
    "Pop balloons",
    "🎈"
  );
}

function buildCoin(stage) {
  return miniTapGame(
    stage,
    "Coin Collector",
    "Collect coins",
    "🪙"
  );
}

function buildFishing(stage) {
  return miniTapGame(
    stage,
    "Fishing Time",
    "Catch the fish",
    "🎣"
  );
}

/* =========================
   PHOTO EDITOR
========================= */

const FILTERS = [

  ["Original","none"],

  ["Vivid","saturate(1.5) contrast(1.1)"],
  ["Bright","brightness(1.18)"],
  ["Dark","brightness(.78)"],
  ["Warm","sepia(.18) saturate(1.25)"],
  ["Cool","hue-rotate(12deg) saturate(.95)"],
  ["Vintage","sepia(.42) contrast(.92)"],
  ["Cinema","contrast(1.22) saturate(.88)"],
  ["Golden","sepia(.25) saturate(1.35) brightness(1.04)"],
  ["Moody","brightness(.82) contrast(1.18) saturate(.82)"],
  ["Soft","brightness(1.08) contrast(.9) saturate(.9)"],
  ["Fresh","saturate(1.22) brightness(1.04)"],
  ["B&W","grayscale(1)"],
  ["Mono Soft","grayscale(.8) contrast(.92)"],
  ["Noir","grayscale(1) contrast(1.35) brightness(.88)"],
  ["Fade","contrast(.84) brightness(1.08) saturate(.72)"],
  ["Retro","sepia(.35) hue-rotate(-8deg) saturate(1.2)"],
  ["Rose","sepia(.08) hue-rotate(-15deg) saturate(1.25)"],
  ["Pink","hue-rotate(-20deg) saturate(1.25)"],
  ["Purple","hue-rotate(35deg) saturate(1.25)"],
  ["Blue","hue-rotate(85deg) saturate(1.12)"],
  ["Green","hue-rotate(125deg) saturate(1.18)"],
  ["Orange","hue-rotate(-12deg) saturate(1.35)"],
  ["Red","hue-rotate(-35deg) saturate(1.35)"],
  ["Yellow","hue-rotate(15deg) saturate(1.35)"],
  ["High Contrast","contrast(1.45)"],
  ["Low Contrast","contrast(.72)"],
  ["High Saturation","saturate(1.8)"],
  ["Low Saturation","saturate(.55)"],
  ["Matte","contrast(.86) saturate(.72) brightness(1.04)"],
  ["Glow","brightness(1.15) saturate(1.12) contrast(.95)"],
  ["Dream","brightness(1.12) saturate(.82) contrast(.9)"],
  ["Film","contrast(1.08) saturate(.82) sepia(.12)"],
  ["Classic","sepia(.16) contrast(1.06)"],
  ["Autumn","sepia(.18) hue-rotate(-8deg) saturate(1.2)"],
  ["Winter","hue-rotate(20deg) saturate(.78) brightness(1.08)"],
  ["Summer","saturate(1.38) brightness(1.05)"],
  ["Night","brightness(.65) contrast(1.2) saturate(.8)"],
  ["Daylight","brightness(1.22) contrast(1.04)"],
  ["Cloudy","brightness(.94) contrast(.92) saturate(.84)"],
  ["Sunset","sepia(.15) hue-rotate(-15deg) saturate(1.42)"],
  ["Ocean","hue-rotate(60deg) saturate(1.15)"],
  ["Forest","hue-rotate(105deg) saturate(1.2)"],
  ["Coffee","sepia(.32) saturate(.9) contrast(1.05)"],
  ["Chocolate","sepia(.46) saturate(.82) brightness(.92)"],
  ["Ice","hue-rotate(35deg) saturate(.68) brightness(1.1)"],
  ["Lime","hue-rotate(90deg) saturate(1.5)"],
  ["Berry","hue-rotate(-25deg) saturate(1.5)"],
  ["Coral","hue-rotate(-12deg) saturate(1.32)"],
  ["Lavender","hue-rotate(25deg) saturate(.88) brightness(1.08)"],
  ["Steel","grayscale(.35) contrast(1.22) saturate(.7)"],
  ["Chrome","grayscale(.25) contrast(1.35)"],
  ["Urban","contrast(1.18) saturate(.75) brightness(.94)"],
  ["Street","contrast(1.28) saturate(.9)"],
  ["Portrait","brightness(1.05) contrast(.94) saturate(.92)"],
  ["Clear","contrast(1.12) brightness(1.04)"],
  ["Sharp","contrast(1.3) saturate(1.08)"],
  ["Clean","brightness(1.06) contrast(1.04) saturate(.96)"],
  ["Luxury","contrast(1.18) sepia(.08) saturate(1.1)"],
  ["Royal","sepia(.12) saturate(1.25) contrast(1.15)"],
  ["Dark Gold","sepia(.35) contrast(1.18) brightness(.88)"],
  ["Black Gold","grayscale(.25) sepia(.28) contrast(1.3)"],
  ["Lofi","sepia(.18) contrast(.88) brightness(.9) saturate(.75)"],
  ["Aesthetic","brightness(1.04) contrast(.94) saturate(.9)"],
  ["Instagram","contrast(1.05) saturate(1.18) brightness(1.03)"],
  ["Facebook","contrast(1.08) saturate(1.1) brightness(1.04)"]
];

let photoSource = null;
let currentFilter = "none";

function setupEditor() {

  const input = $("photoInput");

  input.addEventListener("change", event => {

    const file = event.target.files[0];

    if(!file) return;

    if(!file.type.startsWith("image/")) {

      toast("Please select an image.");

      return;
    }

    const reader = new FileReader();

    reader.onload = e => {

      photoSource = e.target.result;

      $("mainPhoto").src = photoSource;

      $("mainPhoto").classList.remove("hidden");
      $("photoPlaceholder").classList.add("hidden");

      createFilterPreviews();

      applyPhotoFilter();

    };

    reader.readAsDataURL(file);

  });

  $("brightness").addEventListener(
    "input",
    applyPhotoFilter
  );

  $("contrast").addEventListener(
    "input",
    applyPhotoFilter
  );

  $("saturation").addEventListener(
    "input",
    applyPhotoFilter
  );

  $("resetPhoto").onclick = resetPhoto;

  $("downloadPhoto").onclick =
    downloadPhoto;

}

function createFilterPreviews() {

  const strip = $("filterStrip");

  strip.innerHTML = "";

  if(!photoSource) return;

  FILTERS.forEach(([name,filter],index) => {

    const item =
      document.createElement("button");

    item.className =
      "filter-item";

    if(index === 0)
      item.classList.add("selected");

    item.innerHTML = `
      <img
        class="filter-preview"
        src="${photoSource}"
        alt="${escapeHTML(name)}"
      >
      <span>${escapeHTML(name)}</span>
    `;

    const img =
      item.querySelector("img");

    img.style.filter = filter;

    item.onclick = () => {

      currentFilter = filter;

      document.querySelectorAll(".filter-item")
        .forEach(x =>
          x.classList.remove("selected")
        );

      item.classList.add("selected");

      applyPhotoFilter();

    };

    strip.appendChild(item);

  });

}

function applyPhotoFilter() {

  if(!photoSource) return;

  const brightness =
    Number($("brightness").value);

  const contrast =
    Number($("contrast").value);

  const saturation =
    Number($("saturation").value);

  $("mainPhoto").style.filter =
    `${currentFilter}
     brightness(${brightness}%)
     contrast(${contrast}%)
     saturate(${saturation}%)`;

}

function resetPhoto() {

  if(!photoSource) return;

  currentFilter = "none";

  $("brightness").value = 100;
  $("contrast").value = 100;
  $("saturation").value = 100;

  document.querySelectorAll(".filter-item")
    .forEach((x,i) =>
      x.classList.toggle("selected",i===0)
    );

  applyPhotoFilter();

}

function downloadPhoto() {

  if(!photoSource) {

    toast("First upload a photo.");

    return;

  }

  const img =
    new Image();

  img.onload = () => {

    const canvas =
      document.createElement("canvas");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx =
      canvas.getContext("2d");

    const brightness =
      $("brightness").value;

    const contrast =
      $("contrast").value;

    const saturation =
      $("saturation").value;

    ctx.filter =
      `${currentFilter}
       brightness(${brightness}%)
       contrast(${contrast}%)
       saturate(${saturation}%)`;

    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const link =
      document.createElement("a");

    link.download =
      "GamePix-AI-Edited.jpg";

    link.href =
      canvas.toDataURL("image/jpeg",.95);

    link.click();

  };

  img.src = photoSource;

}

/* =========================
   PLACEHOLDER BUILDERS
   These still have playable interaction
========================= */

function buildPong(stage) {
  return miniTapGame(stage,"Pong Duel","Hit the ball","🏓");
}

function buildBreakout(stage) {
  return miniTapGame(stage,"Brick Breaker","Break the bricks","🧱");
}

function buildFlappy(stage) {
  return miniTapGame(stage,"Flappy Bird","Tap to fly","🐦");
}

function buildDodge(stage) {
  return miniTapGame(stage,"Dodge Blocks","Avoid the blocks","💥");
}

function buildMines(stage) {
  return miniTapGame(stage,"Minesweeper","Find safe tiles","💣");
}

function buildHangman(stage) {
  return miniTapGame(stage,"Hangman","Guess the word","🔤");
}

function buildSimon(stage) {
  return miniTapGame(stage,"Simon Says","Remember the sequence","🔴");
}

function buildConnect(stage) {
  return miniTapGame(stage,"Connect Four","Connect four","🔴");
}

function buildTyping(stage) {
  return miniTapGame(stage,"Typing Race","Type quickly","⌨️");
}

function buildColorMatch(stage) {
  return miniTapGame(stage,"Color Match","Find the correct color","🎨");
}

function buildNumberMemory(stage) {
  return miniTapGame(stage,"Number Memory","Remember numbers","🔢");
}

function buildGoalkeeper(stage) {
  return miniTapGame(stage,"Goalkeeper","Save the shot","🥅");
}

function buildPenalty(stage) {
  return miniTapGame(stage,"Penalty Shoot","Score a goal","⚽");
}

function buildBasket(stage) {
  return miniTapGame(stage,"Basket Shot","Shoot the basket","🏀");
}

function buildRunner(stage) {
  return miniTapGame(stage,"Jump Runner","Jump obstacles","🏃");
}

function buildTower(stage) {
  return miniTapGame(stage,"Tower Stack","Stack blocks","🏗️");
}

function buildColorReaction(stage) {
  return miniTapGame(stage,"Color Reaction","React quickly","🌈");
}

function buildHigher(stage) {
  return miniTapGame(stage,"Higher Or Lower","Guess the card","🃏");
}

function buildScramble(stage) {
  return miniTapGame(stage,"Word Scramble","Unscramble words","🔠");
}

function buildMath(stage) {
  return miniTapGame(stage,"Math Challenge","Solve quickly","➗");
}

function buildQuiz(stage) {
  return miniTapGame(stage,"Quick Quiz","Answer correctly","❓");
}

function buildDots(stage) {
  return miniTapGame(stage,"Connect Dots","Connect dots","🔵");
}

function buildMaze(stage) {
  return miniTapGame(stage,"Maze Escape","Escape the maze","🌀");
}

function buildLights(stage) {
  return miniTapGame(stage,"Lights Out","Turn lights off","💡");
}

function buildMatch3(stage) {
  return miniTapGame(stage,"Match 3","Match objects","💎");
}

function buildPattern(stage) {
  return miniTapGame(stage,"Pattern Memory","Remember pattern","🧩");
}

function buildCorners(stage) {
  return miniTapGame(stage,"Four Corners","Choose a corner","◼️");
}

function buildOrder(stage) {
  return miniTapGame(stage,"Tap In Order","Tap numbers","🔢");
}

function buildAvoid(stage) {
  return miniTapGame(stage,"Avoid Red","Avoid red","🔴");
}

function buildFruit(stage) {
  return miniTapGame(stage,"Fruit Catcher","Catch fruit","🍎");
}

function buildParking(stage) {
  return miniTapGame(stage,"Parking Master","Park carefully","🚗");
}

function buildBike(stage) {
  return miniTapGame(stage,"Bike Balance","Balance the bike","🏍️");
}

function buildDrift(stage) {
  return miniTapGame(stage,"Drift King","Drift the car","🏁");
}

function buildPool(stage) {
  return miniTapGame(stage,"Mini Pool","Pocket balls","🎱");
}

function buildBowling(stage) {
  return miniTapGame(stage,"Bowling","Knock down pins","🎳");
}

function buildGolf(stage) {
  return miniTapGame(stage,"Mini Golf","Hit the hole","⛳");
}

function buildBoxing(stage) {
  return miniTapGame(stage,"Boxing Timer","React quickly","🥊");
}

function buildZombie(stage) {
  return miniTapGame(stage,"Zombie Defense","Defend yourself","🧟");
}

function buildTank(stage) {
  return miniTapGame(stage,"Tank Battle","Fire the tank","🛡️");
}

function buildLaser(stage) {
  return miniTapGame(stage,"Laser Dodge","Dodge lasers","🔫");
}

function buildCastle(stage) {
  return miniTapGame(stage,"Castle Defense","Protect the castle","🏰");
}

function buildSpace(stage) {
  return miniTapGame(stage,"Space Dodge","Dodge asteroids","🌌");
}

function buildWord(stage) {
  return miniTapGame(stage,"Word Guess","Guess the word","📝");
}

function buildDifferent(stage) {
  return miniTapGame(stage,"Find Different","Find the odd tile","🔍");
}

function buildSequence(stage) {
  return miniTapGame(stage,"Sequence Master","Complete sequence","🔢");
}

/* =========================
   FAVOURITES
========================= */

function toggleFavourite(id) {

  if(favourites.includes(id)) {

    favourites =
      favourites.filter(x => x !== id);

    toast("Removed from favourites");

  } else {

    favourites.push(id);

    toast("Added to favourites ❤️");

  }

  localStorage.setItem(
    "gamepix-favourites",
    JSON.stringify(favourites)
  );

  renderGames();
  renderTrending();

}

/* =========================
   TOAST
========================= */

function toast(text) {

  const el = $("toast");

  if(!el) return;

  el.textContent = text;
  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  },1800);

}

/* =========================
   GLOBAL SAFETY
========================= */

window.addEventListener("error",event => {

  console.error(
    "GamePix AI error:",
    event.error || event.message
  );

});

window.addEventListener(
  "unhandledrejection",
  event => {
    console.error(
      "GamePix AI promise error:",
      event.reason
    );
  }
);
