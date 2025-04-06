import React, {useEffect, useMemo, useRef} from "react";
import {useGLTF} from "@react-three/drei";

const ThunderEffect = () => {
    const {scene: thunderScene} = useGLTF("/models/thunder.glb");
    const lightningRef1 = useRef();
    const lightningRef2 = useRef();
    const ambientRef = useRef();

    // get and clone the Thunder object
    const original1 = useMemo(() => thunderScene.getObjectByName("Lighting001_1"), [thunderScene]);
    const thunder1 = useMemo(() => original1?.clone(), [original1]);
    const original2 = useMemo(() => thunderScene.getObjectByName("Lighting003_0"), [thunderScene]);
    const thunder2 = useMemo(() => original2?.clone(), [original2]);

    // lightning flash effect loop (3s)
    useEffect(() => {
        // initialize, hide
        if (lightningRef1.current) lightningRef1.current.visible = false;
        if (lightningRef2.current) lightningRef2.current.visible = false;

        // sequence of light intensity step
        const flashSequence = () => {
            const steps = [1.8, 0, 1.5, 0, 1, 1.2, 0];
            const delays = [80, 60, 100, 60, 120, 150];

            let i = 0;
            const flicker = () => {
                const visible = steps[i] > 0;
                if (lightningRef1.current) lightningRef1.current.visible = visible;
                if (lightningRef2.current) lightningRef2.current.visible = visible;
                if (ambientRef.current) ambientRef.current.intensity = steps[i];

                i++;
                if (i < steps.length) {
                    setTimeout(flicker, delays[i - 1] || 100);
                }
            };
            flicker();
        };
        // loop every 3s
        const interval = setInterval(() => {
            flashSequence();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <group>
            {thunder1 && (
                <primitive
                    ref={lightningRef1}
                    object={thunder1}
                    scale={7}
                    position={[0, 55, 17]}
                    rotation={[0, Math.PI / 2, 0]}
                />
            )}

            {thunder2 && (
                <primitive
                    ref={lightningRef2}
                    object={thunder2}
                    scale={5}
                    position={[20, 55, 5]}
                    rotation={[0, 0, 0]}
                />
            )}

            <ambientLight ref={ambientRef} intensity={0}/>
        </group>
    );
};

export default ThunderEffect;
