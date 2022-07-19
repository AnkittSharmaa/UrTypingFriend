import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import { resetTest } from "../helpers/resetTest";
import { store } from "../store/store";

export function ResetButton(props) {

    const { getState } = store;
    const {
        time: { timer }
    } = getState();

    const reset = () => {
        resetTest();
        document.getElementsByClassName("word")[0].scrollIntoView();
    };
    const endReset = () => {
        resetTest();
    };

    return (
        <div className="bottom
        ">
            <div className="reset-button" onClick={timer === 0 ? endReset : reset}>
                <FaRedoAlt size={props.size} />
            </div>
        </div>
    );
}