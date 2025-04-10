import {React, useEffect, useState} from "react"
import RoomScene from "../room/RoomScene";
import WeatherFetcher from "../room/WeatherFetcher";
import "../room/Room.css";

const Home = () => {
    const [weather, setWeather] = useState("clouds");
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

    useEffect(() => {
        // prevent resume scrolling
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // scroll to top
        window.scrollTo({top: 0, left: 0, behavior: "auto"});
    }, []);

    const scrollToMore = () => {
        const next = document.getElementById("more-item");
        if (next) {
            const offset = 0.1 * window.innerHeight;
            const top = next.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({top, behavior: "smooth"});
        }
    };

    // listen to window size change
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 850);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <section className="room-section">
                <div className="welcome-heading animate-heading">
                    <h5>WELCOME TO MY WEBSITE</h5>
                    <h1>Lingxiu Cai</h1>
                </div>

                <RoomScene weather={weather}/>
                <WeatherFetcher onWeatherChange={setWeather}/>

                <div className="show-more-container">
                    {isMobile ? (
                        <button className="show-more-btn" onClick={scrollToMore} style={{minWidth: "80px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
                            </svg>
                        </button>
                    ) : (
                        <button className="show-more-btn" onClick={scrollToMore}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-chevron-compact-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                      d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"/>
                            </svg>
                            &nbsp; ABOUT ME
                        </button>
                    )}
                </div>
            </section>

            {isMobile ? (
                <section className="home" id="more-item" style={{height: "auto"}}>
                    <div className="mobile-home-container">
                        <h1 className="mobile-title">
                            I AM A <br/> DEVELOPER
                        </h1>
                        <div className="mobile-about-text">
                            <div className="socialIcon">
                                <a href="https://github.com/Clxiu" target="_blank" rel="noreferrer"><i
                                    className="fab fa-github github"></i></a>
                                <a href="https://facebook.com/lingxiu.cai.1" target="_blank" rel="noreferrer"><i
                                    className="fab fa-facebook-f facebook"></i></a>
                                <a href="https://www.linkedin.com/in/lingxiu-cai-67a2291b3/" target="_blank"
                                   rel="noreferrer"><i className="fab fa-linkedin linkedin"></i></a>
                                <a href="https://discordapp.com/users/linn_710" target="_blank" rel="noreferrer"><i
                                    className="fab fa-discord discord"></i></a>
                            </div>
                            <p className="selfIntro">
                                Hello, I'm LingXiu, a software developer with a Master's degree in Machine
                                Learning and Computer Vision from the Australian National University. My
                                technical stack includes Python, JavaScript, C#, and Java, and I'm experienced
                                in both front-end and back-end development. I enjoy creating responsive,
                                intuitive, and efficient software solutions.
                            </p>
                            <button className='mobile-contact-btn primary-btn'>Contact Me</button>
                        </div>
                        <div className="mobile-about-image">
                            <div className="circle-background">
                                <img src="/assets/home.PNG" alt="Profile" className="profile-image"
                                     style={{width: "300px", height: "auto", left: "50%"}}/>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="home" id="more-item">
                    <div className="home-container flex">
                        <div className="left">
                            <div className="img">
                                <img src="/assets/home.PNG" alt=""/>
                            </div>
                        </div>
                        <div className="right topMargin">
                            <h1>I AM A <br/> DEVELOPER</h1>
                            <div className="socialIcon">
                                <a href="https://github.com/Clxiu" target="_blank" rel="noreferrer"><i
                                    className="fab fa-github github"></i></a>
                                <a href="https://facebook.com/lingxiu.cai.1" target="_blank" rel="noreferrer"><i
                                    className="fab fa-facebook-f facebook"></i></a>
                                <a href="https://www.linkedin.com/in/lingxiu-cai-67a2291b3/" target="_blank"
                                   rel="noreferrer"><i className="fab fa-linkedin linkedin"></i></a>
                                <a href="https://discordapp.com/users/linn_710" target="_blank" rel="noreferrer"><i
                                    className="fab fa-discord discord"></i></a>
                            </div>
                            <p className="selfIntro">
                                Hello, I'm LingXiu, a software developer with a Master's degree in Machine Learning and
                                Computer Vision from the Australian National University. My technical stack includes
                                Python, JavaScript, C#, and Java, and I'm experienced in both front-end and back-end
                                development. I enjoy creating responsive, intuitive, and efficient software solutions.
                            </p>
                            <button className='primary-btn'>Contact Me</button>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default Home;
