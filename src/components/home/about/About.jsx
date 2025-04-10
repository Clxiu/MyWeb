import React, {useEffect, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    // listen to window size change
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = [
        {
            title: "Who I Am & What I Do",
            desc1: "Hello! I'm LingXiu, a software developer. My passion lies in crafting intuitive," +
                " efficient, and impactful software solutions.",
            desc2: "I specialize in full-stack development and machine learning, with particular expertise in computer" +
                " vision projects. On the frontend, I build responsive web applications using React.js and modern CSS frameworks." +
                " My backend expertise includes Node.js, Flask, .NET, and AWS. I'm proficient in deep learning frameworks like" +
                " PyTorch and regularly work with OpenCV for visual recognition tasks.",
            desc3: "I'm passionate about technology's potential to solve real-world problems and improve people's lives." +
                " Driven by curiosity and continuous learning, I actively seek out new challenges to grow as a developer and innovator." +
                " Looking forward, my goal is to leverage my skills in software engineering to develop innovative AI-driven applications." +
                " I aim to continually expand my expertise in cutting-edge technologies, ultimately becoming a tech leader who" +
                " bridges research and practical solutions.",
            cover: "/assets/about.jpg",
        },
    ]

    return (
        <>
            <div className="heading">
                <h3>About Me</h3>
                <h1>{data[0].title}</h1>
            </div>
            {isMobile ? (
                // small screen: use Carousel
                <Carousel controls indicators interval={null}>
                    {/* slide 1 - text */}
                    <Carousel.Item>
                        <div className="carousel-content about-text">
                            <p>{data[0].desc1}</p>
                            <p>{data[0].desc2}</p>
                            <p>{data[0].desc3}</p>
                            <button className="primary-btn">Download CV</button>
                        </div>
                    </Carousel.Item>

                    {/* slide 2 - image */}
                    <Carousel.Item>
                        <div className="carousel-content about-image">
                            <img
                                src={data[0].cover}
                                alt="About"
                                className="about-img d-block w-100"
                            />
                        </div>
                    </Carousel.Item>
                </Carousel>
            ) : (
                // big screen: left + right
                <div className="about-container">
                    <div className="about-left">
                        <p>{data[0].desc1}</p>
                        <p>{data[0].desc2}</p>
                        <p>{data[0].desc3}</p>
                        <button className="primary-btn">Download CV</button>
                    </div>
                    <div className="about-right">
                        <img src={data[0].cover} alt="About" className="about-img"/>
                    </div>
                </div>
            )}
        </>
    );
};

export default About;
