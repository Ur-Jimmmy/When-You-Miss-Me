(() => {
"use strict";
function init(){
  const $=id=>document.getElementById(id);
  const cfg=window.CONFIG||{};
  const letters=cfg.letters||[];
  const reasons=cfg.reasons||[];
  const memories=cfg.memories||[];
  const name=cfg.name||"Jiya";

  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v};
  set("heroName",name); set("footerName",name);

  // Letters
  const grid=$("lettersGrid");
  if(grid){
    grid.innerHTML=letters.map((x,i)=>`<button class="letter-card" data-letter="${i}"><span class="envelope-art">✉</span><b>${esc(x[0])}</b><small>Open me ♡</small></button>`).join("");
    grid.querySelectorAll("[data-letter]").forEach(b=>b.onclick=()=>openLetter(+b.dataset.letter));
  }
  let current=-1;
  function openLetter(i){
    if(!letters[i])return;
    current=i; set("modalTitle",letters[i][0]);set("modalText",letters[i][1]);$("modal").classList.add("show");
  }
  function randomLetter(){
    if(!letters.length)return;
    let n=Math.floor(Math.random()*letters.length);
    if(letters.length>1&&n===current)n=(n+1)%letters.length;
    openLetter(n);
  }
  $("randomLetter")?.addEventListener("click",randomLetter);
  $("missBtn")?.addEventListener("click",randomLetter);
  $("modalNext")?.addEventListener("click",randomLetter);
  $("closeModal")?.addEventListener("click",()=>$("modal").classList.remove("show"));
  $("modal")?.addEventListener("click",e=>{if(e.target===$("modal"))$("modal").classList.remove("show")});

  // Stars
  const constellation=$("constellation");
  if(constellation){
    memories.forEach((m,i)=>{
      const b=document.createElement("button");b.className="memory-star";b.textContent="✦";b.type="button";
      b.style.left=m[2]+"%";b.style.top=m[3]+"%";b.style.animationDelay=(i*.12)+"s";
      b.onclick=()=>{set("modalTitle",m[0]);set("modalText",m[1]);$("modal").classList.add("show")};constellation.appendChild(b);
    });
    for(let i=0;i<100;i++){const s=document.createElement("span");s.className="tiny-star";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animationDelay=Math.random()*3+"s";constellation.appendChild(s)}
  }
  $("allMemories")?.addEventListener("click",()=>{const m=memories[Math.floor(Math.random()*memories.length)];if(m){set("modalTitle",m[0]);set("modalText",m[1]);$("modal").classList.add("show")}});

  function renderReasons(){
    if(!$("reasonsGrid"))return;
    $("reasonsGrid").innerHTML=[...reasons].sort(()=>Math.random()-.5).slice(0,8).map((r,i)=>`<button class="reason-card"><span>${["♡","✧","☾","∞","♥","✦","❀","♢"][i]}</span><b>${esc(r)}</b></button>`).join("");
  }
  renderReasons();$("moreReason")?.addEventListener("click",renderReasons);

  // Countdown
  function countdown(){
    const d=new Date(cfg.nextMeeting||"2026-12-01T18:00:00").getTime()-Date.now(), vals=d>0?[Math.floor(d/86400000),Math.floor(d/3600000)%24,Math.floor(d/60000)%60,Math.floor(d/1000)%60]:[0,0,0,0];
    ["days","hours","minutes","seconds"].forEach((id,i)=>set(id,String(vals[i]).padStart(2,"0")));
  }
  countdown();setInterval(countdown,1000);

  // Extras
  const extra={hug:["Emergency Hug","🫂 This hug is from Jimmy to Jiya. Hold it until we meet."],bad:["Bad Day Mode","Breathe, Jiya. One difficult day cannot define your whole story."],morning:["Good Morning","Good morning, Jiya. I hope today gives you a hundred tiny reasons to smile."],night:["Good Night","Goodnight, Jiya. Sleep peacefully. Jimmy is sending one last hug. 🌙"],reminder:["Daily Reminder","Jiya, you are loved. You matter. And you are never forgotten."],voice:["Voice Note","Imagine Jimmy saying softly: Hey Jiya, I'm here. I love you."],compliment:["Compliment Jar","Jiya, you're ridiculously special. That is today's official compliment. 💗"],quiz:["Love Quiz","Question: Who is Jimmy's favorite girl? Answer: Jiya. Obviously. 😌"]};
  document.querySelectorAll("[data-extra]").forEach(b=>b.onclick=()=>{const x=extra[b.dataset.extra];if(x){set("modalTitle",x[0]);set("modalText",x[1]);$("modal").classList.add("show")}});
  $("hugSide")?.addEventListener("click",()=>document.querySelector('[data-extra="hug"]')?.click());

  $("unlockBtn")?.addEventListener("click",()=>{
    const ok=($("secretInput").value||"").trim().toLowerCase()===String(cfg.secretWord||"love").toLowerCase();
    $("secretText").textContent=ok?"Unlocked. ♡ Jiya found Jimmy's little secret.":"Not quite… try the word only we would know. ♡";
    if(ok){
      const room=$("secretUnlocked");
      if(room){
        room.hidden=false;
        room.scrollIntoView({behavior:"smooth",block:"start"});
      }
      $("secretInput").value="";
      $("unlockBtn").textContent="Unlocked ✓";
      $("unlockBtn").disabled=true;
    }
  });
  $("secretInput")?.addEventListener("keydown",e=>{if(e.key==="Enter")$("unlockBtn").click()});
  $("finalBtn")?.addEventListener("click",()=>set("finalText",cfg.finalMessage||"Jiya, I love you. Always."));

  // V7 hidden room
  const hidden={
    story:["Our Hidden Story","Once there was a boy named Jimmy who found a girl named Jiya. Slowly, her smile became one of his favorite places to return to. So he built this tiny world: whenever Jiya missed him, she could open it and find a little piece of Jimmy waiting for her. ♡"],
    promise:["Jimmy's Promise","I promise to keep choosing you in the little things: in the random messages, the silly jokes, the difficult days, and the quiet nights. Distance can change where we are, but it doesn't get to decide where my heart is."],
    fortune:["Love Fortune","Today's prediction: Jiya will smile for no reason, think about Jimmy at least once, and receive an imaginary forehead kiss before the day ends. ✨"],
    compliment:["Compliment Machine","Jiya is officially too cute today. This machine has checked the evidence and reached the same conclusion: Jimmy is ridiculously lucky. 💗"],
    memory:["Secret Memory","Some memories don't need photographs. Sometimes a name, a song, or one little notification is enough to bring the whole feeling back. That's what Jiya is to Jimmy."],
    final:["The Last Secret","If you reached this far, remember: the website is only the gift. The real gift is every ordinary moment we still get to create together. I love you, Jiya. — Jimmy ❤️"]
  };
  document.querySelectorAll("[data-hidden]").forEach(b=>b.addEventListener("click",()=>{
    const x=hidden[b.dataset.hidden]; if(!x)return;
    set("modalTitle",x[0]);set("modalText",x[1]);$("modal").classList.add("show");
  }));
  let wishCount=0;
  $("secretMoon")?.addEventListener("click",()=>{
    wishCount++;
    $("wishDots").textContent=["● ○ ○","● ● ○","● ● ●"][Math.min(wishCount-1,2)];
    if(wishCount===1)set("wishText","The moon heard the first part. 🌙");
    if(wishCount===2)set("wishText","Almost… one more. ✨");
    if(wishCount>=3){
      set("wishText","Wish accepted. Jimmy's wish is that Jiya always has a reason to smile. ♡");
      set("modalTitle","A Wish From Jimmy 🌙");
      set("modalText","You don't have to tell me your wish. Keep it safe. I'll quietly wish for the same thing: happiness for you.");
      $("modal").classList.add("show");
      setTimeout(()=>{wishCount=0;$("wishDots").textContent="○ ○ ○"},1200);
    }
  });

  // Music
  let audio=null;
  async function toggleMusic(){
    if(!audio)audio=new Audio("assets/our-song.mp3");audio.loop=true;
    try{if(audio.paused){await audio.play();$("playBtn").textContent="❚❚";$("playTop").innerHTML="❚❚ <span>Pause Our Song</span>"}else{audio.pause();$("playBtn").textContent="▶";$("playTop").innerHTML="♫ <span>Play Our Song</span>"}}catch(e){set("modalTitle","Our Song");set("modalText","Add your MP3 as assets/our-song.mp3, then tap play again. ♡");$("modal").classList.add("show")}}
  $("playBtn")?.addEventListener("click",toggleMusic);$("playTop")?.addEventListener("click",toggleMusic);

  // Game tabs
  document.querySelectorAll(".game-tab").forEach(tab=>tab.addEventListener("click",()=>{
    document.querySelectorAll(".game-tab").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".game-view").forEach(x=>x.classList.remove("active"));
    tab.classList.add("active");$(tab.dataset.game+"Game").classList.add("active");
  }));

  // Catch Hearts
  let running=false,score=0,time=30,gameTimer=null,spawnTimer=null;
  const bestKey="jiyaJimmyBestScore";
  set("bestScore",localStorage.getItem(bestKey)||"0");
  function startGame(){
    clearInterval(gameTimer);clearInterval(spawnTimer);running=true;score=0;time=30;set("score","0");set("gameTime","30");$("catchStart")?.remove();$("loveGameBoard").querySelectorAll(".falling-heart").forEach(e=>e.remove());set("gameMessage","Catch them, Jiya! 💗");
    spawnHeart();spawnTimer=setInterval(spawnHeart,550);gameTimer=setInterval(()=>{time--;set("gameTime",time);if(time<=0)endGame()},1000);
  }
  function spawnHeart(){
    if(!running)return;const b=$("loveGameBoard"),h=document.createElement("button");h.className="falling-heart"+(Math.random()<.18?" gold":"");h.type="button";h.textContent=Math.random()<.18?"💌":"♥";h.style.left=(3+Math.random()*88)+"%";h.style.top=(4+Math.random()*84)+"%";
    h.onclick=()=>{if(!running)return;score+=h.textContent==="💌"?3:1;set("score",score);h.remove();if(score%5===0)set("gameMessage",["A hug from Jimmy! 🫂","Jiya caught another piece of my heart. 💗","Okay… you're too good at this! 😘","Jimmy owes you a kiss. 💋"][Math.floor(Math.random()*4)])};
    b.appendChild(h);setTimeout(()=>h.remove(),1400);
  }
  function endGame(){
    running=false;clearInterval(gameTimer);clearInterval(spawnTimer);$("loveGameBoard").querySelectorAll(".falling-heart").forEach(e=>e.remove());
    const old=Number(localStorage.getItem(bestKey)||0);if(score>old){localStorage.setItem(bestKey,score);set("bestScore",score)}
    set("gameMessage",`Time's up, Jiya! You caught ${score} hearts. Every one was from Jimmy. ♡`);
    const end=document.createElement("div");end.className="game-start";end.innerHTML=`<div class="game-heart">💗</div><h3>${score>=15?"Love Game Champion! 🏆":"You caught "+score+" hearts!"}</h3><p>Jimmy has an infinite supply waiting for you.</p><button class="pink-btn" id="againGame">Play Again ♥</button>`;$("loveGameBoard").appendChild(end);$("againGame").onclick=startGame;
  }
  $("startGame")?.addEventListener("click",startGame);$("newGame")?.addEventListener("click",startGame);

  // Love quiz
  const questions=[
    {q:"What is Jimmy's favorite thing to see on Jiya?",a:["Her smile","Her angry face","Her sleepy face","All of these 😌"],c:0},
    {q:"When Jiya misses Jimmy, what should she open?",a:["This website","A dictionary","A calculator","The fridge"],c:0},
    {q:"Who gets the emergency hug?",a:["Jiya","Jimmy","Both","The moon"],c:2},
    {q:"What does Jimmy want Jiya to do on a bad day?",a:["Overthink","Be gentle with herself","Skip everything","Hide"],c:1},
    {q:"Who is this little website made for?",a:["A random person","Jiya","The internet","The stars"],c:1},
    {q:"Final question: who does Jimmy choose?",a:["Jiya ♡","Jiya ♡","Jiya ♡","Still Jiya ♡"],c:0}
  ];
  let qi=0,qscore=0,answered=false;
  function renderQuiz(){
    answered=false;set("quizQuestion",questions[qi].q);set("quizCount",`Question ${qi+1} of ${questions.length}`);$("quizProgress").style.width=((qi)/questions.length*100)+"%";$("quizResult").textContent="";$("quizNext").hidden=true;
    $("quizOptions").innerHTML=questions[qi].a.map((a,i)=>`<button class="quiz-option" data-i="${i}">${esc(a)}</button>`).join("");
    $("quizOptions").querySelectorAll("button").forEach(b=>b.onclick=()=>answerQuiz(+b.dataset.i));
  }
  function answerQuiz(i){
    if(answered)return;answered=true;const q=questions[qi];document.querySelectorAll(".quiz-option").forEach((b,n)=>{if(n===q.c)b.classList.add("correct");if(n===i&&i!==q.c)b.classList.add("wrong")});
    if(i===q.c)qscore++;set("quizResult",i===q.c?"Correct! Jimmy is smiling. 💗":"Almost! But Jimmy still loves Jiya. ♡");$("quizNext").hidden=false;
  }
  $("quizNext")?.addEventListener("click",()=>{qi++;if(qi>=questions.length){set("quizQuestion",`You scored ${qscore}/${questions.length}!`);set("quizCount","Jiya & Jimmy result");$("quizProgress").style.width="100%";$("quizOptions").innerHTML="";set("quizResult",qscore>=5?"Perfect! Jiya knows Jimmy's heart. 🏆":"Not bad… Jimmy will have to teach you more about him. 😘");$("quizNext").hidden=true;setTimeout(()=>{qi=0;qscore=0;renderQuiz()},2200)}else renderQuiz()});
  renderQuiz();

  // Kiss game
  const kissText={forehead:"A soft forehead kiss from Jimmy to Jiya. 🌸 Stay close, okay?",cheek:"A cute cheek kiss! 💕 Jimmy is absolutely smiling right now.",surprise:"You picked the mystery kiss… 💋 Jimmy says this one comes with an extra-long hug. 🫂"};
  document.querySelectorAll("[data-kiss]").forEach(b=>b.onclick=()=>set("kissResult",kissText[b.dataset.kiss]));

  // Touch hug
  let holdTimer=null,holdStart=0,holding=false;
  function resetHold(){clearInterval(holdTimer);holdTimer=null;holding=false;$("touchProgress").style.width="0%";set("touchText","0%")}
  function beginHold(e){e.preventDefault();if(holding)return;holding=true;holdStart=Date.now();holdTimer=setInterval(()=>{const pct=Math.min(100,(Date.now()-holdStart)/18);$("touchProgress").style.width=pct+"%";set("touchText",Math.floor(pct)+"%");if(pct>=100)finishHold()},18)}
  function finishHold(){if(!holding)return;clearInterval(holdTimer);holding=false;$("touchProgress").style.width="100%";set("touchText","100%");set("modalTitle","Jimmy's Secret Hug 🫂");set("modalText","Jiya, imagine Jimmy pulling you close and saying very quietly: 'You don't have to miss me alone. I'm right here.'");$("modal").classList.add("show");setTimeout(resetHold,900)}
  $("touchCard")?.addEventListener("pointerdown",beginHold);$("touchCard")?.addEventListener("pointerup",finishHold);$("touchCard")?.addEventListener("pointercancel",resetHold);$("touchCard")?.addEventListener("pointerleave",resetHold);
}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();