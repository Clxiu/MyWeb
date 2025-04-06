import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {useGLTF} from "@react-three/drei";

const SnowEffect = () => {
    const meshRef = useRef();
    const {scene: snow} = useGLTF("/models/snow.glb");
    const {scene: floor} = useGLTF("/models/snow_ground.glb");

    // initialize snow particles as sphere object
    const snowCount = 800;
    const dummy = new THREE.Object3D();
    const positions = [];
    const speeds = [];

    for (let i = 0; i < snowCount; i++) {
        const x = Math.random() * 70 - 25;
        const y = Math.random() * 10 - 60;
        const z = Math.random() * 35;
        positions.push(new THREE.Vector3(x, y, z));
        speeds.push(0.05 + Math.random() * 0.15);
    }

    // snow movement
    useFrame(() => {
        for (let i = 0; i < snowCount; i++) {
            const pos = positions[i];
            pos.y -= speeds[i];
            pos.x += Math.sin(Date.now() * 0.001 + i) * 0.01;

            // reset when hits the ground
            if (pos.y < -50) {
                pos.y = 60;
            }

            dummy.position.copy(pos);
            const scale = 0.3 + Math.random() * 0.3;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <>
            <primitive object={snow} position={[25, -47, 25]} scale={0.1}/>
            <primitive object={floor} position={[0, -56, 43.5]} scale={80} rotation={[0, Math.PI / 2, 0]}/>

            <instancedMesh ref={meshRef} args={[null, null, snowCount]}>
                <sphereGeometry args={[1.5, 8, 8]}/>
                <meshStandardMaterial color="#ffffff" transparent opacity={0.6}/>
            </instancedMesh>
        </>

    );
};

export default SnowEffect;
