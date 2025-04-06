import React from "react";
import {useGLTF} from "@react-three/drei";

const Guitar = () => {
    const {scene} = useGLTF("/models/guitar.glb");
    return (
        <primitive object={scene} position={[-50, -50, 2]} scale={90} rotation={[0, Math.PI / 4, Math.PI / 10]}/>
    );
};

export default Guitar;