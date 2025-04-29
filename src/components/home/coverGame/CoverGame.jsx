import React, {useEffect, useRef, useState} from "react";
import "./CoverGame.css";

const CoverGame = ({onGameComplete}) => {
    const [marioPosition, setMarioPosition] = useState(10);
    const [stepSize, setStepSize] = useState(1);
    const [jumping, setJumping] = useState(false);
    // box bouncing state
    const [boxJumping, setBoxJumping] = useState(false);

    const groundLevel = 5;
    const gameContainerRef = useRef(null);
    const keys = useRef({});
    const moveInterval = useRef(null);

    // dynamically adjust step size base on screen width
    useEffect(() => {
        const updateStepSize = () => {
            if (window.innerWidth > 1000) {
                setStepSize(0.5);
            } else {
                setStepSize(1);
            }
        };

        window.addEventListener("resize", updateStepSize);
        updateStepSize();
        return () => window.removeEventListener("resize", updateStepSize);
    }, []);

    // player movement
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                keys.current[event.key] = true;

                if (!moveInterval.current) {
                    moveInterval.current = setInterval(() => {
                        setMarioPosition((prev) => {
                            if (keys.current["ArrowRight"]) {
                                return Math.min(prev + stepSize, 90);
                            } else if (keys.current["ArrowLeft"]) {
                                return Math.max(prev - stepSize, 5);
                            }
                            return prev;
                        });
                    }, 16);
                }
            }
        };
        const handleKeyUp = (event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                keys.current[event.key] = false;

                if (!keys.current["ArrowRight"] && !keys.current["ArrowLeft"]) {
                    clearInterval(moveInterval.current);
                    moveInterval.current = null;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            clearInterval(moveInterval.current);
        };
    }, [stepSize]);

    useEffect(() => {
        let animationId;
        let lastUpdateTime = performance.now();

        const move = (time) => {
            const delta = time - lastUpdateTime;

            if (delta > 16) {
                setMarioPosition((prev) => {
                    if (keys.current["ArrowRight"]) {
                        return Math.min(prev + stepSize, 90);
                    } else if (keys.current["ArrowLeft"]) {
                        return Math.max(prev - stepSize, 5);
                    }
                    return prev;
                });
                lastUpdateTime = time;
            }

            animationId = requestAnimationFrame(move);
        };

        animationId = requestAnimationFrame(move);
        return () => cancelAnimationFrame(animationId);
    }, [stepSize]);


    // player jump, collision with box
    useEffect(() => {
        const handleJump = (event) => {
            if ((event.key === " " || event.key === "ArrowUp") && !jumping) {
                setJumping(true);
                setTimeout(() => {
                    setJumping(false);

                    // check for collision with box
                    if (gameContainerRef.current) {
                        const boxElement = gameContainerRef.current.querySelector(".mystery-box");
                        const marioElement = gameContainerRef.current.querySelector(".mario");

                        if (boxElement && marioElement) {
                            // center positions
                            const boxRect = boxElement.getBoundingClientRect();
                            const marioRect = marioElement.getBoundingClientRect();

                            const marioCenter = marioRect.left + marioRect.width / 2;
                            const boxCenter = boxRect.left + boxRect.width / 2;
                            const collisionThreshold = boxRect.width * 0.6;

                            if (Math.abs(marioCenter - boxCenter) <= collisionThreshold) {
                                console.log("Collision detected! Box should jump.");
                                setBoxJumping(true);

                                // await 1s before change content
                                setTimeout(() => {
                                    setBoxJumping(false);
                                    onGameComplete();
                                }, 1300);
                            }
                        }
                    }
                }, 200);
            }
        };

        window.addEventListener("keydown", handleJump);
        return () => window.removeEventListener("keydown", handleJump);
    }, [jumping, onGameComplete]);

    const simulateKey = (key, pressed) => {
        keys.current[key] = pressed;
    };

    return (
        <div className="cover-game">
            <div className="skip-btn">
                <button onClick={onGameComplete}>SKIP</button>
            </div>
            <div className="game-hint">
                <p>Use ← → to move, ↑ or space to jump</p>
            </div>
            <div className="mobile-controls">
                <button
                    onTouchStart={(e) => {
                        simulateKey("ArrowLeft", true);
                    }}
                    onTouchEnd={(e) => {
                        simulateKey("ArrowLeft", false);
                    }}
                    onMouseDown={() => simulateKey("ArrowLeft", true)}
                    onMouseUp={() => simulateKey("ArrowLeft", false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#125659"
                         className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path
                            d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                </button>
                <button className="up-btn"
                        onTouchStart={(e) => {
                            const evt = new KeyboardEvent("keydown", {key: "ArrowUp"});
                            window.dispatchEvent(evt);
                        }}
                        onClick={() => {
                            const evt = new KeyboardEvent("keydown", {key: "ArrowUp"});
                            window.dispatchEvent(evt);
                        }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#125659"
                         className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path
                            d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>
                </button>
                <button
                    onTouchStart={(e) => {
                        simulateKey("ArrowRight", true);
                    }}
                    onTouchEnd={(e) => {
                        simulateKey("ArrowRight", false);
                    }}
                    onMouseDown={() => simulateKey("ArrowRight", true)}
                    onMouseUp={() => simulateKey("ArrowRight", false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#125659"
                         className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path
                            d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>
                </button>
            </div>
            <div className="game-container" ref={gameContainerRef}>
                <div className={`mystery-box ${boxJumping ? "box-jump" : ""}`}></div>
                <div
                    className={`mario ${jumping ? "jump" : ""}`}
                    style={{
                        left: `${marioPosition}%`,
                        bottom: jumping ? "5vh" : `${groundLevel}vh`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default CoverGame;
