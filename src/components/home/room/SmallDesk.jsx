import React from "react";
import {useGLTF} from "@react-three/drei";

const SmallDesk = () => {
    const {scene} = useGLTF("/models/small_desk.glb");
    return (
        <primitive object={scene} position={[57, -50, -25]} scale={0.5} rotation={[0, -Math.PI / 2, 0]}/>
    );
};

export default SmallDesk;