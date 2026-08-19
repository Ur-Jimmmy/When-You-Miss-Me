let audio=null;
const $=id=>document.getElementById(id);

function setNames(){
  const n=CONFIG.name||"My Love";
  ["introName","heroName","navName","footerName"].forEach(id=>$(id).textContent=n);
  $("introLine").textContent=CONFIG.introLine||"Because sometimes distance needs a little help.";
}
setNames();

$("enterBtn").onclick=()=>{
  $("intro").classList.add("hide");
  $("site").classList.remove("hidden");
  $("site").classList.add("visible");
  window.scrollTo(0,0);
};

function showModal(title,text){
  $("modalTitle").textContent=title;
  $("modalText").textContent=text;
  $("modal").classList.add("show");
}
$("closeModal").onclick=()=>$("modal").classList.remove("show");
$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.remove("show")};

$("missBtn").onclick=()=>{
  const x=CONFIG.letters[Math.floor(Math.random()*CONFIG.letters.length)];
  showModal(x.title,x.text);
};

$("hugBtn").onclick=()=>{
  $("hugText").textContent="🫂 Hug received. Keep it. I'm not taking it back. ❤️";
  for(let i=0;i<14;i++){
    const h=document.createElement("span");
    h.textContent="♥";h.className="floatHeart";
    h.style.left=(30+Math.random()*40)+"%";h.style.animationDelay=(Math.random()*.4)+"s";
    document.body.appendChild(h);setTimeout(()=>h.remove(),1800);
  }
};

$("timeline").innerHTML=CONFIG.timeline.map((x,i)=>`
<div class="timeItem"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("");

$("envelopes").innerHTML=CONFIG.letters.map((x,i)=>`
<button class="envelope" data-i="${i}"><div class="icon">💌</div><h3>${x.title}</h3></button>
`).join("");
document.querySelectorAll(".envelope").forEach(b=>b.onclick=()=>{
  const x=CONFIG.letters[Number(b.dataset.i)];showModal(x.title,x.text);
});

let ri=0;
function renderReason(){
  $("reasonNumber").textContent=String(ri+1).padStart(2,"0");
  $("reasonText").textContent=CONFIG.reasons[ri];
}
renderReason();
$("reasonBtn").onclick=()=>{ri=(ri+1)%CONFIG.reasons.length;renderReason()};

CONFIG.memories.forEach((m,i)=>{
  const b=document.createElement("button");
  b.className="memStar";b.textContent="✦";b.title=m[0];
  b.style.left=m[2]+"%";b.style.top=m[3]+"%";b.style.animationDelay=(i*.25)+"s";
  b.onclick=()=>{$("memoryText").textContent="✦ "+m[0]+" — "+m[1]};
  $("constellation").appendChild(b);
});

$("comfortBtn").onclick=()=>showModal(
  "Stay for a minute. 🌙",
  "Breathe in slowly. Breathe out slowly. You don't have to solve everything tonight. Drink some water, rest your eyes, and remember that you are deeply loved."
);

function countdown(){
  const d=new Date(CONFIG.nextMeeting)-new Date();
  if(d<=0){["days","hours","minutes","seconds"].forEach(x=>$(x).textContent="00");return}
  $("days").textContent=String(Math.floor(d/86400000)).padStart(2,"0");
  $("hours").textContent=String(d/3600000%24|0).padStart(2,"0");
  $("minutes").textContent=String(d/60000%60|0).padStart(2,"0");
  $("seconds").textContent=String(d/1000%60|0).padStart(2,"0");
}
countdown();setInterval(countdown,1000);

$("unlockBtn").onclick=()=>{
  if($("secretInput").value.trim().toLowerCase()===CONFIG.secretWord.toLowerCase())
    $("secretText").textContent="You found it. ♡ My secret? I would choose you again.";
  else $("secretText").textContent="Not quite… try the word only we would know. ♡";
};

$("finalBtn").onclick=()=>{$("finalText").textContent=CONFIG.finalMessage};

$("playBtn").onclick=async()=>{
  if(!audio) audio=new Audio("assets/our-song.mp3");
  audio.loop=true;
  if(audio.paused){try{await audio.play();$("playBtn").textContent="❚❚"}catch(e){$("songCaption").textContent="Add assets/our-song.mp3 first."}}
  else{audio.pause();$("playBtn").textContent="▶"}
};
$("musicBtn").onclick=()=>$("playBtn").click();
