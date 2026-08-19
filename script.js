(() => {
"use strict";
const $=id=>document.getElementById(id);
const cfg=window.CONFIG||{};
let currentLetter=-1, audio=null;

document.addEventListener("DOMContentLoaded",()=>{
  const name=cfg.name||"My Love";
  $("heroName").textContent=name;
  $("footerName").textContent=name;

  const letters=cfg.letters||[];
  const reasons=cfg.reasons||[];
  const memories=cfg.memories||[];

  // Create many letter cards and make random-letter access endless.
  function letterCard(x,i){
    return `<button class="letter-card" data-letter="${i}"><span class="envelope-art">✉</span><b>${esc(x[0])}</b><small>Open me ♡</small></button>`;
  }
  $("lettersGrid").innerHTML=letters.map(letterCard).join("");
  document.querySelectorAll("[data-letter]").forEach(b=>b.onclick=()=>openLetter(+b.dataset.letter));

  function openLetter(i){
    currentLetter=i;
    const x=letters[i];
    $("modalTitle").textContent=x[0];
    $("modalText").textContent=x[1];
    $("modal").classList.add("show");
  }
  function randomLetter(){
    if(!letters.length)return;
    let n=Math.floor(Math.random()*letters.length);
    if(letters.length>1 && n===currentLetter)n=(n+1)%letters.length;
    openLetter(n);
  }
  $("randomLetter").onclick=randomLetter;
  $("missBtn").onclick=randomLetter;
  $("modalNext").onclick=randomLetter;
  $("closeModal").onclick=()=>$("modal").classList.remove("show");
  $("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.remove("show")};

  // Generate a very large star field.
  const starBox=$("constellation");
  memories.forEach((m,i)=>{
    const s=document.createElement("button");
    s.className="memory-star"; s.type="button"; s.textContent="✦";
    s.style.left=m[2]+"%"; s.style.top=m[3]+"%";
    s.style.animationDelay=(i*.13)+"s";
    s.title=m[0];
    s.onclick=()=>openMemory(m);
    starBox.appendChild(s);
  });
  for(let i=0;i<75;i++){
    const s=document.createElement("span");
    s.className="tiny-star";
    s.style.left=Math.random()*100+"%"; s.style.top=Math.random()*100+"%";
    s.style.animationDelay=Math.random()*3+"s";
    starBox.appendChild(s);
  }
  function openMemory(m){
    $("modalTitle").textContent=m[0];
    $("modalText").textContent=m[1];
    $("modal").classList.add("show");
  }
  $("allMemories").onclick=()=>openMemory(memories[Math.floor(Math.random()*memories.length)]);

  // Reasons: many random cards.
  function renderReasons(){
    const shuffled=[...reasons].sort(()=>Math.random()-.5).slice(0,8);
    $("reasonsGrid").innerHTML=shuffled.map((r,i)=>`<button class="reason-card" data-reason="${i}"><span>${["♡","✧","☾","∞","♥","✦","❀","♢"][i]}</span><b>${esc(r)}</b></button>`).join("");
  }
  renderReasons(); $("moreReason").onclick=renderReasons;

  // Countdown.
  function countdown(){
    const d=new Date(cfg.nextMeeting||"2026-12-01T18:00:00").getTime()-Date.now();
    const vals=d>0?[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60]:[0,0,0,0];
    ["days","hours","minutes","seconds"].forEach((id,i)=>$(id).textContent=String(vals[i]).padStart(2,"0"));
  }
  countdown(); setInterval(countdown,1000);

  // Extras.
  const extra={
    hug:["Emergency Hug","🫂 Sending you the biggest virtual hug. Keep it until we meet."],
    bad:["Bad Day Mode","Today doesn't have to be perfect. Drink some water, breathe slowly and be gentle with yourself."],
    morning:["Good Morning","Good morning, beautiful. I hope today gives you at least one reason to smile."],
    night:["Good Night","Close your eyes. Leave today's worries outside the bedroom. Sleep peacefully, love."],
    reminder:["Daily Reminder","You are loved. You are important. You are more capable than you think."],
    voice:["Voice Note","Imagine my voice saying this softly: 'Hey, I'm here. You're okay. I love you.'"],
    compliment:["Compliment Jar","You're ridiculously special. Yes, that's the compliment. No, I'm not taking it back."],
    quiz:["Love Quiz","Question: Who is my favorite person? Answer: You. Congratulations, you got 100%."]
  };
  document.querySelectorAll("[data-extra]").forEach(b=>b.onclick=()=>{
    const x=extra[b.dataset.extra]; $("modalTitle").textContent=x[0];$("modalText").textContent=x[1];$("modal").classList.add("show");
  });
  $("hugSide").onclick=()=>{document.querySelector('[data-extra="hug"]').click()};

  // Secret.
  $("unlockBtn").onclick=()=>{
    const ok=$("secretInput").value.trim().toLowerCase()==String(cfg.secretWord||"love").toLowerCase();
    $("secretText").textContent=ok?"Unlocked. ♡ You found the little secret I kept for you.":"Not quite… try the word only we would know. ♡";
  };
  $("secretInput").onkeydown=e=>{if(e.key==="Enter")$("unlockBtn").click()};

  $("finalBtn").onclick=()=>{$("finalText").textContent=cfg.finalMessage||"I love you. Always."};

  // Music: optional file.
  const toggle=async()=>{
    if(!audio)audio=new Audio("assets/our-song.mp3");
    audio.loop=true;
    try{
      if(audio.paused){await audio.play();$("playBtn").textContent="❚❚";$("playTop").innerHTML="❚❚ <span>Pause Our Song</span>"}
      else{audio.pause();$("playBtn").textContent="▶";$("playTop").innerHTML="♫ <span>Play Our Song</span>"}
    }catch(e){$("modalTitle").textContent="Our Song";$("modalText").textContent="Add your MP3 as assets/our-song.mp3 and try again. ♡";$("modal").classList.add("show")}
  };
  $("playBtn").onclick=toggle;$("playTop").onclick=toggle;

  $("galleryInfo").onclick=()=>{$("modalTitle").textContent="Our Gallery";$("modalText").textContent="Replace the 'Your Photo' placeholders with your favorite photos. ♡";$("modal").classList.add("show")};
  $("themeBtn").onclick=()=>document.body.classList.toggle("brighter");
  // Playful love game: tap falling hearts for 30 seconds.
  let gameTimer=null, spawnTimer=null, gameRunning=false, gameScore=0, timeLeft=30;
  const board=$("loveGameBoard"), scoreEl=$("score"), timeEl=$("gameTime"), bestEl=$("bestScore"), gameMsg=$("gameMessage");
  const bestKey="whenYouMissMeBest";
  bestEl.textContent=localStorage.getItem(bestKey)||"0";

  function startLoveGame(){
    clearInterval(gameTimer); clearInterval(spawnTimer);
    board.querySelectorAll(".falling-heart").forEach(x=>x.remove());
    gameRunning=true; gameScore=0; timeLeft=30; scoreEl.textContent="0"; timeEl.textContent="30";
    board.querySelector(".game-start")?.remove();
    gameMsg.textContent="Catch as many as you can! 💗";
    spawnHeart();
    spawnTimer=setInterval(spawnHeart,650);
    gameTimer=setInterval(()=>{
      timeLeft--; timeEl.textContent=timeLeft;
      if(timeLeft<=0) endLoveGame();
    },1000);
  }
  function spawnHeart(){
    if(!gameRunning)return;
    const h=document.createElement("button");
    h.className="falling-heart"+(Math.random()<.12?" gold":"");
    h.type="button"; h.textContent=Math.random()<.18?"💌":"♥";
    h.style.left=(4+Math.random()*88)+"%";
    h.style.top=(8+Math.random()*78)+"%";
    h.style.transform=`rotate(${Math.random()*30-15}deg)`;
    h.onclick=()=>{
      if(!gameRunning)return;
      gameScore += h.textContent==="💌"?3:1;
      scoreEl.textContent=gameScore;
      h.textContent="♡";
      h.style.pointerEvents="none";
      h.style.transform="scale(1.8)";
      h.style.opacity="0";
      setTimeout(()=>h.remove(),120);
      if(gameScore%5===0){
        const messages=["That one's a hug from me. 🫂","Caught! I owe you a kiss. 💋","You found another little piece of my heart. 💗","Okay… you're getting dangerously good at this. 😘","One more reason to smile. ✨"];
        gameMsg.textContent=messages[Math.floor(Math.random()*messages.length)];
      }
    };
    board.appendChild(h);
    setTimeout(()=>h.remove(),1400);
  }
  function endLoveGame(){
    gameRunning=false; clearInterval(gameTimer); clearInterval(spawnTimer);
    board.querySelectorAll(".falling-heart").forEach(x=>x.remove());
    const old=Number(localStorage.getItem(bestKey)||0);
    if(gameScore>old){localStorage.setItem(bestKey,gameScore);bestEl.textContent=gameScore}
    gameMsg.textContent=`Time's up! You caught ${gameScore} heart${gameScore===1?"":"s"} — and every one was meant for you. ♡`;
    const end=document.createElement("div");
    end.className="game-start";
    end.innerHTML=`<div class="game-heart">💗</div><h3>You caught ${gameScore} hearts!</h3><p>${gameScore>=15?"Okay, you're officially a love-game champion. 🏆":"I still have an infinite supply waiting for you. ♡"}</p><button class="pink-btn" id="againGame">Play Again ♥</button>`;
    board.appendChild(end);
    $("againGame").onclick=startLoveGame;
  }
  $("startGame").onclick=startLoveGame;
  $("newGame").onclick=startLoveGame;

  // Press-and-hold surprise.
  let holdTimer=null, holdStart=0, holding=false;
  const touchCard=$("touchCard"), touchBar=$("touchProgress"), touchText=$("touchText");
  function beginHold(e){
    e.preventDefault(); if(holding)return; holding=true; holdStart=Date.now();
    holdTimer=setInterval(()=>{
      const pct=Math.min(100,(Date.now()-holdStart)/25);
      touchBar.style.width=pct+"%";touchText.textContent=Math.floor(pct)+"%";
      if(pct>=100){finishHold()}
    },25);
  }
  function finishHold(){
    clearInterval(holdTimer);holdTimer=null;
    if(!holding)return; holding=false;
    touchBar.style.width="100%";touchText.textContent="100%";
    $("modalTitle").textContent="You found a secret hug 🫂";
    $("modalText").textContent="If I were there, I'd pull you close, hold you for a little longer than necessary, and quietly say: I love you.";
    $("modal").classList.add("show");
    setTimeout(()=>{touchBar.style.width="0%";touchText.textContent="0%"},900);
  }
  function cancelHold(){
    if(!holding)return; clearInterval(holdTimer);holdTimer=null;holding=false;
    touchBar.style.width="0%";touchText.textContent="0%";
  }
  touchCard.addEventListener("pointerdown",beginHold);
  touchCard.addEventListener("pointerup",finishHold);
  touchCard.addEventListener("pointerleave",cancelHold);
  touchCard.addEventListener("pointercancel",cancelHold);

});

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
})();