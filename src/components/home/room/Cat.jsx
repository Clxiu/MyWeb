import React from "react";
import {useGLTF} from "@react-three/drei";

const Cat = () => {
    const {scene} = useGLTF("/models/cat.glb");
    return (
        <primitive object={scene} position={[-55, -41, 16]} scale={7} rotation={[0, Math.PI * 2 / 3, 0]}/>
    );
};

export default Cat;