import {React} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

import Desk from "./Desk";
import Cloud from "./Cloud";
import Lamp from "./Lamp"
import Window from "./Window"
import SmallDesk from "./SmallDesk";
import Plant from "./Plant";
import Rhythm from "./Rhythm";
import Book from "./Book";
import Guitar from "./Guitar";
import Cat from "./Cat";
import RainEffect from "./RainEffect";
import SunEffect from "./SunEffect";
import DrizzleEffect from "./DrizzleEffect";
import SnowEffect from "./SnowEffect";
import ThunderEffect from "./ThunderEffect";
import MistEffect from "./MistEffect";
import WindEffect from "./WindEffect";

const RoomScene = ({weather}) => {
    console.log("Current Weather:", weather);
    return (
        <Canvas gl={{ localClippingEnabled: true }} shadows camera={{position: [150, 60, 230], fov: 55}}>
            <ambientLight intensity={1.5}/>
            <directionalLight position={[10, 20, 10]} intensity={2} castShadow color="#ffffff"/>

            {/* floor */}
            <mesh receiveShadow position={[0, -54, 30]}>
                <boxGeometry args={[155, 5, 155]}/>
                <meshStandardMaterial color="#A17B5E"/>
            </mesh>

            {/* walls */}
            <mesh position={[48.5, 23.5, -45.5]}>
                <boxGeometry args={[53, 150, 5]}/>
                <meshStandardMaterial color="#D3AFA2" transparent opacity={1}/>
            </mesh>
            <mesh position={[-48.5, 23.5, -45.5]}>
                <boxGeometry args={[53, 150, 5]}/>
                <meshStandardMaterial color="#D3AFA2" transparent opacity={1}/>
            </mesh>
            <mesh position={[0, 82, -45.5]}>
                <boxGeometry args={[44, 33, 5]}/>
                <meshStandardMaterial color="#D3AFA2" transparent opacity={1}/>
            </mesh>
            <mesh position={[0, -25, -45.5]}>
                <boxGeometry args={[44, 53, 5]}/>
                <meshStandardMaterial color="#D3AFA2" transparent opacity={1}/>
            </mesh>
            <mesh position={[-75, 23.5, 30]} rotation={[0, Math.PI / 2, 0]}>
                <boxGeometry args={[150, 150, 5]}/>
                <meshStandardMaterial color="#D3AFA2" transparent opacity={1}/>
            </mesh>

            {/* shelf */}
            <mesh position={[-65, 20, 65]}>
                <boxGeometry args={[20, 1.5, 50]}/>
                <meshStandardMaterial color="#A17B5E" transparent opacity={1}/>
            </mesh>

            <Cloud/>
            <Desk/>
            <Lamp/>
            <Window/>
            <SmallDesk/>
            <Plant/>
            <Rhythm/>
            <Book/>
            <Guitar/>
            <Cat/>
            {weather === "rain" && <RainEffect/>}
            {weather === "clear" && <SunEffect/>}
            {weather === "drizzle" && <DrizzleEffect/>}
            {weather === "snow" && <SnowEffect/>}
            {weather === "thunderstorm" && <ThunderEffect/>}
            {weather === "mist" && <MistEffect/>}
            {weather === "wind" && <WindEffect/>}
            <OrbitControls/>
        </Canvas>
    );
};

export default RoomScene;
