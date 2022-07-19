import React, { useEffect, useState } from "react";
import Test from "../components/Test";
import { useDispatch, useSelector } from "react-redux";
import { setIsCmdLine, setWordList, setTimerId } from "../store/actions";
import { recordTest } from "../helpers/recordTest";
import Result from "../components/Result";
import CommandLine from "../components/CommandLine";
import { setCurrentCommands, defalutCommands } from "../helpers/commandline-lists";

function Home() {
    const {
        time: { timerId, timer },
        word: { currWord, typedWord, activeWordRef },
        toggle: { isCmdLine },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    // add wordList
    useEffect(() => {
        import(`../wordlist/words.json`).then((words) => {
            dispatch(setWordList(words.default));
        });
    }, [dispatch]);

    // keydown event
    useEffect(() => {
        document.onkeydown = (e) => {
            if (e.key === "Tab" && e.repeat) e.preventDefault();
            else if (e.key === "Escape" && isCmdLine === false) {
                dispatch(setIsCmdLine(true));
                setCurrentCommands(defalutCommands);
                e.preventDefault();
            } else if (
                e.key.length === 1 ||
                e.key === "Backspace" ||
                e.key === "Tab"
            ) {
                recordTest(e.key, e.ctrlKey);
                e.preventDefault();
            }
        };
        return () => {
            document.onkeydown = null;
        };
    }, [dispatch]);

    //check correct
    useEffect(() => {
        let idx = typedWord.length - 1;
        const currWordEl = activeWordRef?.current;
        if (currWordEl) {
            currWordEl.children[idx + 1].classList.add(
                currWord[idx] !== typedWord[idx] ? "wrong" : "right"
            );
        }
    }, [currWord, typedWord, activeWordRef]);

    //remove correct
    useEffect(() => {
        let idx = typedWord.length;
        const currWordEl = activeWordRef?.current;
        if (currWordEl && idx < currWord.length)
            currWordEl.children[idx + 1].classList.remove("wrong", "right");
    }, [currWord.length, typedWord, activeWordRef]);

    //timer
    useEffect(() => {
        if (timer === 0 && timerId) {
            clearInterval(timerId);
            dispatch(setTimerId(null));
        }
    }, [dispatch, timer, timerId]);

    return (
        <>
            {timer !== 0 ? <Test /> : <Result />}
            {/* <Result /> */}
            {isCmdLine && <CommandLine />}
        </>
    );
}

export default Home;
