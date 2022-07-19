export const TIMER_DECREMENT = "TIMERDECREMENT";
export const TIMER_SET = "TIMERSET";
export const TIMERID_SET = "TIMERIDSET";
export const SET_CHAR = "SETCHAR";
export const SET_WORD = "SETWORD";
export const APPEND_TYPE_HISTORY = "APPENDTYPEHISTORY";
export const PREV_WORD = "PREVWORD";
export const SET_WORDLIST = "SETWORDLIST";
export const SET_REF = "SETREF";
export const SET_CARET_REF = "SETCARETREF";
export const SET_THEME = "SETTHEME";
export const SET_TIME =- "SETTIME";
export const SET_IS_CMDLINE = "SETISCMDLINE";

// Timer Actions
export const timerDecrement = () => ({type: TIMER_DECREMENT});
export const timerSet = (payload) => ({type: TIMER_SET, payload});
export const setTimerId = (payload) => ({type: TIMERID_SET, payload});

// Word Actions
export const setWord = (payload) => ({ type : SET_WORD, payload});
export const setChar = (payload) => ({type: SET_CHAR, payload});
export const setTypedWord = (payload) => ({type: SET_CHAR, payload});
export const appendTypedHistory = (payload) => ({type: APPEND_TYPE_HISTORY, payload});
export const backtrackWord = (payload) => ({type: PREV_WORD, payload});
export const setWordList = (payload) => ({type: SET_WORDLIST, payload});
export const setRef = (payload) => ({type: SET_REF, payload});
export const setCaretRef = (payload) => ({type: SET_CARET_REF, payload});

// Preferences Actions
export const setTheme = (payload) => ({type: SET_THEME, payload});
export const setTime = (payload) => ({type: SET_TIME, payload});

// Toggle Actions
export const setIsCmdLine = (payload) => ({type: SET_IS_CMDLINE, payload});