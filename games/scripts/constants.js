// ==================== constants.js ====================
/**
 * Constants and configuration for the games application
 */

// Game data with player requirements
const GAMES = [
  {
    id: 'balance',
    name: 'التوازن',
    icon: "./scripts/assets/icons/balance.svg",
    minPlayers: 1,
    maxPlayers: 12,
    description: 'حافظ على توازنك... بالكلام والحركات!',
    rules: `
    <ul class="list-disc list-inside">
      <li>ابق الورق متوازنًا بحركاتك.</li>
      <li>إذا تساوى الحركات، يحصلون على نفس النقاط.</li>
      <li>… بقية البنود …</li>
    </ul>
  `
  },
  {
    id: 'similarPictures',
    name: 'الصور المتشابهة',
    icon: "./scripts/assets/icons/simipic.svg",
    minPlayers: 1,
    maxPlayers: 12,
    description: 'طابق الصور بسرعة واختبر ذاكرتك.'
  },
  {
    id: 'phoneOnHead',
    name: 'جوالك على راسك',
    icon: "./scripts/assets/icons/jawwal.svg",
    minPlayers: 2,
    maxPlayers: 12,
    description: ' احزر الكلمة من تلميحات الفريق'
  },
  {
    id: 'fastest',
    name: 'الأسرع',
    icon: "./scripts/assets/icons/fastest.svg",
    minPlayers: 3,
    maxPlayers: 12,
    description: ' أجب بسرعة... الوقت يحسم النتيجة!'
  },
  {
    id: 'boxes',
    name: 'الصناديق',
    icon: "./scripts/assets/icons/boxes.svg",
    minPlayers: 3,
    maxPlayers: 12,
    description: 'اختر الصندوق الصحيح واربح التحدي.'
  },
  {
    id: 'treasure',
    name: 'الكنز',
    icon: "./scripts/assets/icons/tr.svg",
    minPlayers: 3,
    maxPlayers: 12,
    description: 'ابحث عن الكنز المخفي قبل الجميع.'
  },
  {
    id: 'outOfTopic',
    name: 'برا السالفة',
    icon: "./scripts/assets/icons/outoftopic.svg",
    minPlayers: 3,
    maxPlayers: 12,
    description: ' اكتشف من خارج الموضوع بينكم.'
  },
  {
    id: 'whoAmongUs',
    name: 'مين فينا؟',
    icon: "./scripts/assets/icons/who.svg",
    minPlayers: 3,
    maxPlayers: 12,
    description: 'من منكم تنطبق عليه العبارة؟ لنرَ!'
  },
  {
    id: 'noSpeech',
    name: 'بدون كلام',
    icon: "./scripts/assets/icons/silent.svg",
    minPlayers: 4,
    maxPlayers: 12,
    description: 'مثّل الكلمات... بدون صوت!'
  },
  {
    id: 'jassos',
    name: 'الجاسوس',
    icon: "./scripts/assets/icons/jasos.svg",
    minPlayers: 5,
    maxPlayers: 8,
    description: 'من يتجسس بينكم؟ كوّن شكوكك!'
  },
  {
    id: 'ghomza',
    name: 'الدخيل',
    icon: "./scripts/assets/icons/wink.svg",
    minPlayers: 5,
    maxPlayers: 12,
    description: 'هناك دخلاء بينكم، من هم؟'
  },
  {
    id: 'mafia',
    name: 'المافيا',
    icon: "./scripts/assets/icons/mafia.svg",
    minPlayers: 6,
    maxPlayers: 12,
    description: 'اكشف المافيا قبل أن تُقصى.'
  },
];

// LocalStorage key for players
const STORAGE_KEY = 'players';

// Minimum players required to start
const MIN_PLAYERS_TO_START = 1;

// Maximum players allowed
const MAX_PLAYERS = 12;
