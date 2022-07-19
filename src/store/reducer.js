import { combineReducers } from "redux";
import {
    TIMER_DECREMENT,
    TIMERID_SET,
    TIMER_SET,
    SET_WORD,
    SET_CHAR,
    APPEND_TYPE_HISTORY,
    PREV_WORD,
    SET_WORDLIST,
    SET_REF,
    SET_CARET_REF,
    SET_THEME,
    SET_TIME,
    SET_IS_CMDLINE
} from "./actions";

export const initialState = {
    time: {
        timer: 30,
        timerId: null,
    },
    word: {
        currWord: "",
        typedWord: "",
        typedHistory: "",
        wordList: [],
        activeWordRef: null,
        caretRef: null,
    },
    preference: {
        theme: "",
        timeLimit: 30,
    },
    toggle: {
        isCmdLine: false,
    }
};

// Timer Reducer
const timerReducer = (state = initialState.time, { type, payload }) => {
    switch (type) {
        case TIMER_DECREMENT:
            return { ...state, timer: state.timer - 1 };
        case TIMER_SET:
            return { ...state, timer: payload };
        case TIMERID_SET:
            return { ...state, timerId: payload };
        default:
            return state;
    }
};

// Word Reducer
const wordReducer = (state = initialState.word, { type, payload }) => {
    switch (type) {
        case SET_WORD:
            return { ...state, typedHistory: [...state.typedHistory, payload] };
        case SET_CHAR:
            return { ...state, typedWord: payload };
        case APPEND_TYPE_HISTORY:
            const nextIdx =
                state.wordList.indexOf(
                    state.currWord,
                    state.typedHistory.length
                ) + 1;
            return {
                ...state,
                typedWord: "",
                currWord: state.wordList[nextIdx],
                typedHistory: [...state.typedHistory, state.typedWord],
            };
        case PREV_WORD:
            const prevIdx = state.wordList.indexOf(state.currWord) - 1;
            return {
                ...state,
                currWord: state.wordList[prevIdx],
                typedWord: !payload ? state.typedHistory[prevIdx] : "",
                typedHistory: state.typedHistory.splice(
                    0,
                    state.typedHistory.length - 1
                ),
            };
        case SET_REF:
            return {
                ...state,
                activeWordRef: payload
            };
        case SET_CARET_REF:
            return {
                ...state,
                caretRef: payload
            };
        case SET_WORDLIST:
            const areNotWords = payload.every((word) => {
                typeof word === "string" && word.includes(" ")
            });
            var shuffleWordList = payload?.sort(
                () => Math.random() - 0.5
            );
            if (areNotWords)
                shuffleWordList = payload.flatMap((token) => 
                    typeof token === "string" && token.split(" ")
                );
            return {
                ...state,
                typedWord: "",
                typedHistory: [],
                currWord: shuffleWordList[0],
                wordList: shuffleWordList
            };
        default:
            return state;
    }
};

const preferenceReducer = (state = initialState.preference, {type, payload}) => {
    switch (type) {
        case SET_THEME:
            return {...state, theme: payload};
        case SET_TIME:
            return {
                ...state,
                timeLimit: payload,
            };
        default:
            return state;
    }
}

const toggleReducer = (state = initialState.toggle, {type, payload}) => {
    switch (type) {
        case SET_IS_CMDLINE:
            return {...state, isCmdLine: payload}
        default:
            return state;
    }
}

export default combineReducers({
    time: timerReducer,
    word: wordReducer,
    preferences: preferenceReducer,
    toggle: toggleReducer,
});
