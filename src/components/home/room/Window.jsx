import React from "react";
import {useGLTF} from "@react-three/drei";

const Window = () => {
    const {scene} = useGLTF("/models/window.glb");
    return (
        <primitive object={scene} position={[60, -15, 12]} scale={1} rotation={[0, -Math.PI / 2, 0]}/>
    );
};

export default Window;
