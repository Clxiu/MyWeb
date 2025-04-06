import React, {useMemo} from "react";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";

const SunEffect = () => {
    const {scene: originalSun} = useGLTF("/models/sun.glb");
    const glassGltf = useGLTF("/models/sunglass.glb");
    const sunScene = useMemo(() => originalSun.clone(true), [originalSun]);

    const glowLayers = [
        {scale: 12, opacity: 0.07, color: "#fcb900"},
        {scale: 30, opacity: 0.05, color: "#ffc629"},
        {scale: 50, opacity: 0.04, color: "#ffc629"},
    ];

    return (
        <group>
            <primitive object={glassGltf.scene} position={[10, 65, 25]} scale={200}/>
            <primitive ref={sunScene} object={sunScene} position={[-20, 85, 25]} scale={7}/>

            {glowLayers.map(({scale, opacity, color}, index) => (
                <mesh key={index} position={[-20, 85, 25]}>
                    <sphereGeometry args={[scale, 32, 32]}/>
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={opacity}
                        side={THREE.BackSide}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default SunEffect;
