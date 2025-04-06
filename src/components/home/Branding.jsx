import React from "react"

const Branding = () => {
    const data = [
        {
            id: "01",
            heading: "Programming Languages",
            desc: "Python, JavaScript, C#, Java, R, MATLAB"
        },
        {
            id: "02",
            heading: "Frontend Development",
            desc: "React.js, HTML5, CSS3, JQuery, JavaScript, Bootstrap"
        },
        {
            id: "03",
            heading: "Backend Development & Cloud",
            desc: "Node.js, Flask, .NET, AWS, MySQL, SQLite"
        },
        {
            id: "04",
            heading: "Machine Learning & Computer Vision",
            desc: "Computer Vision, CNN, PyTorch, OpenCV"
        },
        {
            id: "05",
            heading: "Project Management",
            desc: "Team Leadership, Project Planning, Agile, Project Documentation"
        },
        {
            id: "06",
            heading: "Soft Skills",
            desc: "Communication, Problem-solving, Agile Methodology, Team Collaboration"
        },
    ]
    return (
        <section className="branding">
            <div className="container grid">
                {data.map((value) => (
                    <div className="branding-card" key={value.id}>
                        <div className="branding-card-id">{value.id}</div>
                        <h2>{value.heading}</h2>
                        <p>{value.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Branding