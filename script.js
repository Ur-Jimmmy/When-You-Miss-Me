(() => {
"use strict";

const $ = id => document.getElementById(id);
const cfg = window.CONFIG || {
  name:"My Love", introLine:"Because sometimes distance needs a little help.",
  nextMeeting:"2026-12-01T18:00:00", secretWord:"love",
  finalMessage:"If you ever forget how much you mean to me, come back here. I will remind you.",
  reasons:["Because you're you. And somehow, that is my favorite reason."],
  letters:[["A letter for you","You are loved. Always."]],
  timeline:[["The Beginning","Our story starts here."]],
  memories:[["Our memory","A beautiful memory.",50,50]]
};

document.addEventListener("DOMContentLoaded", () => {
  // Populate personal text safely.
  const name = cfg.name || "My Love";
  ["introName","heroName","navName","footerName"].forEach(id => $(id).textContent = name);
  $("introLine").textContent = cfg.introLine || "";

  // Opening screen: the site starts hidden and becomes visible ONLY after tapping.
  const intro = $("intro");
  const site = $("site");
  $("enterBtn").addEventListener("click", () => {
    intro.classList.add("hide");
    site.classList.add("open");
    site.setAttribute("aria-hidden","false");
    document.body.classList.add("started");
    setTimeout(() => { intro.style.display = "none"; }, 900);
  });

  // Modal.
  const modal = $("modal");
  const showModal = (title,text) => {
    $("modalTitle").textContent = title;
    $("modalText").textContent = text;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
  };
  $("closeModal").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
  function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }

  $("missBtn").addEventListener("click", () => {
    const x = cfg.letters[Math.floor(Math.random()*cfg.letters.length)];
    showModal(x[0],x[1]);
  });

  // Hug animation.
  $("hugBtn").addEventListener("click", () => {
    $("hugText").textContent = "🫂 Hug received. Keep it. I'm not taking it back. ❤️";
    for(let i=0;i<12;i++){
      const h=document.createElement("span");
      h.className="float-heart"; h.textContent="♥";
      h.style.left=(20+Math.random()*60)+"vw";
      h.style.animationDelay=(Math.random()*.35)+"s";
      document.body.appendChild(h);
      setTimeout(()=>h.remove(),1800);
    }
  });

  // Timeline.
  $("timeline").innerHTML = cfg.timeline.map(x =>
    `<article class="time-item"><h3>${escapeHTML(x[0])}</h3><p>${escapeHTML(x[1])}</p></article>`
  ).join("");

  // Letters.
  $("envelopes").innerHTML = cfg.letters.map((x,i) =>
    `<button class="envelope" type="button" data-i="${i}"><span>💌</span><strong>${escapeHTML(x[0])}</strong></button>`
  ).join("");
  document.querySelectorAll(".envelope").forEach(b => b.addEventListener("click", () => {
    const x=cfg.letters[Number(b.dataset.i)]; showModal(x[0],x[1]);
  }));

  // Reasons.
  let ri=0;
  const renderReason=()=>{
    $("reasonNumber").textContent=String(ri+1).padStart(2,"0");
    $("reasonText").textContent=cfg.reasons[ri];
  };
  renderReason();
  $("reasonBtn").addEventListener("click",()=>{ri=(ri+1)%cfg.reasons.length;renderReason();});

  // Stars.
  cfg.memories.forEach((m,i)=>{
    const b=document.createElement("button");
    b.type="button"; b.className="mem-star"; b.textContent="✦";
    b.style.left=m[2]+"%"; b.style.top=m[3]+"%";
    b.style.animationDelay=(i*.22)+"s";
    b.addEventListener("click",()=> $("memoryText").textContent="✦ "+m[0]+" — "+m[1]);
    $("constellation").appendChild(b);
  });

  $("comfortBtn").addEventListener("click",()=>showModal(
    "Stay for a minute. 🌙",
    "Breathe in slowly. Breathe out slowly. You don't have to solve everything tonight. Drink some water, rest your eyes, and remember that you are deeply loved."
  ));

  // Countdown.
  function countdown(){
    const diff = new Date(cfg.nextMeeting).getTime() - Date.now();
    if(!Number.isFinite(diff) || diff <= 0){
      ["days","hours","minutes","seconds"].forEach(x=>$(x).textContent="00"); return;
    }
    $("days").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");
    $("hours").textContent=String(Math.floor(diff/3600000)%24).padStart(2,"0");
    $("minutes").textContent=String(Math.floor(diff/60000)%60).padStart(2,"0");
    $("seconds").textContent=String(Math.floor(diff/1000)%60).padStart(2,"0");
  }
  countdown(); setInterval(countdown,1000);

  // Secret.
  $("unlockBtn").addEventListener("click",()=>{
    const ok=$("secretInput").value.trim().toLowerCase() === String(cfg.secretWord).trim().toLowerCase();
    $("secretText").textContent=ok ? "You found it. ♡ My secret? I would choose you again." : "Not quite… try the word only we would know. ♡";
  });
  $("secretInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("unlockBtn").click();});

  $("finalBtn").addEventListener("click",()=> $("finalText").textContent=cfg.finalMessage);

  // Music is optional. The website never throws an error if no MP3 exists.
  let audio=null;
  const toggleMusic=async()=>{
    if(!audio) audio=new Audio("assets/our-song.mp3");
    audio.loop=true;
    if(audio.paused){
      try{await audio.play();$("playBtn").textContent="❚❚";$("songCaption").textContent="Playing our song ♡";}
      catch(e){$("songCaption").textContent="Add assets/our-song.mp3 first.";}
    }else{audio.pause();$("playBtn").textContent="▶";$("songCaption").textContent="Paused";}
  };
  $("playBtn").addEventListener("click",toggleMusic);
  $("musicBtn").addEventListener("click",toggleMusic);
});

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
})();