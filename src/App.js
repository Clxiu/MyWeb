import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/home/header/Header";
import HomePages from "./components/pageContent/HomePages";
import CoverGame from "./components/home/coverGame/CoverGame";

const App = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const [gameCompleted, setGameCompleted] = useState(false);

    // check localStorage only when user open/refresh the page
    useEffect(() => {
        // gameCompleted in localStorage
        const storedGameCompleted = localStorage.getItem("gameCompleted") === "true";
        const storedTimestamp = localStorage.getItem("gameCompletedTimestamp");

        if (storedGameCompleted && storedTimestamp) {
            const currentTime = Date.now();
            const timePassed = currentTime - parseInt(storedTimestamp, 10);

            if (timePassed < 60 * 60 * 1000) {
                // less than 1 hr
                setGameCompleted(true);
            } else {
                // clear localStorage after 1 hr
                localStorage.removeItem("gameCompleted");
                localStorage.removeItem("gameCompletedTimestamp");
                setGameCompleted(false);
            }
        }
    }, []);
    const handleGameComplete = () => {
        setGameCompleted(true);
        localStorage.setItem("gameCompleted", "true");
        localStorage.setItem("gameCompletedTimestamp", Date.now().toString());
    };

    return (
        <Router>
            {gameCompleted ? (
                <>
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Routes>
                        <Route path="/" element={<HomePages />} />
                    </Routes>
                </>
            ) : (
                <CoverGame onGameComplete={handleGameComplete} />
            )}
        </Router>
    );
};

export default App;
