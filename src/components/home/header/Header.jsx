import React, {useEffect, useState} from "react"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {AutoStories, ConnectWithoutContact, DarkMode, Home, LightMode, Web, Yard} from '@mui/icons-material';

const Header = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const changeTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode)
        localStorage.setItem("theme", newMode ? "dark" : "light")

        // update page
        document.body.classList.toggle("dark-mode", newMode);
    }

    // set body class when enter the page
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode])

    // change Icon colour
    const getIconColor = (lightColor, darkColor) => (darkMode ? darkColor : lightColor);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            const header = document.querySelector("header");
            header.classList.toggle("active", window.scrollY > 100);
        });
    }, []);


    return (
        <header className="header">
            <Navbar expand="lg" className={darkMode ? "navbar-dark" : "navbar-light"}
                    style={{background: darkMode ? "#125659" : "#7de3de", color: darkMode ? "#ffffff" : "#000000"}}>
                <Container>
                    <Navbar.Brand href="#home">
                        <img src="/assets/logo.png" alt="logo" width={80} height={80}/>
                        <span className={"big-shoulders"} style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginLeft: "10px",
                            color: darkMode ? "#ffffff" : "#000000"
                        }}>
              LingX.dev
              </span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{marginRight: "50px"}}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home"><Home
                                sx={{color: getIconColor("#3b9c92", "#c9f4ef")}}/> Home</Nav.Link>
                            <Nav.Link href="#about"><AutoStories
                                sx={{color: getIconColor("#44c5c9", "#bef1f3")}}/> About</Nav.Link>
                            <Nav.Link href="#projects"><Web sx={{color: getIconColor("#4aadd4", "#b8e3ff")}}/> Projects</Nav.Link>
                            <Nav.Link href="#contact"><ConnectWithoutContact
                                sx={{color: getIconColor("#4a93d4", "#b3d8ff")}}/> Contact</Nav.Link>
                            <NavDropdown title={<><Yard sx={{color: getIconColor("#2d8187", "#a3d3d8")}}/> Fun</>}
                                         id="basic-nav-dropdown" menuVariant={darkMode ? "dark" : "light"}>
                                <NavDropdown.Item href="#action/3.1">Something1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Something2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something3</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{position: "absolute", right: "5%", top: "50px", transform: "translateY(-50%)"}}>
                <button onClick={changeTheme} className="theme-toggle-btn"
                        style={{background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem",}}>
                    {darkMode ? <LightMode sx={{color: '#ffffff'}}/> : <DarkMode/>}
                </button>
            </div>
        </header>
    )
}

export default Header