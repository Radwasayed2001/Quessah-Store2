
// Game state
let currentCategory = '';
let secretWord = '';
let outOfTopicPlayer = '';
let currentPlayerIndex = 0;
let questionPairs = [];
let currentQuestionIndex = 0;
let votes = {};
let scores = {};
let outOfTopicInput = 'sldkl;';
let timerId = null;
let preTimerId;
let total_score = 0;
let total_games = JSON.parse(localStorage.getItem("total_games")) || {};
// let total_games = JSON.parse(localStorage.getItem("total_games")) || {};
let games_count = document.getElementById("results-games-count");
games_count.innerHTML = Object.keys(JSON.parse(localStorage.getItem("total_games")) || {}).length;
// Category words mapping
const categoryWords = {
  food: ['كبسة', 'مندي', 'برياني', 'مقلوبة', 'محشي', 'فتوش', 'شاورما', 'سندويش', 'فلافل', 'حريرة', 'ملوخية', 'فتة', 'مسبحة', 'طاجن'],
  places: ['مكة', 'المدينة', 'جدة', 'الرياض', 'دبي', 'بيروت', 'القاهرة', 'حيفا', 'دمشق', 'القدس', 'العين', 'مسقط', 'الدوحة', 'طرابلس'],
  animals: ['أسد', 'نمر', 'فهد', 'ذئب', 'فيل', 'زرافة', 'دب', 'قطة', 'كلب', 'سنجاب', 'طائر', 'سمكة', 'فرس', 'ثعبان'],
  clothes: ['ثوب', 'بدلة سباحة', 'عباية', 'جلابية', 'قميص', 'بنطال', 'جاكيت', 'حذاء', 'قبعة', 'وشاح', 'حزام', 'قفازات', 'جراب', 'بنطلون جينز'],
  produce: ['تفاح', 'موز', 'برتقال', 'طماطم', 'خيار', 'جزر', 'بطاطا', 'بصل', 'ثوم', 'فلفل', 'باذنجان', 'خس', 'سبانخ', 'فراولة'],
  drinks: ['ماء', 'عصير', 'قهوة', 'شاي', 'لبن', 'مشروب غازي', 'عصير رمان', 'عصير تفاح', 'كولا', 'ليمونادة', 'سوبيا', 'شاي مثلج'],
  household: ['كرسي', 'طاولة', 'سرير', 'خزانة', 'مصباح', 'مروحة', 'تلفزيون', 'ثلاجة', 'فرن', 'ميكرويف', 'مقبس', 'سجادة'],
  vehicles: ['سيارة', 'دراجة', 'دراجة نارية', 'حافلة', 'قطار', 'طائرة', 'سفينة', 'ترام', 'مترو', 'تاكسي', 'شاحنة', 'قارب'],
  cities: ['القاهرة', 'جدة', 'دبي', 'باريس', 'لندن', 'ريو', 'نيويورك', 'طوكيو', 'مدريد', 'روما', 'سيدني', 'كييف'],
  cartoons: ['ميكي ماوس', 'توم', 'جيري', 'سبونج بوب', 'نينجا سلاريز', 'باور رينجرز', 'بوكيمون', 'دوغ', 'باغز باني', 'هالك'],
  games: ['شطرنج', 'مونوبولي', 'ليدو', 'دوكر', 'سوليتير', 'باك غامون', 'بلياردو', 'بوكر', 'جراند ثفت أوتو', 'فيفا'],
  jobs: ['طبيب', 'مهندس', 'معلم', 'محامي', 'شرطي', 'مزارع', 'فنّان', 'مبرمج', 'صحفي', 'طباخ', 'سائق', 'ممرضة']
};

// Initialize players array
let players = loadPlayers();

// Initialize the application
function initApp() {
games_count.innerHTML = Object.keys(JSON.parse(localStorage.getItem("total_games")) || {}).length;

  renderPlayerList(players);
  setupEventListeners(); 
  
}

document.addEventListener('DOMContentLoaded', initApp);

// Set up all event listeners
function setupEventListeners() {
  playerNameInput.addEventListener('input', () => {
    addPlayerButton.disabled = playerNameInput.value.trim() === '' || players.length >= MAX_PLAYERS;
  });
  addPlayerButton.addEventListener('click', addPlayer);
  
  // guessInput.addEventListener('keyup', (e) => {
  //   outOfTopicInput = e.target.value;
  //   console.log(outOfTopicInput)
  // }); 
  playerListElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-player')) removePlayer(parseInt(e.target.dataset.index));
  });
  startButton.addEventListener('click', () => { 
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
document.getElementById('nav-games').classList.add('active');
    renderGamesList(); showScreen('gamesScreen'); });
  backButton.addEventListener('click', () => showScreen('playerScreen'));
  gamesGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.game-card');
    // if (card && getComputedStyle(card).opacity === '1') {
    //   if (card.dataset.gameId === 'outOfTopic') showScreen('outOfTopicScreen');
    //   else if (card.dataset.gameId === 'mafia') showScreen('mafiaScreen');
    //   else if (card.dataset.gameId === 'phoneOnHead') showScreen('jawwalRulesScreen');
    //   else if (card.dataset.gameId === 'similarPictures') showScreen('similarPicturesScreen');
    //   else if (card.dataset.gameId === 'boxes') showScreen('boxesRulesScreen');
    //   else if (card.dataset.gameId === 'whoAmongUs') showScreen('whoRulesScreen');
    //   else if (card.dataset.gameId === 'fastest') showScreen('fastRulesScreen');
    //   else if (card.dataset.gameId === 'treasure') showScreen('treasureRulesScreen');
    //   else if (card.dataset.gameId === 'balance') showScreen('balanceSettingsScreen');
    //   else if (card.dataset.gameId === 'noSpeech') showScreen('charadesRulesScreen'); 
    //   else if (card.dataset.gameId === 'ghomza') showScreen('winkRulesScreen');
    //   else if (card.dataset.gameId === 'jassos') showScreen('spyRulesScreen');

    // }
  });
  
  submitGuessButton.addEventListener('click', calculateResults);
  document.getElementById('backToGamesButton').addEventListener('click', () => showScreen('gamesScreen'));
  document.getElementById('startGameButton').addEventListener('click', () => {
    if (players.length < 3 || players.length > 12) {
      showAlert('error', 'يتطلب من 3 إلى 12 لاعبين للعب! حالياً: ' + players.length);
      return;

    } 
    total_games["outoftopic"] = localStorage.getItem("total_games")?((JSON.parse(localStorage.getItem("total_games"))['outoftopic']||0)+1):1;

  console.log(total_games);
    localStorage.setItem("total_games", JSON.stringify(total_games));
    showScreen('categoryScreen');
  });
  document.querySelector('.category-grid').addEventListener('click', e => {
    // find the nearest ancestor (or self) that has the .category-card class
    const card = e.target.closest('.category-card');
    if (!card) return;                // click was outside any card
    currentCategory = card.dataset.category;
    startGame();
  });
document.getElementById('mafiaPlayerConfirmButton').addEventListener('click', showRole);
document.getElementById('mafiaPlayerVoteButton').addEventListener('click', showQuestion);
document.getElementById('mafiaPlayerVoteButtonMorning').addEventListener('click', showQuestionMorning);
  
  document.getElementById('playerConfirmButton').addEventListener('click', showSecretWord);
  // Note: reveal button now created dynamically in showSecretWord
  document.getElementById('secretConfirmButton').addEventListener('click', nextPlayer);
  document.getElementById('roleConfirmButton').addEventListener('click', nextMafiaPlayer);
  document.getElementById('roleConfirmButtonMorning').addEventListener('click', nextMafiaPlayerMorning);
  document.getElementById('nextQuestionButton').addEventListener('click', nextQuestion);
  document.getElementById('backToMenuButton').addEventListener('click', () => {
    resetGame();
    renderGamesList();
  showScreen('gamesScreen');
  });
}

/**
 * Add a new player
 */
/**
 * Add a new player and reload the app so every game picks up the change
 */
function addPlayer() {
  const name = playerNameInput.value.trim();
  const { isValid, error } = validatePlayerName(name, players);
  if (!isValid) {
    showAlert('error',error);
    return;
  }
  players.push(name);
  savePlayers(players);

  // تنظيف localStorage من كل المفاتيح سوى 'players'
  Object.keys(localStorage).forEach(key => {
    if (key !== 'players') {
      localStorage.removeItem(key);
    }
  });

  // إعادة الرسم وإعادة تحميل التطبيق
  renderPlayerList(players);
  clearPlayerInput();
  setTimeout(() => location.reload(), 0);
}
      
/**
 * Remove a player and reload the app so every game picks up the change
 */
function removePlayer(index) {
  players.splice(index, 1);
  savePlayers(players);

  // تنظيف localStorage من كل المفاتيح سوى 'players'
  Object.keys(localStorage).forEach(key => {
    if (key !== 'players') {
      localStorage.removeItem(key);
    }
  });

  renderPlayerList(players);
  setTimeout(() => location.reload(), 0);
}



/**
 * Start the OutOfTopic game flow
 */
function startGame() {
  
  currentPlayerIndex = 0;
  questionPairs = [];
  currentQuestionIndex = 0;
  votes = {};
  scores = {};
  const words = categoryWords[currentCategory];
  secretWord = words[Math.floor(Math.random() * words.length)];
  outOfTopicPlayer = players[Math.floor(Math.random() * players.length)];
  showWarningScreen();
}

/**
 * Warning screen for each player
 */
function showWarningScreen() {
  document.getElementById('playerConfirmButton').textContent = `أنا ${players[currentPlayerIndex]}`;
  showScreen('warningScreen');
}

/**
 * Secret word reveal screen
 */
function showSecretWord() {
  const player = players[currentPlayerIndex];
  const content = document.getElementById('secretContent');
  document.querySelector('#secretScreen .player-name').textContent = player;
  // If this player is the out-of-topic one, show outsider screen immediately
  if (player === outOfTopicPlayer) {
    content.innerHTML = '';
  const revealBtn = document.createElement('button');
  revealBtn.id = 'revealButton';
  revealBtn.className = 'btn btn-primary';
  revealBtn.textContent = 'هنا انقر';
  revealBtn.addEventListener('click', outOfTopicShown);
  content.appendChild(revealBtn);

    const confirmBtn = document.getElementById('secretConfirmButton');
    confirmBtn.textContent = 'موافق';
    confirmBtn.style.display = 'block';
    showScreen('secretScreen');
    return;
  }
  // Normal secret reveal flow for in-topic players
  
  content.innerHTML = '';
  const revealBtn = document.createElement('button');
  revealBtn.id = 'revealButton';
  revealBtn.className = 'btn btn-primary';
  revealBtn.textContent = 'هنا انقر';
  revealBtn.addEventListener('click', revealSecret);
  content.appendChild(revealBtn);

  document.getElementById('secretConfirmButton').style.display = 'none';
  showScreen('secretScreen');
}

/**
 * Reveal the actual secret word
 */
function revealSecret() {
  const content = document.getElementById('secretContent');
  content.innerHTML = `
    <h3 class="secret-word">${secretWord}</h3>
    <p class="secret-instruction">حاول أن توضح للمجموعة أنك تعرف الموضوع بدون كشفه حتى لا يعرف اللاعب برا السالفة</p>
  `;
  document.getElementById('secretConfirmButton').style.display = 'block';
}

function outOfTopicShown() {
  const content = document.getElementById('secretContent');
  content.innerHTML = `
    <h3 class="secret-word">أنت برا السالفة</h3>
    <p class="secret-instruction">مهمتك أن توضح للمجموعة أنك تعرف الموضوع بالإجابة بشكل عام وإيهام المجموعة أنك تعرف الموضوع</p>
  `;
  document.getElementById('secretConfirmButton').style.display = 'block';
}

/**
 * Proceed to next player or questions
 */
function nextPlayer() {
  currentPlayerIndex++;
  if (currentPlayerIndex < players.length) {
    showWarningScreen();
  } else {
    startQuestionsRound();
  }
}

/**
 * Start the questions round
 */
function startQuestionsRound() {
  questionPairs = [];

  // Create a shallow copy of players and shuffle it
  const shuffledAskers = [...players].sort(() => Math.random() - 0.5);
  const shuffledTargets = [...players];

  // Shuffle targets until there's no player matched with themselves
  let attempts = 0;
  do {
    shuffledTargets.sort(() => Math.random() - 0.5);
    attempts++;
  } while (
    shuffledAskers.some((player, idx) => player === shuffledTargets[idx]) && attempts < 100
  );

  for (let i = 0; i < players.length; i++) {
    questionPairs.push({
      asker: shuffledAskers[i],
      target: shuffledTargets[i]
    });
  }
  currentQuestionIndex = 0;
  updateCurrentQuestion();
  showScreen('questionsScreen');
}


/**
 * Update displayed question
 */
function updateCurrentQuestion() {
  const para = document.getElementById('currentQuestion');
  const pair = questionPairs[currentQuestionIndex];
  para.textContent = `${pair.asker} تسأل ${pair.target}`;
}

/**
 * Handle next question or proceed to voting
 */
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionPairs.length) {
    updateCurrentQuestion();
  } else {
    startVotingRound();
  }
}

/**
 * Voting round setup
 */
/**
 * Voting round setup
 */
function startVotingRound() {
  const area = document.getElementById('votingArea');
  area.innerHTML = '';
  players.forEach(voter => {
    const div = document.createElement('div'); div.className = 'voting-section';
    const h3 = document.createElement('h3'); h3.textContent = `${voter} يصوت على:`;
    const btns = document.createElement('div'); btns.className = 'voting-buttons';
    players.filter(x => x !== voter).forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'btn btn-secondary';
      btn.onclick = () => submitVote(voter, opt);
      btns.appendChild(btn);
    });
    div.append(h3, btns);
    area.appendChild(div);
  });
  showScreen('votingScreen');
}

/**
 * Record a vote
 */
function submitVote(voter, candidate) {
  votes[voter] = candidate;
  // disable buttons for this voter
  document.querySelectorAll('.voting-section').forEach(sec => {
    if (sec.querySelector('h3').textContent.startsWith(voter)) {
      sec.querySelectorAll('button').forEach(b => b.disabled = true);
    }
  });

  // If all votes in, prepare guess screen data
  if (Object.keys(votes).length === players.length) {
    // select 3 random wrong options from categoryWords
    const options = categoryWords[currentCategory].filter(w => w !== secretWord);
    const randomWrong = [];
    while (randomWrong.length < 3 && options.length) {
      const idx = Math.floor(Math.random() * options.length);
      randomWrong.push(options.splice(idx, 1)[0]);
    }
    // combine and shuffle
    const guessItems = [...randomWrong, secretWord]
      .sort(() => 0.5 - Math.random());
    // store for guess screen
    window._guessOptions = guessItems;
    const area = document.getElementById('guessWord');
  area.innerHTML = '';
    const div = document.createElement('div'); div.className = 'voting-section';
    const h3 = document.createElement('h3'); h3.textContent = `${outOfTopicPlayer} الكلمة السرية هي :`;
    const btns = document.createElement('div'); btns.className = 'voting-buttons';
    guessItems.filter(x => x !== voter).forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'btn btn-secondary';
      btn.onclick = () => submitVote(voter, opt);
      btn.onclick = () => calculateResults(opt);
      btns.appendChild(btn);
  
    div.append(h3, btns);
    area.appendChild(div);
  });
    showScreen('guessScreen');
  }
}

/**
 * Calculate and show results
 */function calculateResults(choosenWord) {
  // 1. حساب النقاط لكل لاعب وفقًا لقواعد اللعبة
  players.forEach(p => scores[p] = localStorage.getItem(p)*1);
  let outVotes = 0;
  Object.entries(votes).forEach(([voter, vote]) => {
    if (vote === outOfTopicPlayer) {
      scores[voter] += 25*1;
      outVotes++;
    }
  });
  // مكافأة 100 نقطة إذا اكتشف الأغلبية الخارج
  if (outVotes > players.length / 2) {
    players
      .filter(p => p !== outOfTopicPlayer)
      .forEach(p => scores[p] += 100);
  }
  // الآن حساب نقاط الخارج حسب اختياره للكلمة
  if (secretWord === choosenWord && outVotes < players.length / 2) {
    // نجا الخارج
    scores[outOfTopicPlayer] += 125;
  } else if (secretWord === choosenWord && outVotes >= players.length / 2) {
    // انكشف الخارج
    scores[outOfTopicPlayer] += 75;
  }
  
  // 2. عرض النتائج على الشاشة
  const resArea = document.getElementById('resultsArea');
  resArea.innerHTML = `
    <h2>برا السالفة: ${outOfTopicPlayer}</h2>
    <h3>الكلمة السرية: ${secretWord}</h3>
    <div class="scores">
      ${players
        .slice() // لعدم تغيير ترتيب المصفوفة الأصلية
        .sort((a, b) => scores[b] - scores[a])
        .map(p => `
          <div class="score-row"><span>${p}</span><span>${scores[p]} نقطة</span></div>
        `).join('')}
    </div>
  `;
  
  // 3. تخزين نتائج الجميع في localStorage
  players.forEach(p => {
    // نحفظ تحت مفتاح هو اسم اللاعب، والقيمة هي نقاطه في هذه الجولة
    localStorage.setItem(p, scores[p]);
  });

  // 4. الانتقال لصفحة النتائج
  total_score = 0;
  loadPlayers().forEach(element => {
    score = localStorage.getItem(element)||0;
    total_score+=score*1;
  });
  document.getElementById('results-total-score').innerHTML = total_score;
  showScreen('resultsScreen');
}
function loadStoredResults() {
  // 1. نجمع النقاط المخزنة لكل لاعب في مصفوفة
  const storedResults = players.map(p => ({
    name: p,
    score: Number(localStorage.getItem(p) || 0)
  }));

  // 2. نرتبها تنازليًا حسب النقاط
  storedResults.sort((a, b) => b.score - a.score);

  // 3. نبني الـ HTML لكل صف
  total_score = 0;
  storedResults.map(({ name, score })=>{
    total_score += score;
    document.getElementById('results-total-score').innerHTML = total_score;

  })
  const rowsHTML = storedResults.map(({ name, score }, index) => `
    <div class="score-row">
      <p class="player-id">${index}</p>
      <p class="player-name">${name}</p>
      <p class="player-score">${score} نقطة</p>
    </div>
  `).join('');
  

  // 4. ندخلها داخل العنصر
  const resArea = document.getElementById('resultsArea');
  resArea.innerHTML = `
    
    <div class="scores">
    <div class="score-row">
      <p class="font-bold text-[#303590] text-xl player-id flex gap-2">
      <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.30029 1.75C4.84851 1.75 2.05029 4.54822 2.05029 8C2.05029 11.4518 4.84851 14.25 8.30029 14.25C11.7521 14.25 14.5503 11.4518 14.5503 8C14.5503 4.54822 11.7521 1.75 8.30029 1.75ZM0.550293 8C0.550293 3.71979 4.02009 0.25 8.30029 0.25C12.5805 0.25 16.0503 3.71979 16.0503 8C16.0503 10.2254 15.1123 12.2317 13.6101 13.6452C13.6362 13.6939 13.6573 13.7462 13.6725 13.8017L14.322 16.1709C14.6255 17.2776 14.8699 18.169 14.981 18.8607C15.09 19.5387 15.1123 20.2371 14.7329 20.8048C14.5169 21.128 14.2236 21.3927 13.8769 21.5692C13.2471 21.8899 12.5602 21.7318 11.9449 21.4995C11.3173 21.2625 10.5291 20.8518 9.56103 20.3474L9.51439 20.3231C8.79015 19.9457 8.60106 19.861 8.4194 19.8417C8.34018 19.8332 8.26041 19.8332 8.18119 19.8417C7.99953 19.861 7.81044 19.9457 7.0862 20.3231L7.03957 20.3474C6.07151 20.8518 5.28333 21.2625 4.65569 21.4995C4.04036 21.7318 3.35349 21.8899 2.72371 21.5692C2.37703 21.3927 2.08371 21.128 1.8677 20.8048C1.48829 20.2371 1.51061 19.5387 1.61956 18.8607C1.73072 18.169 1.97512 17.2776 2.27856 16.1709L2.9281 13.8017C2.94331 13.7462 2.96438 13.6939 2.99045 13.6452C1.48827 12.2317 0.550293 10.2254 0.550293 8ZM4.26045 14.6151L3.73784 16.5213C3.4188 17.685 3.1972 18.4973 3.10055 19.0987C3.00014 19.7235 3.07499 19.9117 3.11483 19.9713C3.19268 20.0878 3.29356 20.1761 3.40432 20.2325C3.42716 20.2441 3.57044 20.3058 4.12593 20.0961C4.65906 19.8949 5.36714 19.5274 6.39305 18.9928C6.42794 18.9747 6.4624 18.9567 6.49645 18.9389C7.06454 18.6421 7.52141 18.4035 8.02225 18.3501C8.20713 18.3304 8.39345 18.3304 8.57834 18.3501C9.07918 18.4035 9.53605 18.6421 10.1041 18.9389C10.1382 18.9567 10.1726 18.9747 10.2075 18.9928C11.2334 19.5274 11.9415 19.8949 12.4747 20.0961C13.0301 20.3058 13.1734 20.2441 13.1963 20.2325C13.307 20.1761 13.4079 20.0878 13.4858 19.9713C13.5256 19.9117 13.6004 19.7235 13.5 19.0987C13.4034 18.4973 13.1818 17.685 12.8627 16.5213L12.3401 14.6151C11.1638 15.335 9.78049 15.75 8.30029 15.75C6.82009 15.75 5.43682 15.335 4.26045 14.6151ZM8.30029 6.03449C8.24216 6.13513 8.17751 6.25103 8.10133 6.38769L8.00302 6.56405C7.99608 6.5765 7.98865 6.59009 7.98069 6.60466C7.90216 6.74827 7.77211 6.9861 7.55526 7.15071C7.33388 7.31877 7.06759 7.37659 6.91188 7.4104C6.89628 7.41379 6.88179 7.41693 6.86857 7.41992L6.67766 7.46312C6.50249 7.50275 6.3598 7.53509 6.23779 7.56575C6.31715 7.66345 6.42024 7.78474 6.55432 7.94154L6.68447 8.09372C6.6937 8.10452 6.70374 8.11609 6.71444 8.12841C6.82237 8.25273 6.99663 8.45346 7.07722 8.71261C7.15686 8.96869 7.12939 9.23243 7.11206 9.39882C7.11033 9.41542 7.1087 9.43105 7.10729 9.4456L7.08762 9.64866C7.06937 9.83692 7.05519 9.98718 7.04575 10.1094C7.14995 10.0635 7.26849 10.0089 7.40932 9.9441L7.58807 9.8618C7.60037 9.85613 7.61386 9.84977 7.62843 9.84289C7.77194 9.77521 8.02162 9.65746 8.30029 9.65746C8.57896 9.65746 8.82865 9.77521 8.97215 9.8429C8.98673 9.84977 9.00021 9.85613 9.01252 9.86179L9.19127 9.9441C9.3321 10.0089 9.45063 10.0635 9.55484 10.1094C9.5454 9.98718 9.53121 9.83692 9.51297 9.64866L9.49329 9.4456C9.49188 9.43105 9.49026 9.41542 9.48853 9.39882C9.4712 9.23244 9.44373 8.96869 9.52336 8.71261C9.60395 8.45346 9.77822 8.25273 9.88615 8.12841C9.89684 8.11609 9.90688 8.10452 9.91612 8.09372L10.0463 7.94153C10.1803 7.78474 10.2834 7.66345 10.3628 7.56575C10.2408 7.53509 10.0981 7.50275 9.92292 7.46312L9.73202 7.41992C9.71879 7.41693 9.7043 7.41379 9.68871 7.4104C9.53299 7.37659 9.2667 7.31877 9.04533 7.15071C8.82848 6.9861 8.69843 6.74827 8.6199 6.60466C8.61194 6.59009 8.6045 6.5765 8.59756 6.56405L8.49925 6.38769C8.42307 6.25103 8.35843 6.13513 8.30029 6.03449ZM7.31379 4.79963C7.48596 4.57481 7.79859 4.25 8.30029 4.25C8.80199 4.25 9.11463 4.57481 9.2868 4.79963C9.45112 5.01421 9.61661 5.31124 9.78627 5.61577C9.79398 5.62961 9.80171 5.64347 9.80944 5.65734L9.90775 5.83369C9.93054 5.87459 9.9485 5.90677 9.9642 5.9343C9.99152 5.94071 10.0233 5.94792 10.063 5.95691L10.2539 6.0001C10.2696 6.00364 10.2852 6.00717 10.3008 6.0107C10.6287 6.08478 10.9544 6.15839 11.2045 6.25695C11.4807 6.36577 11.855 6.5777 11.9992 7.04161C12.141 7.49734 11.9621 7.88336 11.8059 8.13146C11.6614 8.36108 11.4417 8.61786 11.2168 8.88074C11.2066 8.89262 11.1964 8.90452 11.1863 8.91642L11.0561 9.06861C11.0216 9.10894 10.9956 9.13935 10.9737 9.16566C10.9767 9.202 10.9808 9.24432 10.9863 9.30093L11.006 9.50398C11.0075 9.51947 11.009 9.53494 11.0105 9.55039C11.0447 9.90232 11.0777 10.2424 11.0656 10.5145C11.0529 10.7997 10.9844 11.2315 10.5972 11.5254C10.1978 11.8286 9.75672 11.7626 9.477 11.6824C9.21925 11.6086 8.91472 11.4682 8.608 11.3269C8.59331 11.3201 8.57861 11.3134 8.56392 11.3066L8.38517 11.2243C8.35173 11.2089 8.32424 11.1963 8.30029 11.1854C8.27634 11.1963 8.24886 11.2089 8.21541 11.2243L8.03667 11.3066C8.02197 11.3134 8.00728 11.3201 7.99259 11.3269C7.68586 11.4682 7.38133 11.6086 7.12359 11.6824C6.84387 11.7626 6.40276 11.8286 6.00335 11.5254C5.61619 11.2315 5.54773 10.7997 5.53502 10.5145C5.5229 10.2424 5.55593 9.90232 5.5901 9.55039C5.5916 9.53494 5.59311 9.51947 5.59461 9.50398L5.61428 9.30093C5.61977 9.24433 5.62385 9.202 5.62684 9.16566C5.60494 9.13935 5.57896 9.10894 5.54447 9.06861L5.41432 8.91642C5.40414 8.90452 5.39397 8.89262 5.3838 8.88074C5.15889 8.61786 4.9392 8.36108 4.79465 8.13146C4.63847 7.88336 4.45963 7.49734 4.60135 7.04161C4.74561 6.5777 5.11991 6.36577 5.39606 6.25695C5.64614 6.15839 5.97193 6.08478 6.29975 6.0107C6.31538 6.00717 6.33101 6.00364 6.34664 6.0001L6.53755 5.95691C6.57728 5.94792 6.60906 5.94071 6.63639 5.9343C6.65209 5.90677 6.67004 5.87459 6.69284 5.83369L6.79115 5.65734C6.79888 5.64347 6.8066 5.62961 6.81431 5.61577C6.98398 5.31124 7.14946 5.01421 7.31379 4.79963Z" fill="#303590"/>
</svg>

      المركز</p>
      <p class="font-bold text-[#303590] text-xl player-name flex gap-2">
      <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.40039 0.25C5.77704 0.25 3.65039 2.37665 3.65039 5C3.65039 7.62335 5.77704 9.75 8.40039 9.75C11.0237 9.75 13.1504 7.62335 13.1504 5C13.1504 2.37665 11.0237 0.25 8.40039 0.25ZM5.15039 5C5.15039 3.20507 6.60546 1.75 8.40039 1.75C10.1953 1.75 11.6504 3.20507 11.6504 5C11.6504 6.79493 10.1953 8.25 8.40039 8.25C6.60546 8.25 5.15039 6.79493 5.15039 5Z" fill="#303590"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.40039 11.25C6.36106 11.25 4.47791 11.7208 3.07854 12.5204C1.70039 13.3079 0.650391 14.5101 0.650391 16C0.650391 17.4899 1.70039 18.6921 3.07854 19.4796C4.47791 20.2792 6.36106 20.75 8.40039 20.75C10.4397 20.75 12.3229 20.2792 13.7222 19.4796C15.1004 18.6921 16.1504 17.4899 16.1504 16C16.1504 14.5101 15.1004 13.3079 13.7222 12.5204C12.3229 11.7208 10.4397 11.25 8.40039 11.25ZM2.15039 16C2.15039 15.2807 2.6674 14.483 3.82275 13.8228C4.95688 13.1747 6.57373 12.75 8.40039 12.75C10.227 12.75 11.8439 13.1747 12.978 13.8228C14.1334 14.483 14.6504 15.2807 14.6504 16C14.6504 16.7193 14.1334 17.517 12.978 18.1772C11.8439 18.8253 10.227 19.25 8.40039 19.25C6.57373 19.25 4.95688 18.8253 3.82275 18.1772C2.6674 17.517 2.15039 16.7193 2.15039 16Z" fill="#303590"/>
</svg>
اللاعب
      </p>
      <p class="font-bold text-[#303590] text-xl player-score flex gap-2">
      <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.6225 2.07172C9.2483 2.42702 8.79441 3.00091 8.12111 3.85688L7.78078 4.28955C7.75835 4.31806 7.7361 4.34645 7.71398 4.37469C7.40866 4.76436 7.12689 5.12398 6.73102 5.3352C6.3286 5.54991 5.87767 5.57489 5.40291 5.60119C5.36855 5.6031 5.33406 5.60501 5.29946 5.607L4.77204 5.63733C3.72624 5.69747 3.0325 5.73958 2.54894 5.84405C2.083 5.94471 2.01308 6.06188 1.98321 6.12204C1.94765 6.19365 1.8993 6.34499 2.09431 6.8194C2.2929 7.30254 2.66165 7.92961 3.21246 8.86067L3.49101 9.33152C3.5085 9.36109 3.52592 9.39042 3.54322 9.41956C3.79783 9.84834 4.02698 10.2343 4.08727 10.6839C4.14708 11.1299 4.03084 11.5668 3.89985 12.0591C3.89094 12.0926 3.88197 12.1263 3.87298 12.1603L3.73004 12.7009C3.44771 13.7686 3.25843 14.4914 3.1948 15.0213C3.13114 15.5513 3.22346 15.6702 3.26031 15.7099C3.26084 15.7105 3.2614 15.7111 3.262 15.7118C3.28634 15.7384 3.36757 15.8274 3.83416 15.7735C4.28227 15.7218 4.88538 15.5632 5.76266 15.3215C5.47782 15.0843 5.23086 14.8647 5.03843 14.6581C4.69846 14.293 4.37604 13.809 4.46511 13.1838C4.55485 12.5539 5.0042 12.1833 5.43577 11.9349C5.84926 11.697 6.4244 11.4718 7.08624 11.2127L7.50753 11.0477C7.71982 10.9645 7.83804 10.9176 7.92364 10.8759C7.97216 10.8522 7.99159 10.8388 7.99733 10.8342C8.00175 10.8284 8.01476 10.8089 8.0374 10.7605C8.07762 10.6745 8.12242 10.5559 8.20192 10.3426L8.35971 9.91917C8.60736 9.25447 8.82272 8.67648 9.05377 8.25952C9.29536 7.82353 9.65858 7.36965 10.2862 7.26903C10.9088 7.16922 11.3985 7.48067 11.7709 7.81348C12.1296 8.13406 12.5289 8.61186 12.9906 9.16431L13.2827 9.51389C13.4302 9.6904 13.5139 9.78961 13.5822 9.8594C13.6128 9.89064 13.6315 9.90661 13.6419 9.9147C13.6468 9.91854 13.6498 9.92056 13.6512 9.92144L13.6538 9.92295L13.6564 9.92408C13.6579 9.92463 13.6612 9.9258 13.667 9.92742C13.6794 9.93082 13.7029 9.93616 13.7458 9.94192C13.8417 9.95481 13.9702 9.96231 14.1989 9.97469L14.6522 9.99922C14.8664 10.0108 15.072 10.0219 15.2676 10.0344C15.7371 9.62109 16.0501 9.31721 16.2456 9.06186C16.4549 8.78846 16.4571 8.66485 16.4475 8.59304C16.4379 8.52186 16.4058 8.38525 15.9967 8.13515C15.5724 7.87577 14.9295 7.60585 13.9603 7.20255L13.4714 6.9991C13.4395 6.98583 13.4078 6.97268 13.3761 6.95958C12.9349 6.77703 12.5183 6.60467 12.2083 6.27006C11.9036 5.94112 11.7533 5.5101 11.5892 5.03968C11.5775 5.00589 11.5656 4.9719 11.5536 4.93773L11.3706 4.41591C11.0086 3.38394 10.7632 2.69006 10.5229 2.22927C10.2869 1.77679 10.1604 1.75674 10.1366 1.75297C10.136 1.75288 10.1355 1.7528 10.1351 1.75273C10.1346 1.75265 10.1341 1.75255 10.1335 1.75243C10.1112 1.74823 9.98776 1.72492 9.6225 2.07172ZM17.092 10.3737C17.2205 10.2381 17.336 10.1051 17.4366 9.9737C17.7799 9.52529 18.0165 9.00755 17.9341 8.39369C17.8359 7.6612 17.3418 7.19937 16.7791 6.85536C16.2432 6.52776 15.49 6.21439 14.5952 5.84205L14.0477 5.61422C13.45 5.36547 13.3676 5.31424 13.3087 5.25064C13.2441 5.181 13.1923 5.07764 12.9691 4.44126L12.7658 3.86168C12.4294 2.90238 12.1494 2.10416 11.8529 1.53563C11.5516 0.957968 11.1236 0.399513 10.387 0.274025C9.64811 0.148172 9.0612 0.536234 8.58968 0.98394C8.12649 1.42373 7.60551 2.0861 6.98031 2.88098L6.6018 3.36217C6.18603 3.89075 6.10552 3.96878 6.02491 4.01179C5.95129 4.05107 5.8593 4.07233 5.21334 4.10947L4.68592 4.1398C4.66459 4.14103 4.64333 4.14225 4.62214 4.14347C3.65728 4.1989 2.84439 4.24561 2.23219 4.37787C1.58892 4.51684 0.969397 4.79101 0.639724 5.45492C0.315737 6.10738 0.453487 6.77308 0.706938 7.38968C0.951944 7.98573 1.37856 8.70681 1.89086 9.5727L2.20001 10.0953C2.53704 10.665 2.58601 10.7746 2.60058 10.8832C2.61565 10.9957 2.59558 11.1235 2.42282 11.7769L2.2648 12.3745C2.00137 13.3706 1.78316 14.1958 1.7055 14.8424C1.62639 15.5012 1.6629 16.1928 2.15995 16.7294C2.67156 17.2816 3.36017 17.3382 4.00614 17.2636C4.62647 17.192 5.41573 16.9738 6.35305 16.7147L6.48145 16.6792L7.07905 16.3888C7.09452 16.4025 7.10866 16.4153 7.1218 16.4276C7.15367 16.4576 7.17 16.4759 7.17825 16.4861C7.18218 16.4909 7.18421 16.4939 7.18509 16.4952L7.18651 16.4975L7.18753 16.4998C7.18806 16.5011 7.18926 16.5042 7.19095 16.5099C7.19451 16.5219 7.20024 16.5451 7.20676 16.5875C7.22139 16.6828 7.23122 16.8105 7.24779 17.0385L7.28062 17.4905C7.33232 18.2028 7.37715 18.8204 7.48167 19.2883C7.59086 19.7773 7.80878 20.3113 8.37107 20.5937C8.93539 20.8771 9.49351 20.73 9.94887 20.5222C10.3833 20.3239 10.9 19.9874 11.4944 19.6003L11.8727 19.354C12.0633 19.2299 12.1699 19.1612 12.2535 19.1159C12.2907 19.0958 12.3119 19.0867 12.3227 19.0827C12.3278 19.0807 12.3306 19.08 12.3315 19.0797L12.3325 19.0795L12.3338 19.0794C12.335 19.0793 12.3381 19.0792 12.344 19.0794C12.3564 19.0799 12.3803 19.0819 12.423 19.0895C12.5185 19.1064 12.6437 19.1384 12.8659 19.1962L13.3064 19.3109C14.0012 19.4917 14.6028 19.6482 15.0796 19.7C15.5742 19.7537 16.1572 19.722 16.6026 19.2695C17.0486 18.8165 17.07 18.2327 17.0071 17.7394C16.9465 17.2644 16.7785 16.6668 16.5848 15.9774L16.4618 15.5398C16.3998 15.3191 16.3656 15.1951 16.3469 15.1003C16.3386 15.0581 16.3361 15.0345 16.3355 15.0224C16.3351 15.0167 16.3352 15.0137 16.3352 15.0128C16.3352 15.0127 16.3353 15.0118 16.3354 15.0115C16.3356 15.0108 16.3363 15.0081 16.3381 15.0031C16.3418 14.9924 16.3504 14.9713 16.3699 14.9339C16.4137 14.8498 16.4806 14.7424 16.6016 14.5499L16.8417 14.1679C17.2187 13.5682 17.5466 13.0465 17.7376 12.6094C17.9377 12.1511 18.0757 11.5898 17.7805 11.0303C17.6128 10.7125 17.3651 10.5087 17.092 10.3737ZM10.5021 8.74934C10.5018 8.74868 10.5055 8.7486 10.5137 8.75106C10.5064 8.75124 10.5023 8.75 10.5021 8.74934ZM10.5263 8.75556C10.5615 8.76981 10.6377 8.81245 10.7714 8.93196C11.0382 9.1704 11.3672 9.56101 11.8765 10.1704L12.1318 10.4758C12.1499 10.4975 12.168 10.5193 12.1863 10.5413C12.4091 10.8095 12.647 11.0959 12.9807 11.2634C13.315 11.4313 13.6865 11.4503 14.0332 11.4681C14.0616 11.4695 14.0899 11.471 14.1179 11.4725L14.5135 11.4939C15.303 11.5366 15.8096 11.566 16.1584 11.6369C16.3248 11.6708 16.4065 11.7055 16.443 11.7266C16.4457 11.7281 16.4481 11.7296 16.4501 11.7309C16.45 11.732 16.45 11.7332 16.4498 11.7345C16.4467 11.7727 16.4297 11.8562 16.3629 12.009C16.2228 12.33 15.9579 12.7552 15.5405 13.4193L15.3316 13.7516C15.3167 13.7753 15.3016 13.7992 15.2864 13.8233C15.103 14.1129 14.9032 14.4286 14.8503 14.8004C14.7975 15.1706 14.8998 15.5304 14.9944 15.8631C15.0023 15.8908 15.0101 15.9183 15.0177 15.9455L15.1249 16.3271C15.339 17.0889 15.4743 17.578 15.5191 17.9293C15.5396 18.0893 15.5344 18.1728 15.5275 18.2118C15.4886 18.2195 15.4043 18.2265 15.2416 18.2088C14.8882 18.1704 14.3952 18.0442 13.628 17.8446L13.2436 17.7446C13.2162 17.7374 13.1885 17.7302 13.1607 17.7228C12.8252 17.6345 12.4639 17.5393 12.095 17.5984C11.7243 17.6578 11.4123 17.8624 11.125 18.0507C11.1012 18.0663 11.0776 18.0817 11.0542 18.097L10.7249 18.3114C10.067 18.7398 9.6455 19.0118 9.32608 19.1576C9.17393 19.227 9.09009 19.2457 9.05107 19.2496C9.04881 19.2498 9.04679 19.25 9.045 19.2501C9.04358 19.248 9.04195 19.2455 9.04013 19.2425C9.01863 19.2069 8.98247 19.1265 8.9456 18.9614C8.8683 18.6153 8.82966 18.1109 8.77248 17.324L8.74384 16.9298C8.74181 16.9019 8.73985 16.8737 8.73788 16.8454C8.71382 16.5 8.68796 16.1288 8.51319 15.7975C8.33903 15.4675 8.04763 15.2353 7.77492 15.018C7.75252 15.0002 7.73025 14.9824 7.70818 14.9647L7.39745 14.7157C6.77746 14.2187 6.37997 13.8976 6.13616 13.6358C6.01693 13.5078 5.97224 13.4334 5.95647 13.3979C5.98191 13.3697 6.04387 13.3156 6.18386 13.2351C6.48789 13.0602 6.9554 12.8749 7.68789 12.588L8.05456 12.4444C8.08082 12.4341 8.10735 12.4238 8.13408 12.4134C8.45412 12.2892 8.80328 12.1538 9.06635 11.8865C9.32964 11.619 9.45927 11.2678 9.57792 10.9463C9.58783 10.9194 9.59766 10.8928 9.60749 10.8664L9.74476 10.498C10.019 9.7621 10.1961 9.29273 10.3658 8.98655C10.4453 8.84302 10.4989 8.7806 10.5263 8.75556ZM5.94887 13.3722C5.94952 13.3724 5.95087 13.3765 5.95094 13.3838C5.94824 13.3756 5.94821 13.372 5.94887 13.3722ZM5.9469 13.4094C5.94437 13.4171 5.9415 13.4209 5.9407 13.4209C5.93991 13.4209 5.94117 13.4171 5.9469 13.4094ZM15.5184 18.2409C15.518 18.2403 15.5193 18.2359 15.5235 18.2295C15.521 18.2382 15.5189 18.2414 15.5184 18.2409ZM15.5452 18.2074C15.5514 18.203 15.5557 18.2017 15.5563 18.2021C15.5568 18.2025 15.5537 18.2047 15.5452 18.2074ZM10.5364 8.74704C10.5441 8.74117 10.5479 8.73987 10.5479 8.74069C10.5479 8.7415 10.5441 8.74445 10.5364 8.74704Z" fill="#303590"/>
</svg>

      النقاط
      </p>
    </div>
      ${rowsHTML}
    </div>
  `;
  total_score = 0;
  loadPlayers().forEach(element => {
    score = localStorage.getItem(element)||0;
    total_score+=score*1;
  });
  document.getElementById('results-total-score').innerHTML = total_score;
  showScreen('resultsScreen');
}
/**
 * Reset game state
 */
function resetGame() {
  currentCategory = '';
  secretWord = '';
  outOfTopicPlayer = '';
  currentPlayerIndex = 0;
  questionPairs = [];
  currentQuestionIndex = 0;
  votes = {};
  scores = {};
}
// في app.js أو ui.js
document.getElementById('nav-players').addEventListener('click', () => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
document.getElementById('nav-players').classList.add('active');
  clearAllTimersSim();
  clearBoxAllTimers();
  clearInterval(timerIntervalT);
  clearTimersJ();
  clearInterval(countdownId);
  clearInterval(timerId);
  clearInterval(preTimerId);
  showScreen('playerScreen');
});
document.getElementById('nav-games').addEventListener('click', () => {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
document.getElementById('nav-games').classList.add('active');
  renderGamesList();
  clearAllTimersSim();
  clearBoxAllTimers();
  clearInterval(timerIntervalT);
  clearTimersJ();
  clearInterval(countdownId);
  clearInterval(timerId);
  clearInterval(preTimerId);
  showScreen('gamesScreen');
});

document.getElementById('nav-results').addEventListener('click', () => {
  games_count.innerHTML = Object.keys(JSON.parse(localStorage.getItem("total_games")) || {}).length;
  document.getElementById('results-total-score').innerHTML = total_score;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
document.getElementById('nav-results').classList.add('active');
  clearAllTimersSim();
  clearBoxAllTimers() ;
  clearInterval(timerIntervalT);
  clearTimersJ();
  clearInterval(countdownId);
  clearInterval(timerId);
  clearInterval(preTimerId);
  loadStoredResults()
});

// دالة مساعدة لإظهار الشاشة المطلوبة
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(sec => {
    sec.classList.toggle('active', sec.id === screenId);
  });
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: makes the scroll smooth
  });
}
function showAlert(type, message, duration = 4000) {
  const icons = {
    success: '✅',
    info:    'ℹ️',
    warning: '⚠️',
    error:   '❌'
  };
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <span class="icon">${icons[type]}</span>
    <div class="message">${message}</div>
    <button class="close-btn">&times;</button>
  `;
  const container = document.getElementById('alertContainer');
  container.append(alert);

  // Close on click:
  alert.querySelector('.close-btn').onclick = () => dismiss(alert);

  // Auto dismiss:
  setTimeout(() => dismiss(alert), duration);
}

function dismiss(el) {
  el.classList.add('exit');
  el.addEventListener('animationend', () => el.remove());
}
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // إزالة الصنف active من الكل
    document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
    // تفعيل المحدد
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

