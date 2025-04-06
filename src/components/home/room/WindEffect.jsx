import React, {useEffect, useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const WindEffect = () => {
    const particleRef = useRef();
    const kiteRef = useRef();

    const {scene: kite} = useGLTF("/models/kite.glb");

    // initialize wind particle
    useEffect(() => {
        const particleCount = 300;
        const positions = new Float32Array(particleCount * 3);
        const speeds = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = Math.random() * 100 - 150; // x
            positions[i * 3 + 1] = Math.random() * 60;  // y
            positions[i * 3 + 2] = Math.random() * 100 - 50; // z
            speeds.push(0.2 + Math.random() * 0.3);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.1,
            transparent: true,
            opacity: 0.3,
        });

        const particles = new THREE.Points(geometry, material);
        particleRef.current.add(particles);
        particles.userData.speeds = speeds;
    }, []);

    // wind particle movement
    useFrame(() => {
        if (particleRef.current) {
            const particles = particleRef.current.children[0];
            const pos = particles.geometry.attributes.position.array;
            const speeds = particles.userData.speeds;
            for (let i = 0; i < speeds.length; i++) {
                pos[i * 3] += speeds[i]; // x
                // reset particle when hits wall
                if (pos[i * 3] > 100) {
                    pos[i * 3] = -100;
                    pos[i * 3 + 1] = Math.random() * 60 + 10;  // y
                    pos[i * 3 + 2] = Math.random() * 100 - 50; // z
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;
        }
    });

    // moving kite
    useFrame(({clock}) => {
        if (kiteRef.current) {
            // left/right + up/down movement
            const t = clock.getElapsedTime();
            kiteRef.current.rotation.z = Math.sin(t) * 0.1;
            kiteRef.current.position.y = Math.sin(t) * 0.1 - 50;
        }
    });

    return (
        <group>
            <primitive ref={kiteRef} object={kite} position={[-20, -90, 40]} scale={5}/>
            <group ref={particleRef}/>
        </group>
    );
};

export default WindEffect;
