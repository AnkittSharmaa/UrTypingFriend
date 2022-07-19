import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "../store/actions";

function Test() {
    const {
        word: { typedWord, currWord, wordList, typedHistory },
        time: { timer },
    } = useSelector((state) => state);
    const dispatch = useDispatch();
    const extraLetters =
        typeof typedWord === "string" &&
        typedWord.slice(currWord.length).split("");
    const activeWord = useRef(null);
    const caretRef = useRef(null);

    useEffect(() => {
        dispatch(setRef(activeWord));
        dispatch(setCaretRef(caretRef));
    }, [dispatch]);

    return (
        <div className="typingTest">
            <div className="timer">{timer}</div>
            <div className="wordWrapper">
                <div className="type-box">
                    {wordList.map((word, idx) => {
                        const isActive =
                            currWord +
                                wordList.indexOf(
                                    currWord,
                                    typedHistory.length
                                ) ===
                            word + idx;
                        return (
                            <div
                                key={word + idx}
                                className="word"
                                ref={isActive ? activeWord : null}
                            >
                                {isActive ? (
                                    <span
                                        ref={caretRef}
                                        id="caret"
                                        className="blink"
                                        style={{
                                            left: typedWord.length * 14.6,
                                        }}
                                    >
                                        |
                                    </span>
                                ) : null}
                                {word.split("").map((char, charId) => {
                                    return (
                                        <span key={char + charId}>{char}</span>
                                    );
                                })}
                                {isActive
                                    ? extraLetters.map((char, charId) => {
                                          return (
                                              <span
                                                  key={char + charId}
                                                  className="wrong extra"
                                              >
                                                  {char}
                                              </span>
                                          );
                                      })
                                    : typedHistory[idx]
                                    ? typedHistory[idx]
                                          .slice(wordList[idx].length)
                                          .split("")
                                          .map((char, charId) => {
                                              return (
                                                  <span
                                                      key={char + charId}
                                                      className="wrong extra"                                               // when spacebar
                                                  >
                                                      {char}
                                                  </span>
                                              );
                                          })
                                    : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Test;