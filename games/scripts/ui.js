
const playerScreen = document.getElementById('playerScreen');
const gamesScreen = document.getElementById('gamesScreen');
const playerNameInput = document.getElementById('playerName');
const addPlayerButton = document.getElementById('addPlayer');
const noPlayer = document.getElementById('noPlayer');
const playerCountElement = document.getElementById('playerCount');
const playerListElement = document.getElementById('playerList');
const startButton = document.getElementById('startButton');
const backButton = document.getElementById('backButton');
const gamesGrid = document.querySelector('.games-grid');
// const guessInput = document.getElementById("guessInput");
const submitGuessButton = document.getElementById("submitGuessButton");
/**
 * Switch between screens
 * @param {string} screenId - The ID of the screen to show
 */
const overlay   = document.getElementById('modalOverlay');
  const modal     = document.getElementById('balanceRulesScreen');
  const closeBtn  = modal.querySelector('.modal-close-btn');
  const backBtn   = document.getElementById('backToGamesBtnBalance');
  const startBtn  = document.getElementById('startBalanceBtn');

  function openModal() {
    overlay.classList.add('active');
    modal.classList.add('active');
  }
  function closeModal() {
    overlay.classList.remove('active');
    modal.classList.remove('active');
  }

  // مستمعات الإغلاق
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  backBtn.addEventListener('click', closeModal);
  startBtn.addEventListener('click', closeModal);
  const simModal      = document.getElementById('similarPicturesScreen');
  const simCloseBtn   = simModal.querySelector('.modal-close-btn');
  const startSimBtn   = document.getElementById('startSimilarBtn');

  function openSimModal() {
    overlay.classList.add('active');
    simModal.classList.add('active');
  }
  function closeSimModal() {
    overlay.classList.remove('active');
    simModal.classList.remove('active');
  }

  // استمع للنقر على × أو خلفية الـ overlay أو زر العودة
  simCloseBtn.addEventListener('click', closeSimModal);
  overlay.addEventListener('click', closeSimModal);

  // زر “العودة للقائمة”:
  window.closeSimilarModal = closeSimModal;

  // زر بدء اللعبة: أولاً يغلق المودال ثم يشغّل منطق اللعبة
  startSimBtn.addEventListener('click', () => {
    closeSimModal();
    runPicGame();    // أو أي دالة تُطلق اللعبة
  });
  const mafiaModal     = document.getElementById('mafiaScreen');
const closeMafiaBtn  = mafiaModal.querySelector('.modal-close-btn');
// const showMafiaBtn   = document.getElementById('showMafiaRulesBtn');

// 2) دوال الفتح والإغلاق
function openMafiaModal() {
  overlay.classList.add('active');
  mafiaModal.classList.add('active');
}
function closeMafiaModal() {
  overlay.classList.remove('active');
  mafiaModal.classList.remove('active');
}

// 3) ربط الأحداث
// showMafiaBtn.addEventListener('click', openMafiaModal);
closeMafiaBtn.addEventListener('click', closeMafiaModal);
document.getElementById("startMafiaGameButton").addEventListener('click', closeMafiaModal);
overlay.addEventListener('click', closeMafiaModal);

// (اختياري) زر العودة داخل المودال
const backFromMafia = document.querySelector('#mafiaScreen .btn-secondary');
if (backFromMafia) backFromMafia.addEventListener('click', closeMafiaModal);
function showScreen(screenId) {
  console.log("uiuiuiuiuiuiuiuiuiuiu")
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show the target screen
  document.getElementById(screenId).classList.add('active');
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: makes the scroll smooth
  });
}
const phoneModal    = document.getElementById('jawwalRulesScreen');
const closeModalBtn = phoneModal.querySelector('.modal-close-btn');
// const showRulesBtn  = document.getElementById('showPhoneOnHeadRulesBtn');

// دوال الفتح والإغلاق
function openPhoneModal() {
  overlay.classList.add('active');
  phoneModal.classList.add('active');
}
function closePhoneModal() {
  overlay.classList.remove('active');
  phoneModal.classList.remove('active');
}

// ربط الأحداث
// showRulesBtn.addEventListener('click', openPhoneModal);
closeModalBtn.addEventListener('click', closePhoneModal);
overlay.addEventListener('click', closePhoneModal);

// أيضاً زر العودة داخل المودال (إذا لديك واحد)
document.getElementById('startJawwalBtn').addEventListener('click', closePhoneModal);
document.getElementById('backToGamesBtnJawwal').addEventListener('click', closePhoneModal);

const winkModal = document.getElementById('winkRulesScreen');
const backBtnW  = document.getElementById('backToGamesBtnWink');

function openWinkModal() {
  overlay.classList.add('active');
  winkModal.classList.add('active');
}
function closeWinkModal() {
  overlay.classList.remove('active');
  winkModal.classList.remove('active');
}
// زر ×
closeBtn.addEventListener('click', closeWinkModal);
// النقر على الخلفية
overlay.addEventListener('click', closeWinkModal);
document.getElementById("closeWinkModal").addEventListener('click', closeWinkModal);
// زر العودة
backBtnW.addEventListener('click', closeWinkModal);
document.getElementById("startWinkBtn").addEventListener('click', closeWinkModal);

const spyModal   = document.getElementById('spyRulesScreen');
const spyClose   = spyModal.querySelector('.modal-close-btn');
const spyBackBtn = document.getElementById('spyBackToGames');
function openSpyModal() {
  overlay.classList.add('active');
  spyModal.classList.add('active');
}
function closeSpyModal() {
  overlay.classList.remove('active');
  spyModal.classList.remove('active');
}
spyClose.addEventListener('click', closeSpyModal);
overlay.addEventListener('click', closeSpyModal);
spyBackBtn.addEventListener('click', closeSpyModal);
document.getElementById("spyStartRules").addEventListener('click', closeSpyModal);
// داخل DOMContentLoaded أو قبل بناء البطاقة
const charadesModal   = document.getElementById('charadesRulesScreen');
// const overlay         = document.getElementById('modalOverlay');
const charadesClose   = charadesModal.querySelector('.modal-close-btn');
const charadesBackBtn = document.getElementById('backToGamesBtnCharades');

// دوال الفتح/الإغلاق
function openCharadesModal() {
  overlay.classList.add('active');
  charadesModal.classList.add('active');
}
function closeCharadesModal() {
  overlay.classList.remove('active');
  charadesModal.classList.remove('active');
}

// ربط الأحداث
charadesClose.addEventListener('click', closeCharadesModal);
overlay.addEventListener('click', closeCharadesModal);
charadesBackBtn.addEventListener('click', closeCharadesModal);
document.getElementById("startCharadesBtn").addEventListener('click', closeCharadesModal);
// عناصر المودال
// const overlay       = document.getElementById('modalOverlay');
const whoModal      = document.getElementById('whoRulesScreen');
const whoCloseBtn   = whoModal.querySelector('.modal-close-btn');
const whoBackBtn    = document.getElementById('backToGamesBtnWho');

// دوال الفتح والإغلاق
function openWhoModal() {
  overlay.classList.add('active');
  whoModal.classList.add('active');
}
function closeWhoModal() {
  overlay.classList.remove('active');
  whoModal.classList.remove('active');
}

// الأحداث
overlay.addEventListener('click', closeWhoModal);
whoCloseBtn.addEventListener('click', closeWhoModal);
whoBackBtn.addEventListener('click', closeWhoModal);
document.getElementById('startWhoBtn').addEventListener('click', closeWhoModal);
// العناصر المشتركة
// const overlay         = document.getElementById('modalOverlay');
const outModal        = document.getElementById('outOfTopicScreen');
const outCloseBtn     = outModal.querySelector('.modal-close-btn');
const outBackBtn      = document.getElementById('backToGamesButton');

// دوال الفتح والإغلاق
function openOutModal() {
  overlay.classList.add('active');
  outModal.classList.add('active');
}
function closeOutModal() {
  overlay.classList.remove('active');
  outModal.classList.remove('active');
}

// أحداث الإغلاق
overlay.addEventListener('click', closeOutModal);
outCloseBtn.addEventListener('click', closeOutModal);
document.getElementById('startGameButton').addEventListener('click', closeOutModal);
outBackBtn.addEventListener('click', closeOutModal);

// ربط زر “كيف ألعب؟”
// const showOutBtn = document.getElementById('showOutOfTopicRulesBtn');
// showOutBtn.addEventListener('click', openOutModal);

// العناصر المشتركة
// const overlay          = document.getElementById('modalOverlay');
const treasureModal    = document.getElementById('treasureRulesScreen');
const treasureCloseBtn = treasureModal.querySelector('.modal-close-btn');
const treasureBackBtn  = document.getElementById('backToMenuButtonT');

// دوال الفتح والإغلاق
function openTreasureModal() {
  overlay.classList.add('active');
  treasureModal.classList.add('active');
}
function closeTreasureModal() {
  overlay.classList.remove('active');
  treasureModal.classList.remove('active');
}

// ربط أحداث الإغلاق
overlay.addEventListener('click', closeTreasureModal);
treasureCloseBtn.addEventListener('click', closeTreasureModal);
treasureBackBtn.addEventListener('click', closeTreasureModal);
document.getElementById('nextButton').addEventListener('click', closeTreasureModal);

// ربط زر “كيف ألعب؟”
// const showTreasureBtn = document.getElementById('showTreasureRulesBtn');
// showTreasureBtn.addEventListener('click', openTreasureModal);
// العناصر المشتركة
// const overlay          = document.getElementById('modalOverlay');
const boxesModal       = document.getElementById('boxesRulesScreen');
const boxesCloseBtn    = boxesModal.querySelector('.modal-close-btn');
const backToMenuBtn    = document.getElementById('backToGamesBtn');
// const showBoxesBtn     = document.getElementById('showBoxesRulesBtn');

// دوال الفتح والإغلاق
function openBoxesModal() {
  overlay.classList.add('active');
  boxesModal.classList.add('active');
}
function closeBoxesModal() {
  overlay.classList.remove('active');
  boxesModal.classList.remove('active');
}

// ربط الأحداث
// showBoxesBtn.addEventListener('click', openBoxesModal);
overlay.addEventListener('click', closeBoxesModal);
boxesCloseBtn.addEventListener('click', closeBoxesModal);
backToMenuBtn.addEventListener('click', closeBoxesModal);
document.getElementById('startBoxesBtn').addEventListener('click', closeBoxesModal);
// العناصر المشتركة
// const overlay         = document.getElementById('modalOverlay');
const fastModal       = document.getElementById('fastRulesScreen');
const fastCloseBtn    = fastModal.querySelector('.modal-close-btn');
const backFastBtn     = document.getElementById('backToGamesBtnFast');
// const showFastBtn     = document.getElementById('showFastRulesBtn');

// دوال الفتح والإغلاق
function openFastModal() {
  overlay.classList.add('active');
  fastModal.classList.add('active');
}
function closeFastModal() {
  overlay.classList.remove('active');
  fastModal.classList.remove('active');
}

// ربط الأحداث
// showFastBtn.addEventListener('click', openFastModal);
overlay.addEventListener('click', closeFastModal);
fastCloseBtn.addEventListener('click', closeFastModal);
backFastBtn.addEventListener('click', closeFastModal);
document.getElementById('startFastTimeBtn').addEventListener('click', closeFastModal);

function runBalanceGame(){
  const players = loadPlayers();
  if (players.length < 1) {
    showAlert('error', 'لعبة التوازن تتطلب لاعب واحد على الأقل');
    return; 
  }  
  showScreen('balanceSettingsScreen');
}
function runPicGame(){
  const players = loadPlayers();
  if (players.length < 1) {
    showAlert('error', 'لعبة الصور المتشابهة تتطلب لاعب واحد على الأقل');
    return; 
  }  
    showScreen('midSimPic');
}
function runJawwal(){
  const players = loadPlayers();
  if (players.length < 2) {
    showAlert('error', 'لعبة جوالك على رأسك تتطلب لاعبين 2 على الأقل');
    return; 
  }  
    showScreen('headsUpSettings');
}
function runFastestGame(){
  document.getElementById('repeatFastChallengeBtn').style.display = "none";
  const players = loadPlayers();
  if (players.length < 3) {
    showAlert('error', 'لعبة الأسرع تتطلب 3 لاعبين على الأقل');
    return; 
  }  
        showScreen('fastTimeScreen');

}
function runBoxestGame(){
  const players = loadPlayers();
  if (players.length < 3) {
    showAlert('error', 'لعبة الصناديق تتطلب 3 لاعبين على الأقل');
    return; 
  }  
        showScreen('midBox');

}
function runKanzGame(){
  const playersT = loadPlayers();
  if (playersT.length < 3) {
      showAlert('error',
        `لعبة الكنز تتطلب 3 لاعبين على الأقل! الآن: ${playersT.length}`);
      return;
    }
    showScreen('gameSettingsScreen');
}
function runOutoftopic(){
  const players = loadPlayers();
  if (players.length < 3 || players.length > 12) {
      showAlert('error', 'يتطلب من 3 إلى 12 لاعبين للعب! حالياً: ' + players.length);
      return;

    } 
    showScreen('categoryScreen');
}
function runWhoGame(){
  const playersWho = loadPlayers();
  if (playersWho.length < 3) {
      showAlert('error', `لعبة مين فينا تتطلب 3 لاعبين على الأقل! حالياً: ${playersWho.length}`);
      return;
    }
    showScreen('whoSettingsScreen');
}
function runNospeachGame(){
  const players = loadPlayers();
  if (players.length < 4) {
      showAlert('error', 'لعبة بدون كلام تتطلب 4 لاعبين على الأقل للعب! حالياً: ' + players.length);
      return;
    }
    showScreen('charadesSettingsScreen');
}
function runSpyGame(){
  const players = loadPlayers();
  if (players.length < 5 || players.length > 8) {
      showAlert('error', 'يتطلب من 5 إلى 8 لاعبين للعب! حالياً: ' + players.length);
    } else {
      showScreen('spySettingsScreen');
    }
}
function runWinkGame(){
  const players = loadPlayers();

  if (players.length < 5) {
      showAlert('error', 'لا يمكن اللعب بأقل من 5 لاعبين!');
    } else {
      showScreen("winkSettingsScreen");
    }
}
function runMafiaGame(){

}
/**
 * Update the player count display
 * @param {number} count - The current player count
 */
function updatePlayerCount(count) {
  playerCountElement.textContent = count;
  
  // Enable or disable start button based on player count
  startButton.disabled = count < MIN_PLAYERS_TO_START;
  
  // Enable or disable add button based on max players
  addPlayerButton.disabled = count >= MAX_PLAYERS || playerNameInput.value.trim() === '';
  noPlayer.style.display = count === 0 ? 'flex' : 'none';
}

/**
 * Render the player list in the UI
 * @param {Array} players - Array of player names
 */
function renderPlayerList(list) {
  playerListElement.innerHTML = '';

  list.forEach((player, index) => {
    const li = document.createElement('li');
    li.classList.add('player-item');
    li.dataset.index = index;

    // draggable handle
    const handle = document.createElement('span');
    handle.className = 'drag-handle';
    handle.textContent = '⠿'; // أيقونة قابلة للسحب
    li.appendChild(handle);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = player;
    li.appendChild(nameSpan);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-player');
    removeButton.textContent = '×';
    removeButton.addEventListener('click', () => {
      players.splice(index, 1);
      savePlayers();
      renderPlayerList(players);
    });
    li.appendChild(removeButton);

    playerListElement.appendChild(li);
  });

  updatePlayerCount(list.length);

  
}


/**
 * Render the games list in the UI
 */
function renderGamesList() {
  // Clear the current grid
  gamesGrid.innerHTML = '';

  // Get the current number of players
  const playerCount = loadPlayers().length;

  // Add each game to the grid
  GAMES.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');
    gameCard.dataset.gameId = game.id;

    const isTooFew    = playerCount < game.minPlayers;
    const isTooMany   = playerCount > game.maxPlayers;
    const isPlayable  = !isTooFew && !isTooMany;
    console.log(game.id);
    if(game.id == "balance"){
      const explainBtn = document.createElement('button');
      explainBtn.textContent = 'كيف ألعب؟';
      explainBtn.className = 'btn-explain';
      gameCard.appendChild(explainBtn);
      explainBtn.addEventListener('click', openModal);
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runBalanceGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button  onclick="openModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "similarPictures"){
      const explainBtn = document.createElement('button');
    explainBtn.textContent = 'كيف ألعب؟';
    explainBtn.className = 'btn-explain';
    gameCard.appendChild(explainBtn);
    explainBtn.addEventListener('click', openSimModal);
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button  onclick="runPicGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button  onclick="openSimModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>

    `;
    }
    else if(game.id == "phoneOnHead"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button   onclick="runJawwal()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openPhoneModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "fastest"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runFastestGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openFastModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "boxes"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runBoxestGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button  onclick="openBoxesModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "treasure"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runKanzGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openTreasureModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "outOfTopic"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runOutoftopic()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openOutModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "whoAmongUs"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runWhoGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openWhoModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "noSpeech"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runNospeachGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openCharadesModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "jassos"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runSpyGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openSpyModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "ghomza"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="runWinkGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openWinkModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    else if(game.id == "mafia"){
      gameCard.innerHTML = `
    <div class="bg-white rounded-2xl h-full justify-between p-2 flex flex-col items-center text-center">
      <!-- الأيقونة -->
      <img src="${game.icon}" alt="${game.name} icon" class="w-12 h-12 mb-4">
    
      <!-- العنوان -->
      <h3 class="text-xl font-bold mb-2">${game.name}</h3>
    
      <!-- الوصف -->
      <p class="text-gray-500 text-sm mb-4">
        ${game.description || '...'}
      </p>
    
      <!-- تفاصيل: عدد لاعبين – المدة -->
      <div class="flex items-center text-gray-600 text-sm mb-6 gap-4">
        <div class="flex items-center gap-1">
          <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 0.041626C8.18904 0.041626 6.41683 1.81383 6.41683 3.99996C6.41683 6.18609 8.18904 7.95829 10.3752 7.95829C12.5613 7.95829 14.3335 6.18609 14.3335 3.99996C14.3335 1.81383 12.5613 0.041626 10.3752 0.041626ZM7.66683 3.99996C7.66683 2.50419 8.87939 1.29163 10.3752 1.29163C11.8709 1.29163 13.0835 2.50419 13.0835 3.99996C13.0835 5.49573 11.8709 6.70829 10.3752 6.70829C8.87939 6.70829 7.66683 5.49573 7.66683 3.99996Z" fill="#666666"/>
    <path d="M15.3752 1.70829C15.03 1.70829 14.7502 1.98811 14.7502 2.33329C14.7502 2.67847 15.03 2.95829 15.3752 2.95829C16.5222 2.95829 17.2502 3.71307 17.2502 4.41663C17.2502 5.12018 16.5222 5.87496 15.3752 5.87496C15.03 5.87496 14.7502 6.15478 14.7502 6.49996C14.7502 6.84514 15.03 7.12496 15.3752 7.12496C16.9895 7.12496 18.5002 6.01426 18.5002 4.41663C18.5002 2.819 16.9895 1.70829 15.3752 1.70829Z" fill="#666666"/>
    <path d="M6.00016 2.33329C6.00016 1.98811 5.72034 1.70829 5.37516 1.70829C3.76081 1.70829 2.25016 2.819 2.25016 4.41663C2.25016 6.01426 3.76081 7.12496 5.37516 7.12496C5.72034 7.12496 6.00016 6.84514 6.00016 6.49996C6.00016 6.15478 5.72034 5.87496 5.37516 5.87496C4.22809 5.87496 3.50016 5.12018 3.50016 4.41663C3.50016 3.71307 4.22809 2.95829 5.37516 2.95829C5.72034 2.95829 6.00016 2.67847 6.00016 2.33329Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3752 9.20829C8.88827 9.20829 7.51387 9.60895 6.49294 10.2896C5.47638 10.9673 4.75016 11.9722 4.75016 13.1666C4.75016 14.3611 5.47638 15.366 6.49294 16.0437C7.51387 16.7243 8.88827 17.125 10.3752 17.125C11.8621 17.125 13.2365 16.7243 14.2574 16.0437C15.2739 15.366 16.0002 14.3611 16.0002 13.1666C16.0002 11.9722 15.2739 10.9673 14.2574 10.2896C13.2365 9.60895 11.8621 9.20829 10.3752 9.20829ZM6.00016 13.1666C6.00016 12.5201 6.39323 11.8584 7.18632 11.3296C7.97503 10.8038 9.10063 10.4583 10.3752 10.4583C11.6497 10.4583 12.7753 10.8038 13.564 11.3296C14.3571 11.8584 14.7502 12.5201 14.7502 13.1666C14.7502 13.8131 14.3571 14.4749 13.564 15.0036C12.7753 15.5294 11.6497 15.875 10.3752 15.875C9.10063 15.875 7.97503 15.5294 7.18632 15.0036C6.39323 14.4749 6.00016 13.8131 6.00016 13.1666Z" fill="#666666"/>
    <path d="M16.4313 10.5327C16.5053 10.1956 16.8385 9.98219 17.1757 10.0561C17.9773 10.2319 18.6996 10.5494 19.2358 10.9882C19.7716 11.4267 20.1668 12.0293 20.1668 12.75C20.1668 13.4706 19.7716 14.0733 19.2358 14.5117C18.6996 14.9505 17.9773 15.268 17.1757 15.4438C16.8385 15.5177 16.5053 15.3043 16.4313 14.9672C16.3574 14.63 16.5708 14.2967 16.908 14.2228C17.5683 14.078 18.096 13.8293 18.4442 13.5443C18.793 13.2589 18.9168 12.9802 18.9168 12.75C18.9168 12.5197 18.793 12.241 18.4442 11.9556C18.096 11.6706 17.5683 11.4219 16.908 11.2771C16.5708 11.2032 16.3574 10.8699 16.4313 10.5327Z" fill="#666666"/>
    <path d="M3.57462 10.0561C3.91178 9.98219 4.24505 10.1956 4.31899 10.5327C4.39293 10.8699 4.17954 11.2032 3.84237 11.2771C3.18207 11.4219 2.65437 11.6706 2.3061 11.9556C1.95735 12.241 1.8335 12.5197 1.8335 12.75C1.8335 12.9802 1.95735 13.2589 2.3061 13.5443C2.65437 13.8293 3.18207 14.078 3.84237 14.2228C4.17954 14.2967 4.39293 14.63 4.31899 14.9672C4.24505 15.3043 3.91178 15.5177 3.57462 15.4438C2.77305 15.268 2.05075 14.9505 1.51449 14.5117C0.978703 14.0733 0.583496 13.4706 0.583496 12.75C0.583496 12.0293 0.978703 11.4267 1.51449 10.9882C2.05075 10.5494 2.77305 10.2319 3.57462 10.0561Z" fill="#666666"/>
    </svg>
          <span>${game.minPlayers}–${game.maxPlayers} لاعبين</span>
        </div>
        <div class="flex items-center gap-1">
          <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.12484 1.29163C4.86764 1.29163 1.4165 4.74276 1.4165 8.99996C1.4165 13.2572 4.86764 16.7083 9.12484 16.7083C13.382 16.7083 16.8332 13.2572 16.8332 8.99996C16.8332 4.74276 13.382 1.29163 9.12484 1.29163ZM0.166504 8.99996C0.166504 4.05241 4.17729 0.041626 9.12484 0.041626C14.0724 0.041626 18.0832 4.05241 18.0832 8.99996C18.0832 13.9475 14.0724 17.9583 9.12484 17.9583C4.17729 17.9583 0.166504 13.9475 0.166504 8.99996ZM9.12484 5.04163C9.47002 5.04163 9.74984 5.32145 9.74984 5.66663V8.74108L11.6501 10.6414C11.8942 10.8854 11.8942 11.2812 11.6501 11.5252C11.406 11.7693 11.0103 11.7693 10.7662 11.5252L8.6829 9.4419C8.56569 9.32469 8.49984 9.16572 8.49984 8.99996V5.66663C8.49984 5.32145 8.77966 5.04163 9.12484 5.04163Z" fill="#666666"/>
    </svg>
          <span>10 دقائق</span>
        </div>
      </div>
    
      <!-- زر البدء -->
      <button onclick="startMafiaGame()"
        class="w-full bg-[#303590] text-white font-semibold py-2 rounded-lg mb-4 flex justify-center items-center gap-2 hover:bg-[#25246e]">
      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.98832 2.04445C3.40196 1.1818 1.5 2.31957 1.5 4.03299L1.5 17.9672C1.5 19.6806 3.40196 20.8184 4.98832 19.9557L17.8003 12.9886C19.3999 12.1188 19.3999 9.88144 17.8003 9.01155L4.98832 2.04445ZM5.96046e-07 4.03299C7.7486e-07 1.12798 3.16674 -0.653562 5.70491 0.726689L18.5169 7.6938C21.161 9.13169 21.161 12.8685 18.5169 14.3064L5.70491 21.2735C3.16674 22.6537 -1.19209e-07 20.8722 0 17.9672L5.96046e-07 4.03299Z" fill="white"/>
    </svg>
        <span>ابدأ اللعب الآن</span>
        
      </button>
    
      <!-- الأزرار الثانوية -->
      <div class="flex w-full justify-between gap-2">
        <button
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.125 1.14551C16.5673 1.14551 20.9795 5.55769 20.9795 11C20.9795 16.4423 16.5673 20.8545 11.125 20.8545C5.68269 20.8545 1.27051 16.4423 1.27051 11C1.27051 5.55769 5.68269 1.14551 11.125 1.14551ZM11.125 2.52051C6.44209 2.52051 2.64551 6.31709 2.64551 11C2.64551 15.6829 6.44209 19.4795 11.125 19.4795C15.8079 19.4795 19.6045 15.6829 19.6045 11C19.6045 6.31709 15.8079 2.52051 11.125 2.52051ZM11.125 13.75C11.6313 13.75 12.042 14.1607 12.042 14.667C12.0418 15.1731 11.6312 15.583 11.125 15.583C10.6188 15.583 10.2082 15.1731 10.208 14.667C10.208 14.1607 10.6187 13.75 11.125 13.75ZM11.125 5.72949C12.4539 5.72949 13.5312 6.80681 13.5312 8.13574C13.5311 9.01867 13.0547 9.78927 12.3486 10.207C12.1684 10.3137 12.0198 10.4307 11.9229 10.5449C11.8289 10.6556 11.8126 10.7279 11.8125 10.7705V11.917C11.8123 12.2965 11.5046 12.6045 11.125 12.6045C10.7454 12.6045 10.4377 12.2965 10.4375 11.917V10.7705C10.4376 10.307 10.6403 9.93077 10.874 9.65527C11.1049 9.3832 11.3932 9.17547 11.6484 9.02441C11.9536 8.84389 12.1561 8.51286 12.1562 8.13574C12.1562 7.5662 11.6945 7.10449 11.125 7.10449C10.5555 7.10449 10.0938 7.5662 10.0938 8.13574C10.0936 8.51529 9.78584 8.82324 9.40625 8.82324C9.02666 8.82324 8.71893 8.51529 8.71875 8.13574C8.71875 6.80681 9.79606 5.72949 11.125 5.72949Z" fill="#666666"/>
    </svg>
          <span class="text-sm">ادعُ أصدقاء</span>
        </button>
        <button onclick="openMafiaModal()"
          class="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg flex gap-1 justify-center items-center hover:bg-gray-200">
          <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.62516 1.14587C6.22042 1.14587 4.271 3.0953 4.271 5.50004C4.271 7.90478 6.22042 9.85421 8.62516 9.85421C11.0299 9.85421 12.9793 7.90478 12.9793 5.50004C12.9793 3.0953 11.0299 1.14587 8.62516 1.14587ZM5.646 5.50004C5.646 3.85469 6.97981 2.52087 8.62516 2.52087C10.2705 2.52087 11.6043 3.85469 11.6043 5.50004C11.6043 7.14539 10.2705 8.47921 8.62516 8.47921C6.97981 8.47921 5.646 7.14539 5.646 5.50004Z" fill="#666666"/>
    <path d="M14.1252 2.06254C13.7455 2.06254 13.4377 2.37034 13.4377 2.75004C13.4377 3.12974 13.7455 3.43754 14.1252 3.43754C15.2642 3.43754 16.1877 4.36095 16.1877 5.50004C16.1877 6.63913 15.2642 7.56254 14.1252 7.56254C13.7455 7.56254 13.4377 7.87034 13.4377 8.25004C13.4377 8.62974 13.7455 8.93754 14.1252 8.93754C16.0236 8.93754 17.5627 7.39852 17.5627 5.50004C17.5627 3.60156 16.0236 2.06254 14.1252 2.06254Z" fill="#666666"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.7468 12.3937C5.02955 11.6607 6.75577 11.2292 8.62516 11.2292C10.4946 11.2292 12.2208 11.6607 13.5035 12.3937C14.7668 13.1156 15.7293 14.2177 15.7293 15.5834C15.7293 16.9491 14.7668 18.0511 13.5035 18.773C12.2208 19.506 10.4946 19.9375 8.62516 19.9375C6.75577 19.9375 5.02955 19.506 3.7468 18.773C2.48349 18.0511 1.521 16.9491 1.521 15.5834C1.521 14.2177 2.48349 13.1156 3.7468 12.3937ZM4.42899 13.5876C3.36992 14.1927 2.896 14.924 2.896 15.5834C2.896 16.2427 3.36992 16.974 4.42899 17.5792C5.46861 18.1733 6.95073 18.5625 8.62516 18.5625C10.2996 18.5625 11.7817 18.1733 12.8213 17.5792C13.8804 16.974 14.3543 16.2427 14.3543 15.5834C14.3543 14.924 13.8804 14.1927 12.8213 13.5876C11.7817 12.9935 10.2996 12.6042 8.62516 12.6042C6.95073 12.6042 5.46861 12.9935 4.42899 13.5876Z" fill="#666666"/>
    <path d="M17.0224 12.1618C16.6515 12.0805 16.285 12.3152 16.2036 12.6861C16.1223 13.057 16.357 13.4236 16.7279 13.5049C17.4542 13.6642 18.0347 13.9378 18.4178 14.2513C18.8014 14.5652 18.9377 14.8718 18.9377 15.125C18.9377 15.3549 18.8271 15.6247 18.5223 15.9078C18.2153 16.193 17.7437 16.4564 17.1353 16.6396C16.7717 16.7491 16.5657 17.1326 16.6752 17.4962C16.7847 17.8597 17.1681 18.0657 17.5317 17.9562C18.2857 17.7292 18.9599 17.378 19.4581 16.9152C19.9586 16.4503 20.3127 15.8388 20.3127 15.125C20.3127 14.3323 19.8779 13.6694 19.2886 13.1871C18.6987 12.7044 17.9042 12.3552 17.0224 12.1618Z" fill="#666666"/>
    </svg>
          <span class="text-sm">كيف ألعب؟</span>
        </button>
      </div>
    </div>
    `;
    }
    
    // Shade background if too few players
    if (isTooFew) {
      gameCard.querySelector('div').style.backgroundColor = '#dedede';
      gameCard.querySelector('div').style.height = '100%';

      gameCard.style.backgroundColor = '#dedede';
    // If too many, you can also dim or disallow if you like:
    } else if (isTooMany) {
      gameCard.querySelector('div').style.opacity = '0.6';
      gameCard.querySelector('div').style.height = '100%';

      gameCard.style.opacity = '0.6';
    }
    // داخل دالة renderGamesList()، غيّر الـ innerHTML ليصبح كالآتي:



    if (isPlayable) {
      gameCard.addEventListener('click', () => {
        console.log('Selected game:', game.name);
        console.log('Players:', loadPlayers());
        // ... launch game ...
      });
    }

    gamesGrid.appendChild(gameCard);
  });
}


/**
 * Clear the player name input field
 */
function clearPlayerInput() {
  playerNameInput.value = '';
  addPlayerButton.disabled = true;
}
