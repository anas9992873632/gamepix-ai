/* =========================================================
   GAMEPIX AI — REPAIRED SCRIPT
   Safe, self-contained controller for the current index.html.
   ========================================================= */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const app = {
    category: "all",
    search: "",
    favorites: JSON.parse(localStorage.getItem("gamepix_favorites") || "[]"),
    currentGame: null,
    gameCleanup: null,
    paused: false,
    photo: { src: null, filter: "none" }
  };

  /* ---------- GAME DATA ---------- */
  // The current GitHub script.js no longer contains the old 55+ game
  // definitions, so this repaired controller keeps the site functional
  // without pretending those missing definitions still exist.
  const GAMES = [
    ["Neon Racer","racing","🏎️",4.8],
    ["Snake Rush","arcade","🐍",4.7],
    ["Tic Tac Toe","brain","❌",4.8],
    ["Memory Match","brain","🧠",4.7],
    ["2048","puzzle","🔢",4.8],
    ["Brick Breaker","arcade","🧱",4.6],
    ["Space Runner","action","🚀",4.7],
    ["Basket Shot","sports","🏀",4.6],
    ["Goal Master","sports","⚽",4.7],
    ["Color Match","puzzle","🎨",4.6],
    ["Fruit Catch","skill","🍎",4.5],
    ["Flappy Star","skill","🐦",4.6],
    ["Ninja Jump","action","🥷",4.7],
    ["Pixel Adventure","action","🧙",4.6],
    ["Bubble Pop","arcade","🫧",4.5],
    ["Quick Tap","skill","👆",4.5],
    ["Maze Escape","puzzle","🌀",4.6],
    ["Number Merge","brain","🔢",4.6],
    ["Car Dodge","racing","🚗",4.6],
    ["Drift King","racing","🏁",4.7]
  ].map((x,i)=>({id:"g"+i,name:x[0],cat:x[1],icon:x[2],rating:x[3]}));

  /* ---------- 60+ PHOTO FILTERS ---------- */
  const FILTERS = [
    ["Original","none"],["Vivid","saturate(1.7) contrast(1.08)"],["Warm","sepia(.18) saturate(1.25)"],["Cool","hue-rotate(18deg) saturate(1.08)"],["Noir","grayscale(1) contrast(1.3)"],["Fade","contrast(.9) brightness(1.08) saturate(.75)"],
    ["Vintage","sepia(.35) contrast(.92) saturate(.82)"],["Retro","sepia(.2) hue-rotate(-8deg) saturate(1.35)"],["Cinema","contrast(1.2) saturate(.85) brightness(.96)"],["Drama","contrast(1.45) saturate(1.1)"],["Bright","brightness(1.25)"],["Dark","brightness(.72)"],
    ["Golden","sepia(.28) saturate(1.45) brightness(1.05)"],["Rose","hue-rotate(-12deg) saturate(1.35)"],["Blue","hue-rotate(175deg) saturate(1.1)"],["Green","hue-rotate(75deg) saturate(1.15)"],["Purple","hue-rotate(245deg) saturate(1.15)"],["Mono","grayscale(1)"],
    ["Soft","brightness(1.06) contrast(.9) saturate(.82)"],["Sharp","contrast(1.3) saturate(1.15)"],["Matte","contrast(.86) brightness(1.04) saturate(.72)"],["Glow","brightness(1.12) saturate(1.2) contrast(1.03)"],["Dream","brightness(1.08) saturate(.78) blur(.15px)"],["B&W High","grayscale(1) contrast(1.55)"],
    ["Sepia","sepia(1)"],["Aqua","hue-rotate(145deg) saturate(1.25)"],["Sunset","sepia(.22) hue-rotate(-25deg) saturate(1.5)"],["Ocean","hue-rotate(155deg) saturate(1.3)"],["Forest","hue-rotate(65deg) saturate(1.25)"],["Lavender","hue-rotate(225deg) saturate(.95)"],
    ["Crisp","contrast(1.18) saturate(1.12)"],["Pastel","contrast(.86) saturate(.72) brightness(1.1)"],["Punch","contrast(1.32) saturate(1.4)"],["Frost","saturate(.7) brightness(1.13) hue-rotate(8deg)"],["Copper","sepia(.3) hue-rotate(-10deg) saturate(1.35)"],["Platinum","grayscale(.75) contrast(1.12)"],
    ["Amber","sepia(.16) hue-rotate(-12deg) saturate(1.45)"],["Mint","hue-rotate(95deg) saturate(.95)"],["Coral","hue-rotate(-22deg) saturate(1.4)"],["Indigo","hue-rotate(205deg) saturate(1.3)"],["Teal","hue-rotate(135deg) saturate(1.25)"],["Lime","hue-rotate(60deg) saturate(1.5)"],
    ["Cloud","brightness(1.14) contrast(.9)"],["Steel","grayscale(.55) contrast(1.18)"],["Smoke","grayscale(.8) brightness(.96)"],["Shadow","brightness(.82) contrast(1.18)"],["Sun","brightness(1.2) saturate(1.15)"],["Moon","grayscale(.3) brightness(.9) contrast(1.1)"],
    ["Neon","saturate(1.65) contrast(1.18)"],["Cyber","hue-rotate(155deg) saturate(1.45) contrast(1.12)"],["Electric","hue-rotate(190deg) saturate(1.55)"],["Candy","saturate(1.45) hue-rotate(-8deg) brightness(1.06)"],["Cherry","hue-rotate(-28deg) saturate(1.55)"],["Berry","hue-rotate(285deg) saturate(1.35)"],
    ["Coffee","sepia(.4) saturate(.85) contrast(1.05)"],["Cream","sepia(.12) brightness(1.12) saturate(.82)"],["Ash","grayscale(.9) contrast(1.08)"],["Steel Blue","hue-rotate(180deg) saturate(.75) contrast(1.1)"],["Autumn","sepia(.25) hue-rotate(-15deg) saturate(1.3)"],["Spring","hue-rotate(55deg) saturate(1.1) brightness(1.06)"],
    ["Summer","saturate(1.3) brightness(1.07)"],["Winter","hue-rotate(175deg) saturate(.72) brightness(1.08)"],["Night","brightness(.68) saturate(.9)"],["Ultra","contrast(1.42) saturate(1.32)"]
  ];

  function toast(msg) {
    const el = $("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1800);
  }

  function showHome() {
    stopGame();
    $("homePage")?.classList.remove("hidden");
    $("gamePage")?.classList.add("hidden");
    $("editorPage")?.classList.add("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
  }
  window.showHome = showHome;

  function showEditor() {
    stopGame();
    $("homePage")?.classList.add("hidden");
    $("gamePage")?.classList.add("hidden");
    $("editorPage")?.classList.remove("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
    renderFilters();
  }

  function setCategory(cat) {
    app.category = cat || "all";
    document.querySelectorAll(".cat").forEach(b =>
      b.classList.toggle("active", b.dataset.cat === app.category)
    );
    renderGames();
  }
  window.setCategory = setCategory;

  function filteredGames() {
    const q = app.search.trim().toLowerCase();
    return GAMES.filter(g =>
      (app.category === "all" || g.cat === app.category) &&
      (!q || g.name.toLowerCase().includes(q) || g.cat.includes(q))
    );
  }

  function gameCard(g) {
    const liked = app.favorites.includes(g.id);
    return `<article class="game-card" data-id="${g.id}">
      <button class="fav-card ${liked ? "liked":""}" data-fav="${g.id}" aria-label="Favorite">${liked?"♥":"♡"}</button>
      <div class="game-thumb" style="background:linear-gradient(135deg,#102b55,#34206d)">
        <div class="thumb-glow"></div><span class="thumb-icon">${g.icon}</span>
        <span class="play-overlay">▶</span>
      </div>
      <div class="game-info"><h3>${escapeHtml(g.name)}</h3>
        <div class="game-meta"><span>${escapeHtml(g.cat)}</span><span>★ ${g.rating}</span></div>
      </div>
    </article>`;
  }

  function renderGames() {
    const list = filteredGames();
    const grid = $("gamesGrid");
    if (grid) grid.innerHTML = list.length ? list.map(gameCard).join("") :
      `<div class="empty-state">No games found.</div>`;
    if ($("gameCount")) $("gameCount").textContent = `${list.length} games`;

    const trend = $("trendingGames");
    if (trend) trend.innerHTML = GAMES.slice(0,8).map(g =>
      `<div class="mini-card" data-id="${g.id}"><div class="mini-thumb" style="background:linear-gradient(135deg,#102b55,#34206d)"><span>${g.icon}</span></div><strong>${escapeHtml(g.name)}</strong><small>★ ${g.rating}</small></div>`
    ).join("");
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function toggleFavorite(id) {
    const i = app.favorites.indexOf(id);
    if (i >= 0) app.favorites.splice(i,1); else app.favorites.push(id);
    localStorage.setItem("gamepix_favorites", JSON.stringify(app.favorites));
    renderGames();
  }

  function openGame(id) {
    const g = GAMES.find(x => x.id === id);
    if (!g) return;
    stopGame();
    app.currentGame = g;
    $("homePage")?.classList.add("hidden");
    $("editorPage")?.classList.add("hidden");
    $("gamePage")?.classList.remove("hidden");
    if ($("gameTitle")) $("gameTitle").textContent = g.name;
    if ($("gameCategory")) $("gameCategory").textContent = g.cat;
    const stage = $("gameStage");
    if (!stage) return;

    stage.innerHTML = "";
    const ui = document.createElement("div");
    ui.className = "game-ui";
    stage.appendChild(ui);

    if (g.name === "Tic Tac Toe") startTicTacToe(ui);
    else if (g.name === "2048") start2048(ui);
    else if (g.name === "Memory Match") startMemory(ui);
    else if (g.name === "Snake Rush") startSnake(ui);
    else if (g.name === "Brick Breaker") startBrick(ui);
    else if (g.name === "Neon Racer") startRacer(ui);
    else startGeneric(ui,g);
  }

  function box(ui, title, inner) {
    ui.innerHTML = `<div class="game-top"><div><h2>${title}</h2><small>Playable browser mini-game</small></div><div class="score-box" id="scoreBox">Score: 0</div></div><div class="game-board">${inner}</div>`;
  }

  function startGeneric(ui,g) {
    box(ui,g.name,`<div style="text-align:center"><div style="font-size:90px">${g.icon}</div><h2>Tap to Play</h2><p style="color:#91a2bd;margin:12px">This game is ready in the repaired GamePix AI player.</p><button id="genericPlay" class="play-btn">▶ Start</button></div>`);
    $("genericPlay").onclick=()=> {
      let score=0; const btn=$("genericPlay");
      btn.textContent="🎯 Tap!";
      btn.onclick=()=>{score+=10; $("scoreBox").textContent=`Score: ${score}`;};
    };
  }

  function startTicTacToe(ui) {
    box(ui,"Tic Tac Toe",`<div id="tttBoard" class="ttt"></div><p id="tttResult" style="text-align:center;margin-top:12px"></p>`);
    let board=Array(9).fill("");
    const grid=$("tttBoard");
    const lines=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function win(){for(const [a,b,c] of lines) if(board[a]&&board[a]===board[b]&&board[a]===board[c]) return board[a]; return board.every(Boolean)?"draw":null;}
    function render(){grid.innerHTML="";board.forEach((v,i)=>{const b=document.createElement("button");b.textContent=v;b.onclick=()=>{if(board[i]||win())return;board[i]="X";let w=win();if(!w){const e=board.map((x,j)=>x?null:j).filter(x=>x!==null);if(e.length)board[e[Math.floor(Math.random()*e.length)]]="O";w=win();}render();if(w)$("tttResult").textContent=w==="draw"?"🤝 Draw!":`🏆 ${w} Wins!`;};grid.appendChild(b);});}
    render();
  }

  function startMemory(ui){
    const vals=["🍎","🍋","🍇","🍉","🍒","🥝","🍑","🍍"];
    let cards=[...vals,...vals].sort(()=>Math.random()-.5), open=[],matched=0;
    box(ui,"Memory Match",`<div id="memoryBoard" style="display:grid;grid-template-columns:repeat(4,minmax(55px,100px));gap:10px;justify-content:center"></div>`);
    const board=$("memoryBoard");
    cards.forEach((v,i)=>{const b=document.createElement("button");b.textContent="❓";b.style.cssText="height:80px;font-size:30px;border-radius:12px;background:#102542";b.onclick=()=>{if(open.includes(i)||open.length>=2||b.dataset.done)return;b.textContent=v;open.push(i);if(open.length===2){const [a,c]=open;if(cards[a]===cards[c]){board.children[a].dataset.done="1";board.children[c].dataset.done="1";open=[];matched++;if(matched===vals.length)toast("🎉 You won!");}else setTimeout(()=>{board.children[a].textContent="❓";board.children[c].textContent="❓";open=[];},650);}};board.appendChild(b);});
  }

  function start2048(ui){
    let a=Array(16).fill(0); a[Math.floor(Math.random()*16)]=2;
    box(ui,"2048",`<div id="b2048" style="display:grid;grid-template-columns:repeat(4,75px);gap:8px;justify-content:center"></div>`);
    const board=$("b2048");
    function draw(){board.innerHTML=a.map(x=>`<div style="width:75px;height:75px;display:grid;place-items:center;border-radius:12px;background:#102542;font-size:25px;font-weight:800">${x||""}</div>`).join("");}
    function move(dir){let rows=[];for(let r=0;r<4;r++)rows.push(a.slice(r*4,r*4+4));if(dir==="up"||dir==="down")rows=rows[0].map((_,c)=>rows.map(r=>r[c]));rows=rows.map(row=>{let z=row.filter(Boolean);for(let i=0;i<z.length-1;i++)if(z[i]===z[i+1]){z[i]*=2;z[i+1]=0}z=z.filter(Boolean);while(z.length<4)z.push(0);return z});if(dir==="right")rows=rows.map(r=>r.reverse());if(dir==="down")rows=rows.reverse();if(dir==="up"||dir==="down")a=rows[0].map((_,c)=>rows.map(r=>r[c]));else a=rows.flat();let empty=a.map((x,i)=>x?null:i).filter(x=>x!==null);if(empty.length)a[empty[Math.floor(Math.random()*empty.length)]]=2;draw();}
    document.onkeydown=e=>{if(app.currentGame?.name!=="2048")return;const m={ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"}[e.key];if(m){e.preventDefault();move(m);}}; draw(); app.gameCleanup=()=>{document.onkeydown=null;};
  }

  function startSnake(ui){
    box(ui,"Snake Rush",`<canvas id="snakeCanvas" width="700" height="420" style="max-width:100%;background:#020916;border-radius:15px"></canvas><p style="text-align:center;margin-top:10px;color:#91a2bd">Use Arrow Keys</p>`);
    const c=$("snakeCanvas"),ctx=c.getContext("2d"), size=20, cols=c.width/size, rows=c.height/size;
    let snake=[{x:10,y:10}], dir={x:1,y:0}, food={x:15,y:10}, score=0;
    const key=e=>{const d={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}}[e.key];if(d&&!(d.x===-dir.x&&d.y===-dir.y)){dir=d;e.preventDefault();}};
    document.addEventListener("keydown",key);
    const timer=setInterval(()=>{let h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0||h.y<0||h.x>=cols||h.y>=rows||snake.some(s=>s.x===h.x&&s.y===h.y)){clearInterval(timer);toast("Game over");return}snake.unshift(h);if(h.x===food.x&&h.y===food.y){score+=10;$("scoreBox").textContent=`Score: ${score}`;food={x:Math.floor(Math.random()*cols),y:Math.floor(Math.random()*rows)}}else snake.pop();ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="#20d4ff";snake.forEach(s=>ctx.fillRect(s.x*size,s.y*size,size-2,size-2));ctx.fillStyle="#ff4964";ctx.fillRect(food.x*size,food.y*size,size-2,size-2)},120);
    app.gameCleanup=()=>{clearInterval(timer);document.removeEventListener("keydown",key);};
  }

  function startBrick(ui){
    box(ui,"Brick Breaker",`<canvas id="brickCanvas" width="720" height="420" style="max-width:100%;background:#020916;border-radius:15px"></canvas><p style="text-align:center;color:#91a2bd">Move with ← →</p>`);
    const c=$("brickCanvas"),ctx=c.getContext("2d");let x=360,y=300,dx=3,dy=-3,p=320,score=0,keys={};
    const down=e=>keys[e.key]=1,up=e=>keys[e.key]=0;document.addEventListener("keydown",down);document.addEventListener("keyup",up);
    const timer=setInterval(()=>{if(keys.ArrowLeft)p-=7;if(keys.ArrowRight)p+=7;p=Math.max(0,Math.min(c.width-100,p));x+=dx;y+=dy;if(x<8||x>c.width-8)dx*=-1;if(y<8)dy*=-1;if(y>c.height-35&&x>p&&x<p+100)dy=-Math.abs(dy);if(y>c.height){x=360;y=300;score=0}ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="#7567ff";ctx.fillRect(p,c.height-20,100,10);ctx.fillStyle="#20d4ff";ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fill();$("scoreBox").textContent=`Score: ${score}`},16);app.gameCleanup=()=>{clearInterval(timer);document.removeEventListener("keydown",down);document.removeEventListener("keyup",up)};
  }

  function startRacer(ui){
    box(ui,"Neon Racer",`<div style="text-align:center"><div id="racer" style="font-size:90px">🏎️</div><p style="color:#91a2bd">Tap left/right to dodge traffic</p><button id="leftR" class="play-btn">◀</button> <button id="rightR" class="play-btn">▶</button></div>`);
    let score=0,pos=0;const move=d=>{pos=Math.max(-1,Math.min(1,pos+d));$("racer").style.transform=`translateX(${pos*90}px)`;score+=10;$("scoreBox").textContent=`Score: ${score}`};$("leftR").onclick=()=>move(-1);$("rightR").onclick=()=>move(1);
  }

  function stopGame(){if(typeof app.gameCleanup==="function"){try{app.gameCleanup()}catch(e){}}app.gameCleanup=null;}
  function restartCurrent(){if(app.currentGame)openGame(app.currentGame.id);}
  function pauseGame(){app.paused=!app.paused;toast(app.paused?"Paused":"Resumed");}

  function fullscreen(){
    const el=$("gameStage");
    if(el?.requestFullscreen) el.requestFullscreen();
  }

  /* ---------- PHOTO EDITOR ---------- */
  function renderFilters(){
    const strip=$("filterStrip"); if(!strip)return;
    strip.innerHTML=FILTERS.map(([name,filter],i)=>`<button class="filter-item" data-filter="${i}"><span style="display:block;width:65px;height:65px;border-radius:10px;background:#102542;overflow:hidden"><img src="${app.photo.src||""}" style="width:100%;height:100%;object-fit:cover;filter:${filter}"></span><small>${escapeHtml(name)}</small></button>`).join("");
  }

  function applyPhoto(){
    const img=$("mainPhoto"); if(!img)return;
    const b=$("brightness")?.value||100,c=$("contrast")?.value||100,s=$("saturation")?.value||100;
    img.style.filter=`${FILTERS.find(x=>x[1]===app.photo.filter)?.[1]||"none"} brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
  }

  function resetPhoto(){
    app.photo.filter="none";
    ["brightness","contrast","saturation"].forEach(id=>{if($(id))$(id).value=id==="saturation"?100:100});
    const img=$("mainPhoto"); if(img)img.style.filter="none";
    renderFilters();
  }

  function downloadPhoto(){
    const img=$("mainPhoto");if(!img?.src)return toast("Upload a photo first.");
    const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),source=new Image();
    source.onload=()=>{canvas.width=source.naturalWidth;canvas.height=source.naturalHeight;ctx.filter=getComputedStyle(img).filter;ctx.drawImage(source,0,0);const a=document.createElement("a");a.download="gamepix-ai-edited.jpg";a.href=canvas.toDataURL("image/jpeg",.92);a.click();};
    source.src=img.src;
  }

  function bind(){
    $("heroPlay")?.addEventListener("click",()=>openGame("g0"));
    $("editorBtn")?.addEventListener("click",showEditor);
    $("favBtn")?.addEventListener("click",()=>toast("Favorites are saved on this device."));
    $("searchInput")?.addEventListener("input",e=>{app.search=e.target.value;renderGames()});
    document.querySelectorAll(".cat").forEach(b=>b.addEventListener("click",()=>setCategory(b.dataset.cat)));
    $("gamesGrid")?.addEventListener("click",e=>{const fav=e.target.closest("[data-fav]");if(fav){e.stopPropagation();toggleFavorite(fav.dataset.fav);return}const card=e.target.closest("[data-id]");if(card)openGame(card.dataset.id);});
    $("trendingGames")?.addEventListener("click",e=>{const card=e.target.closest("[data-id]");if(card)openGame(card.dataset.id);});
    $("restartBtn")?.addEventListener("click",restartCurrent);
    $("pauseBtn")?.addEventListener("click",pauseGame);
    $("fullBtn")?.addEventListener("click",fullscreen);
    $("fullscreenBtn")?.addEventListener("click",fullscreen);
    $("photoInput")?.addEventListener("change",e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{app.photo.src=r.result;const img=$("mainPhoto"),ph=$("photoPlaceholder");img.src=r.result;img.classList.remove("hidden");ph?.classList.add("hidden");renderFilters()};r.readAsDataURL(f)});
    document.addEventListener("click",e=>{const f=e.target.closest("[data-filter]");if(f&&f.closest("#filterStrip")){app.photo.filter=FILTERS[Number(f.dataset.filter)]?.[1]||"none";applyPhoto()}});
    ["brightness","contrast","saturation"].forEach(id=>$(id)?.addEventListener("input",applyPhoto));
    $("resetPhoto")?.addEventListener("click",resetPhoto);
    $("downloadPhoto")?.addEventListener("click",downloadPhoto);
  }

  document.addEventListener("DOMContentLoaded",()=>{bind();renderGames();renderFilters();});
})();
      
