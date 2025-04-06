import React from "react";
import {useGLTF} from "@react-three/drei";

const Desk = () => {
    const {scene} = useGLTF("/models/desk.glb"); // 加载 电脑桌 模型
    return (
        <primitive object={scene} position={[-10, -50, -40]} scale={0.5}/>
    );
};

export default Desk;
