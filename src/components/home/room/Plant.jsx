import React from "react";
import {useGLTF} from "@react-three/drei";

const Plant = () => {
    const {scene} = useGLTF("/models/plant.glb");
    return (
        <primitive object={scene} position={[73, -33.5, -10]} scale={1}/>
    );
};

export default Plant;