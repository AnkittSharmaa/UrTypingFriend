// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setTheme, timerSet, setWordList } from "../store/actions";

// export const options = {
//     theme: ["default", "mkbhd"],
// };

// function Theme() {
//     const {
//         preferences: { theme },
//     } = useSelector((state) => state);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const theme = localStorage.getItem("theme") || "default";
//         dispatch(setTheme(theme));
//     }, [dispatch]);

//     // Set theme
//     useEffect(() => {
//         if (theme) {
//             document.querySelector(".theme")?.childNodes.forEach((el) => {
//                 if (el instanceof HTMLButtonElement)
//                     el.classList.remove("selected");
//             });
//             document
//                 .querySelector(`button[value="${theme}"]`)
//                 ?.classList.add("selected");
//             document.body.children[1].classList.remove(...options.theme);
//             document.body.children[1].classList.add(theme);
//             localStorage.setItem("theme", theme);
//         }
//     }, [dispatch, theme]);

//     return (
//         <div className="theme-center">
//             <div className="theme-area">
//                 {Object.entries(options).map(([option, choices]) => {
//                     <div key={option} className={option}>
//                         {option}:
//                         {choices.map((choice) => {
//                             <button
//                                 className="mini"
//                                 key={choice}
//                                 data-option={option}
//                                 value={choice}
//                             >
//                                 {choice}
//                             </button>;
//                         })}
//                     </div>;
//                 })}
//             </div>
//         </div>
//     );
// }

// export default Theme;

import React from "react";

export function showTheme() {
    fetch(`../themes/theme-list.json`)
        .then((res) => {
            if (res.status === 200) {
                res.text()
                    .then((body) => {
                        let themes = JSON.parse(body);
                        let keys = Object.keys(themes);
                        for (let i = 0; i < keys.length; i++) {
                            let theme = document.createElement("div");
                            theme.setAttribute("class", "theme-button");
                            theme.setAttribute(
                                "onClick",
                                `setTheme('${keys[i]}')`
                            );
                            theme.setAttribute("id", keys[i]);

                            if (themes[keys[i]]["customHTML"] != undefined) {
                                theme.style.background =
                                    themes[keys[i]]["background"];
                                theme.innerHTML = themes[keys[i]]["customHTML"];
                            } else {
                                theme.textContent = keys[i];
                                theme.style.background =
                                    themes[keys[i]]["background"];
                                theme.style.color = themes[keys[i]]["color"];
                            }
                            document
                                .getElementById("theme-area")
                                .appendChild(theme);
                        }
                    })
                    .catch((err) => console.error(err));
            } else {
                console.log(`Cant find theme-list.json`);
            }
        })
        .catch((err) => console.error(err));
}

function Theme() {
    return (
        <div className="theme-center">
            <div className="theme-area"></div>
        </div>
    );
}

export default Theme;
