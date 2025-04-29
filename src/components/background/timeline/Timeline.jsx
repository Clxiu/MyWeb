import React, {useEffect} from "react";
import "./Timeline.css";

const educationTimeline = [
    {
        id: 1,
        title: "High School - Baradene College (Auckland)",
        date: "2016 - 2019",
        description:
            "Completed NCEA Level 1 to Level 3 with a strong focus on mathematics, computing, and science. Developed early interests in programming and data analysis.",
        icon: "fas fa-school",
    },
    {
        id: 2,
        title: "Bachelor of Science (Computer Science and Statistics) - University of Auckland",
        date: "2020 - 2022",
        description:
            "Majored in Computer Science and Statistics. Built a foundation in software development, algorithms, and data analysis.",
        icon: "fas fa-university",
    },
    {
        id: 3,
        title: "Master of Machine Learning and Computer Vision - Australian National University",
        date: "2023 - 2024",
        description:
            "Focused on human center design, machine learning and computer vision.",
        icon: "fas fa-graduation-cap",
    },
];

const projectTimeline = [
    {
        id: 1,
        title: "Project Consultant - Deloitte",
        date: "2020",
        description:
            "Auckland Virtual Internship Project, working on a Covid-19 Twitter case study. The goal of this project was to identify the key themes of New Zealand’s Covid-19 related Twitter feed and help the client understand the general sentiment relating to these key topics.",
        icon: "fas fa-briefcase",
    },
    {
        id: 2,
        title: "Team Lead - ProCoder",
        date: "2022",
        description:
            "This project is about a tool for pro-learner and programming learners. Designed to allow users to upload custom programming questions, solve peers' challenges, and engage in discussions in a community connected to the questions.",
        icon: "fas fa-users-cog",
    },
    {
        id: 3,
        title: "Full-Stack Developer - Trust Indicator Platform",
        date: "2023",
        description:
            "This project is about a platform aimed at enhancing transparency in the digital media realm, focusing on Australian-themed content. Developed to address the growing concerns regarding the authenticity of images in the era of advanced editing techniques and widespread online distribution.",
        icon: "fas fa-layer-group",
    },
    {
        id: 4,
        title: "Real-Time Hand Gesture Recognition",
        date: "2024",
        description:
            "This project aimed to develop a real-time hand gesture recognition system that enables intuitive and efficient human-computer interaction. The system adopted a two-stage detector-classifier architecture to significantly reduce the computational load in non-gesture scenarios while maintaining high accuracy during gesture recognition.",
        icon: "fas fa-hand-paper",
    },
];

const TimelineItem = ({data, index}) => {
    const side = index % 2 === 0 ? "left" : "right";

    return (
        <div className={`timeline-item ${side}`}>
            <div className="timeline-content">
                <div className="timeline-date">{data.date}</div>
                <h2>
                    <i className={`${data.icon} timeline-icon`}></i>
                    {data.title}
                </h2>
                {data.subtitle && <h3>{data.subtitle}</h3>}
                <p>{data.description}</p>
                {data.buttonText && (
                    <a href={data.buttonLink} target="_blank" rel="noreferrer" className="pixel-button">
                        {data.buttonText}
                    </a>
                )}
            </div>
        </div>
    );
};

const Timeline = ({darkMode}) => {
    useEffect(() => {
    // 切换 class
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }

    // 关键步骤：动态根据 CSS Variable 设置 body 背景色
    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--background-color")
      .trim(); // .trim()防止空格问题

    document.body.style.backgroundColor = backgroundColor;
  }, [darkMode]);


    return (
        <div className="game-container">
            <div className="game-header">
                <h1>MY TIMELINE</h1>
            </div>

            <div className="timeline">
                {educationTimeline.map((item, idx) => (
                    <TimelineItem key={item.id} data={item} index={idx}/>
                ))}
            </div>

            <footer className="game-footer">
                <p>© 2025 All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com/Clxiu" target="_blank" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/lingxiu-cai-67a2291b3" target="_blank" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Timeline;
