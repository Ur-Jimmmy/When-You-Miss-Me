// ===============================
// PERSONALIZE THIS WEBSITE
// ===============================

// Change this to the date/time of your next meeting.
// Example: "2026-12-01T18:00:00"
const NEXT_MEETING = "2026-12-01T18:00:00";

// Change the secret word.
// Example: her nickname, your anniversary, etc.
const SECRET_WORD = "love";

const letters = [
  "I don't know what moment made you open this page, but I hope it reminds you of one thing: no amount of distance can make you less important to me.",
  "If I could be beside you right now, I'd probably say nothing. I'd just hold your hand and let you know you don't have to miss me alone.",
  "Some people become memories. You became a part of my everyday thoughts. That's the difference.",
  "Whenever you miss me, remember this: somewhere, someone is smiling just because you exist.",
  "I wish I could turn every 'I miss you' into a hug. Until technology catches up, let this page do a tiny part of the job."
];

const reasons = [
  "Because somehow, you can make an ordinary day feel like something worth remembering.",
  "Because your little habits are things I notice even when you think nobody does.",
  "Because talking to you can make a bad day feel a little less heavy.",
  "Because your happiness matters to me more than you probably realize.",
  "Because I don't just love the beautiful moments with you—I love the ordinary ones too.",
  "Because even when you're far away, you somehow manage to feel close.",
  "Because you are you. And somehow, that is my favorite reason."
];

const $ = id => document.getElementById(id);
let letterIndex=0, reasonIndex=0;

$("missBtn").onclick=()=>{
  $("modalTitle").textContent="For you, whenever you miss me ♡";
  $("modalText").textContent=letters[Math.floor(Math.random()*letters.length)];
  $("modal").classList.add("show");
};
$("closeModal").onclick=()=>$("modal").classList.remove("show");
$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.remove("show")};

$("letterBtn").onclick=()=>{
  letterIndex=(letterIndex+1)%letters.length;
  $("letterText").textContent=letters[letterIndex];
};

$("reasonBtn").onclick=()=>{
  reasonIndex=(reasonIndex+1)%reasons.length;
  $("reasonNo").textContent=String(reasonIndex+1).padStart(2,"0");
  $("reason").textContent=reasons[reasonIndex];
};

$("hugBtn").onclick=()=>{
  $("hugResult").textContent="🫂 Hug received. Hold it for as long as you need. ❤️";
  document.body.animate([{filter:"brightness(1)"},{filter:"brightness(1.25)"},{filter:"brightness(1)"}],{duration:700});
};

document.querySelectorAll(".star").forEach(s=>{
  s.onclick=()=>{$("memoryPopup").textContent="✦ "+s.dataset.memory};
});

$("badBtn").onclick=()=>{
  $("modalTitle").textContent="Stay for a minute. 🌙";
  $("modalText").textContent="Breathe in slowly. Breathe out slowly. You don't have to solve everything tonight. Drink some water, rest your eyes, and remember that you are deeply loved.";
  $("modal").classList.add("show");
};

$("secretBtn").onclick=()=>{
  const value=$("secretInput").value.trim().toLowerCase();
  if(value===SECRET_WORD.toLowerCase()){
    $("secretResult").textContent="You found it. ♡ Here's the secret: I would choose you again.";
  }else{
    $("secretResult").textContent="Not quite… try the word only we would know. ♡";
  }
};

$("finalBtn").onclick=()=>{
  $("finalMessage").textContent="If you ever forget how much you mean to me, come back here. I'll remind you. And if I could leave one sentence inside this whole little universe, it would be this: I am grateful that, out of everyone in this world, I get to love you.";
};

function countdown(){
  const diff=new Date(NEXT_MEETING)-new Date();
  if(diff<=0){
    $("days").textContent="00";$("hours").textContent="00";$("mins").textContent="00";$("secs").textContent="00";return;
  }
  const d=Math.floor(diff/86400000);
  const h=Math.floor(diff%86400000/3600000);
  const m=Math.floor(diff%3600000/60000);
  const s=Math.floor(diff%60000/1000);
  $("days").textContent=String(d).padStart(2,"0");
  $("hours").textContent=String(h).padStart(2,"0");
  $("mins").textContent=String(m).padStart(2,"0");
  $("secs").textContent=String(s).padStart(2,"0");
}
countdown();setInterval(countdown,1000);

// Optional background music:
// Put a file named "our-song.mp3" inside assets/ and uncomment the next block.
// const audio = new Audio("assets/our-song.mp3");
// audio.loop=true;
// $("musicBtn").onclick=()=>{ if(audio.paused){audio.play();$("musicBtn").textContent="❚❚"}else{audio.pause();$("musicBtn").textContent="♫"} };
