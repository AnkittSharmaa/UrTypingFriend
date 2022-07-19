import React, { useRef, useState, useEffect } from "react";
import {
    currentCommands,
    setCurrentCommands,
    defalutCommands,
} from "../helpers/commandline-lists";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { setIsCmdLine } from "../store/actions";

function CommandLine() {
    const {
        toggle: { isCmdLine },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [inputVal, setInputVal] = useState("");
    const [subgroup, setSubgroup] = useState(false);
    const [isInput, setIsInput] = useState(false);
    const commandInput = useRef(null);

    useEffect(() => {
        const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));
        if (cmdLists.length > 0) {
            const cmd = document.querySelector(".cmdlist.activeCmd");
            if (cmd) {
                cmdLists.forEach((obj, idx) => {
                    obj.classList.remove("activeCmd");
                });
            }
            cmdLists[0].classList.add("activeCmd");
        }
    })

    const filteredSearch = currentCommands.list.filter((val) => {
        if (inputVal === "") {
            return val;
        } else if (val.display.toLowerCase().includes(inputVal.toLowerCase())) {
            return val;
        }
    });

    const trigger = (command) => {
        currentCommands.list.forEach((obj, idx) => {
            if (obj.id == command) {
                if (obj.input) {
                    setIsInput(true);
                    const escaped = obj.display.split("</i>")[1] ?? obj.display;
                    console.log("this thing has to input");
                } else if (obj.subgroup) {
                    setSubgroup(true);
                    setCurrentCommands(obj.subgroup);
                    dispatch(setIsCmdLine(true));
                } else {
                    if (obj.exec) {
                        obj.exec();
                        dispatch(setIsCmdLine(false));
                    }
                }
                setInputVal("");
            }
        });
    };

    const escReturn = () => {
        currentCommands.list.forEach((obj, idx) => {
            if (obj.subgroup) {
                dispatch(setIsCmdLine(false));
            } else {
                setCurrentCommands(defalutCommands);
                dispatch(setIsCmdLine(true));
            }
        })
    }

    const handlePalletKeys = (e) => {
        if (e.key) {
            commandInput.current.focus();
        }
        if (e.key === "Tab") {
            e.preventDefault();
        }
        if (e.key === "Escape" && isCmdLine === true) {
            e.preventDefault();
            escReturn();
        }
        if (e.key === "Enter") {
            e.preventDefault();
            const command = document
                .querySelector(".cmdlist.activeCmd")
                .getAttribute("command");
            trigger(command);
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Tab") {
            e.preventDefault();
            const cmdLists = Array.from(document.querySelectorAll(".cmdlist"));
            let activenum = -1;

            cmdLists.forEach((obj, idx) => {
                if (obj.classList.contains("activeCmd")) {
                    activenum = idx;
                }
            });

            if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
                cmdLists.forEach((obj, idx) => {
                    obj.classList.remove("activeCmd");
                });
                if (activenum === 0) {
                    cmdLists[cmdLists.length - 1].classList.add("activeCmd");
                } else {
                    cmdLists[--activenum].classList.add("activeCmd");
                }
            }

            if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
                cmdLists.forEach((obj, idx) => {
                    obj.classList.remove("activeCmd");
                });
                if (activenum + 1 == cmdLists.length) {
                    cmdLists[0].classList.add("activeCmd");
                } else {
                    cmdLists[++activenum].classList.add("activeCmd");
                }
            }
            document
                .querySelector(".cmdlist.activeCmd")
                .scrollIntoView({ block: "nearest" });
        }
        e.stopPropagation();
    };

    const handleClick = (e) => {
        if (e.target.getAttribute("class") === "commandLineWrapper") {
            dispatch(setIsCmdLine(false));
        }
    };

    return (
        <div
            className="commandLineWrapper"
            onKeyDown={handlePalletKeys}
            onClick={handleClick}
        >
            <div className="commandLine">
                <div className="input-box">
                    <div className="search-icon">
                        <FaSearch />
                    </div>
                    <input
                        className="input"
                        placeholder="Type to search"
                        type="text"
                        ref={commandInput}
                        // onBlur={({target}) => {target.focus()}}
                        autoFocus
                        maxLength={32}
                        onChange={(e) => {
                            setInputVal(e.target.value);
                        }}
                        value={inputVal}
                    />
                </div>
                {filteredSearch.length > 0 && (
                    <div className="suggestions">
                        {filteredSearch.map((obj, idx) => (
                            <div className="cmdlist" command={obj.id} key={idx}>
                                {obj.display}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommandLine;
