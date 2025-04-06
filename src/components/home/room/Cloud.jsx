import React, {useRef} from "react";
import {useGLTF} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

const Cloud = ({position = [10, 0, 20], scale = 10}) => {
    const mainRef = useRef();
    const altRef1 = useRef();
    const altRef2 = useRef();
    const {scene} = useGLTF("/models/cloud.glb");

    useFrame(({clock}) => {
        const y = Math.sin(clock.getElapsedTime()) * 0.3 + 60;
        if (mainRef.current) mainRef.current.position.y = y;
        if (altRef1.current) altRef1.current.position.y = y + 0.3;
        if (altRef2.current) altRef2.current.position.y = y + 0.6;
    });

    return (
        <>
            <primitive
                ref={mainRef}
                object={scene.clone()}
                position={position}
                scale={scale}
            />

            <primitive
                ref={altRef1}
                object={scene.clone()}
                position={[position[0] + 1.5, position[1], position[2] - 1]}
                scale={scale}
            />
            <primitive
                ref={altRef2}
                object={scene.clone()}
                position={[position[0] - 1.2, position[1], position[2] + 1]}
                scale={scale}
            />
        </>
    );
};

export default Cloud;
