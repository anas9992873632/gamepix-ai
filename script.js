const $=id=>document.getElementById(id);

const upload=$("upload"), canvas=$("canvas"), ctx=canvas.getContext("2d");
let img=new Image(), imageLoaded=false, bw=false;
upload.addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file)return;
  const url=URL.createObjectURL(file);
  img.onload=()=>{imageLoaded=true;canvas.classList.add("has-image");$("canvasHint").style.display="none";URL.revokeObjectURL(url);draw()};
  img.src=url;
});
["brightness","contrast","saturation","blur"].forEach(id=>$(id).addEventListener("input",draw));
$("grayscale").onclick=()=>{bw=!bw;draw()};
$("reset").onclick=()=>{["brightness","contrast","saturation","blur"].forEach((id,i)=>$(id).value=[100,100,100,0][i]);bw=false;draw()};
$("download").onclick=()=>{
  if(!imageLoaded){alert("पहले photo upload करें.");return}
  const a=document.createElement("a");a.download="gamepix-edited-photo.png";a.href=canvas.toDataURL("image/png");a.click();
};
function draw(){
  if(!imageLoaded)return;
  const maxW=1200,maxH=750,scale=Math.min(maxW/img.width,maxH/img.height,1);
  canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);
  ctx.filter=`brightness(${$("brightness").value}%) contrast(${$("contrast").value}%) saturate(${$("saturation").value}%) blur(${$("blur").value}px) grayscale(${bw?100:0}%)`;
  ctx.drawImage(img,0,0,canvas.width,canvas.height);ctx.filter="none";
}

$("gameSearch").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  let count=0;
  document.querySelectorAll(".game-card").forEach(c=>{
    const ok=c.dataset.name.includes(q);c.style.display=ok?"block":"none";if(ok)count++;
  });
  $("noGames").hidden=count!==0;
});

const modal=$("gameModal"),area=$("gameArea"),title=$("modalTitle");
function openGame(type){
  modal.classList.add("show");modal.setAttribute("aria-hidden","false");
  if(type==="click") clickGame();
  if(type==="memory") memoryGame();
  if(type==="snake") snakeGame();
  if(type==="2048") game2048();
}
function closeGame(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");area.innerHTML=""}
window.closeGame=closeGame;window.openGame=openGame;

function clickGame(){
  title.textContent="⚡ Click Speed";
  area.innerHTML=`<div class="mini-game"><p>5 seconds में जितने clicks कर सकते हो करो!</p><div class="big-number" id="clickCount">0</div><button class="game-btn" id="clickBtn">START</button><p id="clickMsg"></p></div>`;
  let n=0,running=false,t;
  $("clickBtn").onclick=()=>{
    if(!running){n=0;running=true;$("clickBtn").textContent="CLICK!";$("clickMsg").textContent="";t=setTimeout(()=>{running=false;$("clickBtn").textContent="PLAY AGAIN";$("clickMsg").textContent=`Your score: ${n} clicks 🎉`},5000);return}
    n++;$("clickCount").textContent=n;
  };
}
function memoryGame(){
  title.textContent="🧠 Memory";
  const vals=["🍎","🍌","🍇","🍉","🍎","🍌","🍇","🍉"];
  vals.sort(()=>Math.random()-.5);
  area.innerHTML=`<div class="mini-game"><p>Matching pairs खोजो</p><div class="memory-grid">${vals.map((v,i)=>`<button class="memory-card" data-v="${v}" data-i="${i}">?</button>`).join("")}</div><p id="memMsg"></p></div>`;
  let first=null,lock=false,matched=0;
  document.querySelectorAll(".memory-card").forEach(b=>b.onclick=()=>{
    if(lock||b.classList.contains("open"))return;b.classList.add("open");b.textContent=b.dataset.v;
    if(!first){first=b;return}
    if(first.dataset.v===b.dataset.v){matched+=2;first=null;if(matched===vals.length)$("memMsg").textContent="🎉 You won!"}
    else{lock=true;setTimeout(()=>{first.classList.remove("open");first.textContent="?";b.classList.remove("open");b.textContent="?";first=null;lock=false},650)}
  });
}
function snakeGame(){
  title.textContent="🐍 Snake";
  area.innerHTML=`<div class="mini-game"><canvas class="snake-board" id="snakeCanvas" width="300" height="300"></canvas><p>Arrow keys से snake चलाएँ • Game over पर Enter दबाएँ</p></div>`;
  const c=$("snakeCanvas"),x=c.getContext("2d"),cell=15;
  let snake=[{x:10,y:10}],dir={x:1,y:0},food={x:15,y:10},dead=false;
  document.onkeydown=e=>{
    if(e.key==="Enter"&&dead){snake=[{x:10,y:10}];dir={x:1,y:0};food={x:15,y:10};dead=false;return}
    if(e.key==="ArrowUp"&&dir.y===0)dir={x:0,y:-1};if(e.key==="ArrowDown"&&dir.y===0)dir={x:0,y:1};
    if(e.key==="ArrowLeft"&&dir.x===0)dir={x:-1,y:0};if(e.key==="ArrowRight"&&dir.x===0)dir={x:1,y:0};
  };
  const loop=setInterval(()=>{
    if(dead)return;
    const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(head.x<0||head.y<0||head.x>=20||head.y>=20||snake.some(s=>s.x===head.x&&s.y===head.y)){dead=true;return}
    snake.unshift(head);
    if(head.x===food.x&&head.y===food.y){food={x:Math.floor(Math.random()*20),y:Math.floor(Math.random()*20)}}else snake.pop();
    x.fillStyle="#070a11";x.fillRect(0,0,300,300);x.fillStyle="#7c3cff";snake.forEach(s=>x.fillRect(s.x*cell,s.y*cell,cell-1,cell-1));x.fillStyle="#f59e0b";x.fillRect(food.x*cell,food.y*cell,cell-1,cell-1);
    if(dead){x.fillStyle="#fff";x.font="22px sans-serif";x.fillText("GAME OVER — Enter",65,150)}
  },110);
}
function game2048(){
  title.textContent="🔢 2048";
  let board=Array(16).fill(0),score=0;
  function add(){let e=board.map((v,i)=>v?null:i).filter(v=>v!==null);if(e.length){board[e[Math.floor(Math.random()*e.length)]]=Math.random()<.9?2:4}}
  add();add();render();
  function move(dir){
    let old=board.join(",");
    const rows=[];
    for(let r=0;r<4;r++)rows.push(board.slice(r*4,r*4+4));
    let lines=(dir==="left"||dir==="right")?rows:rows.map((_,c)=>rows.map(r=>r[c]));
    lines=lines.map(line=>{if(dir==="right"||dir==="down")line.reverse();line=line.filter(Boolean);for(let i=0;i<line.length-1;i++)if(line[i]===line[i+1]){line[i]*=2;score+=line[i];line.splice(i+1,1)}while(line.length<4)line.push(0);if(dir==="right"||dir==="down")line.reverse();return line});
    if(dir==="left"||dir==="right")board=lines.flat();else board=Array(16).fill(0),lines.forEach((line,c)=>line.forEach((v,r)=>board[r*4+c]=v));
    if(board.join(",")!==old){add();render()}
  }
  function render(){area.innerHTML=`<div class="mini-game"><div class="score">Score: ${score}</div><div class="board2048">${board.map(v=>`<div class="tile n${v}">${v||""}</div>`).join("")}</div><p>Arrow keys से move करें</p></div>`}
  document.onkeydown=e=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key))move({ArrowLeft:"left",ArrowRight:"right",ArrowUp:"up",ArrowDown:"down"}[e.key])}
}
$("menuBtn").onclick=()=>document.querySelector(".topbar nav").classList.toggle("mobile");
