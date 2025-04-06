import React from "react";
import {useGLTF} from "@react-three/drei";

const Rhythm = () => {
    const {scene} = useGLTF("/models/rhythm.glb");
    return (
        <primitive object={scene} position={[-63, 27, 65]} scale={10} rotation={[0, Math.PI / 2, 0]}/>
    );
};

export default Rhythm;