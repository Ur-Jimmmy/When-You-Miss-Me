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
});

function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
})();