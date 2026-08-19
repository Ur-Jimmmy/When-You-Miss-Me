const CONFIG = {
  name: "My Love",
  nextMeeting: "2026-12-01T18:00:00",
  secretWord: "love",
  finalMessage: "If you ever forget how much you mean to me, come back here. I will remind you. You are my favorite thought, my safest place, and one of the most beautiful parts of my life.",


  // Extra message variations. The site randomly chooses a matching line
  // every time Jiya opens a message, so the same box never has to feel repetitive.
  messagePools: {
    miss: [
      "I know that little ache of missing someone. So consider this your tiny piece of Jimmy for right now. ♡",
      "If distance had a delete button, I'd press it just to get one hug from you. Until then, I'm right here.",
      "Missing me? Then pause for a second and imagine my hand finding yours. Better? ♡",
      "Somewhere between this sentence and the next, Jimmy is probably thinking about Jiya too.",
      "I wish I could turn this screen into a doorway and simply walk over to you."
    ],
    sad: [
      "You don't have to pretend you're okay for me. Take your time. I'll still be here.",
      "A heavy heart deserves softness, not pressure. Be gentle with yourself tonight.",
      "This feeling will move. Until it does, borrow a little strength from Jimmy. 🫂",
      "You are allowed to rest. Nothing about one hard day makes you less wonderful.",
      "If I were beside you, I wouldn't try to fix everything. I'd just stay."
    ],
    hug: [
      "Come here, Jiya. No explanations. Just a long, warm hug from Jimmy. 🫂",
      "Imagine my arms around you and your head on my shoulder. Stay there for a moment.",
      "This is a virtual hug, but the feeling behind it is very real.",
      "One hug, held a little longer than necessary, because I missed you too.",
      "Sending you the kind of hug that makes the rest of the world go quiet."
    ],
    sleep: [
      "Close your eyes, breathe slowly, and let today go. Goodnight, Jiya. 🌙",
      "If I could, I'd stay beside you until your breathing became sleepy and peaceful.",
      "No more overthinking tonight. Tomorrow gets your attention. Tonight gets your rest.",
      "Goodnight, beautiful. Imagine one soft forehead kiss from Jimmy before you sleep.",
      "Sleep peacefully. You have already done enough for today."
    ],
    overthink: [
      "Not every thought deserves an answer tonight. Let some thoughts pass without following them.",
      "Take one breath. Then another. You don't have to solve tomorrow right now.",
      "Your mind can be loud without being right. Be kind to yourself.",
      "Pause. What you feel matters, but one anxious thought is not the whole truth.",
      "Come back to the present moment. Jimmy would rather see you peaceful than perfect."
    ],
    reassurance: [
      "Yes, Jiya. I still choose you. And yes, that answer is still simple. ♡",
      "You never have to compete for your place in my heart.",
      "If you need reassurance, here it is again: you matter to me deeply.",
      "Distance doesn't erase care. Silence doesn't erase love.",
      "You are not a temporary thought. You are someone I carry with me."
    ],
    happy: [
      "Keep that smile! Jimmy officially declares it one of his favorite sights. ✨",
      "Your happiness makes me happy in a very unfairly adorable way.",
      "Don't rush past this moment. Save it somewhere in your heart.",
      "I hope today's happiness stays with you a little longer.",
      "If you're smiling right now, then this little website has done its job. ♡"
    ],
    smile: [
      "Emergency smile delivery: Jiya is ridiculously cute. Package received. 📦💗",
      "Reminder: Jimmy has an ongoing crush on your smile.",
      "You were supposed to read this and smile. Yes, I planned that.",
      "Tiny joke: I miss you so much even my Wi‑Fi probably knows your name. 😌",
      "Okay, Jiya. One smile for Jimmy. No negotiations."
    ],
    alone: [
      "Even when the room feels empty, remember that you are deeply remembered.",
      "You can feel alone without actually being forgotten.",
      "Tonight, let this little page keep you company for a minute.",
      "Jiya, you are loved in places you cannot always see.",
      "If loneliness gets loud, come back here and take a slow breath with me."
    ],
    love: [
      "Because your existence somehow makes my ordinary days feel more meaningful.",
      "Because with you, even silence can feel like a conversation.",
      "Because I don't just love the easy version of you; I care about the real you.",
      "Because somehow, out of everyone in this huge world, my heart learned your name.",
      "Because loving you feels less like a decision and more like home."
    ],
    rain: [
      "Let the rain do the talking for a while. You just listen and rest.",
      "Rainy days were invented for blankets, music, and thinking about someone you love.",
      "If I were there, we'd probably watch the rain and make absolutely no plans.",
      "Every raindrop is a tiny reminder that quiet moments can still be beautiful.",
      "Stay warm, Jiya. Consider this a rainy-day hug from Jimmy."
    ],
    bad: [
      "One bad day cannot rewrite every good thing you've lived.",
      "Today can be difficult without becoming your definition.",
      "Put down the pressure for a little while. You can try again tomorrow.",
      "I'm proud of you for getting through today, even if it wasn't pretty.",
      "Bad chapters end. Please don't judge the whole story from one page."
    ],
    courage: [
      "You don't need fearless courage. You only need enough courage for the next step.",
      "You've already survived things you once thought you couldn't.",
      "Tiny progress counts. Jimmy believes in your next step.",
      "Be scared if you need to. Just don't let fear make every decision for you.",
      "You are stronger than the voice that tells you otherwise."
    ],
    insecure: [
      "Please don't measure your worth by one mirror, one mood, or one person's opinion.",
      "You don't need to become someone else to deserve love.",
      "There are beautiful things about you that you haven't learned to see yet.",
      "Jimmy sees more in you than the flaws you focus on.",
      "You are allowed to be a work in progress and still be deeply lovable."
    ],
    future: [
      "Some of our best memories are still somewhere ahead of us.",
      "There are places we haven't visited, jokes we haven't made, and sunsets we haven't shared yet.",
      "I like thinking about the version of us that hasn't happened yet.",
      "The future feels sweeter when I imagine Jiya somewhere inside it.",
      "Let's leave some pages blank. We still have stories to write."
    ],
    midnight: [
      "At 12:00 AM, the world gets quiet and this little reminder gets louder: Jimmy loves Jiya. 🌙",
      "If everyone is asleep and you're still awake, consider this your midnight company.",
      "The stars are out. So is one very simple thought: I miss you.",
      "Midnight is a good time for soft thoughts and imaginary forehead kisses.",
      "Before you sleep, remember one thing you loved about today."
    ],
    generic: [
      "This message was randomly chosen for you, Jiya. ♡",
      "A little note from Jimmy, selected just for this moment.",
      "If this appeared at the right time, maybe you needed it more than you knew.",
      "Keep this one. It belongs to this exact moment between us.",
      "One random message, one very real feeling: you matter to me."
    ]
  },

  // Add as many permanent letters as you want.
  letters: [
    ["Open when you miss me","If I could turn every 'I miss you' into a hug, I would. Until I can, let this page hold one for me."],
    ["Open when you're sad","You don't have to be strong every minute. Breathe. Rest. Tomorrow can wait. You are loved exactly as you are."],
    ["Open when you need a hug","Close your eyes for five seconds. Imagine my arms around you. That's your hug. Keep it."],
    ["Open before sleeping","Goodnight, love. If I could be there, I'd stay until you fell asleep."],
    ["Open when you're overthinking","Don't let one difficult thought convince you that everything is difficult. Take a breath. I'm with you."],
    ["Open when you need reassurance","If you need one simple answer: yes, I still choose you."],
    ["Open when you're happy","Keep that smile. Your happiness is one of my favorite things to see."],
    ["Open when you need a smile","Official reminder: somewhere in this universe, there is a person who thinks you're ridiculously adorable."],
    ["Open when you feel alone","You are never as alone as you feel in a difficult moment. You are loved, remembered and missed."],
    ["Open when you want to know why I love you","Because you are you. There is no more complicated answer than that."],
    ["Open on a rainy day","Rain makes everything quieter. Let it. Rest for a while and remember something beautiful about us."],
    ["Open after a bad day","Today was a bad chapter, not the whole story. Tomorrow gets another page."],
    ["Open when you can't sleep","Put the phone down after this, close your eyes, and imagine us somewhere peaceful."],
    ["Open when you need courage","You have survived every difficult day you've faced so far. Don't underestimate that."],
    ["Open when you feel insecure","You don't need to become someone else to be worthy of love. You already are."],
    ["Open when you want to hear 'I love you'","I love you. No hidden condition. No complicated explanation. Just that."],
    ["Open when you miss our conversations","Even our random, pointless conversations became some of my favorite memories."],
    ["Open when you want a surprise","Surprise: I was thinking about you while you were reading this."],
    ["Open on our special day","Another day, another memory, another reason to be grateful that our paths crossed."],
    ["Open when you need hope","The future has not been written yet. That's the beautiful part."],
    ["Open when you're angry","Take a pause before you decide what the moment means. Feelings are real, but they are not always the whole truth."],
    ["Open when you're proud of yourself","I hope you're proud too. You deserve to celebrate how far you've come."],
    ["Open when you need motivation","One tiny step is still a step. You don't have to finish everything today."],
    ["Open when you want to remember us","Remember the little things: the laughs, the pauses, the silly moments, the quiet ones."],
    ["Open when you need peace","Nothing needs to be solved for the next five minutes. Just breathe."],
    ["Open when you think of me","Then smile for me. That's all I ask."],
    ["Open when you need to know you're special","There is nobody else who is exactly you. That is your magic."],
    ["Open when you want a future thought","There are memories of us that haven't happened yet. I can't wait to meet them."],
    ["Open at midnight","The world is quiet. So here's a quiet little reminder: you are loved."],
    ["Open for no reason","You don't need a reason to open this one. I don't need a reason to love you either."]
  ],

  reasons: [
    "Your smile can brighten even my darkest days.",
    "You understand me in a way no one else can.",
    "You're my peace in this chaotic world.",
    "Your love makes me want to become a better person.",
    "Every moment with you is precious.",
    "I'm happier simply knowing you're in my life.",
    "You're not just my love, you're my home.",
    "Even your smallest habits have become my favorite things.",
    "You make ordinary moments feel extraordinary.",
    "I can be completely myself around you.",
    "Your happiness genuinely matters to me.",
    "You make distance feel smaller.",
    "You somehow make my worst days softer.",
    "You're the person I want to tell everything to.",
    "I would still choose you, again and again.",
    "You make my heart feel understood.",
    "Your little reactions make ordinary conversations memorable.",
    "I love the way your presence changes the mood around me.",
    "You are one of the first people I want to tell good news to.",
    "Even missing you has become proof of how much you mean to me.",
    "You make me want to collect more little memories.",
    "Your voice can make a difficult day feel softer.",
    "You are beautiful in ways that have nothing to do with appearance.",
    "I love how you can be both my peace and my favorite chaos.",
    "You make me look forward to tomorrow.",
    "You are the person behind so many of my random smiles.",
    "I love the tiny details about you that other people might overlook.",
    "You make being myself feel easy.",
    "Because somewhere along the way, you became home to my heart.",
    "You make distance feel like a temporary problem, not a permanent wall.",
    "Your happiness is something I genuinely want to protect.",
    "I love the memories we already have and the ones we haven't made.",
    "You make me believe ordinary love can still feel extraordinary.",
    "If I had to choose again, I'd still look for Jiya."
  ],

  memories: [
    ["The Day We Met","The beginning of a story I didn't know I needed.",10,27],
    ["Our First Talk","One conversation that quietly changed everything.",23,48],
    ["That Smile","A moment I wish I could replay whenever I miss you.",38,22],
    ["Our Favorite Day","One ordinary day that became extraordinary.",52,57],
    ["Christmas Together","A memory wrapped in warmth.",67,27],
    ["New Year Promise","A new year, another reason to choose you.",78,50],
    ["Our Next Adventure","This star is waiting for a memory we haven't made yet.",91,30]
  ]
};