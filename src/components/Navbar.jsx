import React from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaKeyboard, FaGithub, FaLinkedin } from "react-icons/fa";
import { resetTest } from "../helpers/resetTest";
import { useSelector, useDispatch } from "react-redux";
import { setIsCmdLine } from "../store/actions";

function Navbar() {
    const {
        toggle: { isCmdLine },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleChangeRoute = () => {
        resetTest();
    }

    const handleSetting = () => {
        dispatch(setIsCmdLine(true))
    }

    return (
        <div className="top">
            {/* Logo */}
            <div className="logo">Hello!! Welcome to UrTypingFriend</div>

            {/* Menu */}
            <div className="menu">
                <Link to="/" className="button">
                    <FaKeyboard />
                </Link>
                <Link to="/About" className="button" onClick={handleChangeRoute}>
                    <FaInfo />
                </Link>
                <Link to="https://github.com/AnkittSharmaa" className="button" onClick={handleChangeRoute}>
                    <FaGithub />
                </Link>
                <Link to="https://www.linkedin.com/in/ankit-sharma-he-hm/" className="button" onClick={handleChangeRoute}>
                    <FaLinkedin />
                </Link>
                
            </div>
        </div>
    );
}

export default Navbar;
