import React from "react";
import {useGLTF} from "@react-three/drei";

const Lamp = () => {
    const {scene} = useGLTF("/models/lamp.glb");
    return (
        <primitive object={scene} position={[30, -12.6, -34]} scale={0.7} rotation={[0, Math.PI * 5 / 4, 0]}/>
    );
};

export default Lamp;
