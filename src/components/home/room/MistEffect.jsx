import React, {useMemo} from "react";
import {useGLTF} from "@react-three/drei";
import * as THREE from "three";

const MistEffect = () => {
    const {scene: mist} = useGLTF("/models/cloud.glb");

    // define clipping plane
    const boxSize = [200, 200, 200];
    const boxCenter = [0, 20, 30];

    const clippingPlanes = useMemo(() => [
        new THREE.Plane(new THREE.Vector3(1, 0, 0), -(boxCenter[0] - boxSize[0] / 2)),  // left
        new THREE.Plane(new THREE.Vector3(-1, 0, 0), boxCenter[0] + boxSize[0] / 2),   // right
        new THREE.Plane(new THREE.Vector3(0, 1, 0), -(boxCenter[1] - boxSize[1] / 2)),  // bottom
        new THREE.Plane(new THREE.Vector3(0, -1, 0), boxCenter[1] + boxSize[1] / 2),   // top
        new THREE.Plane(new THREE.Vector3(0, 0, 1), -(boxCenter[2] - boxSize[2] / 2)),  // front
        new THREE.Plane(new THREE.Vector3(0, 0, -1), boxCenter[2] + boxSize[2] / 2),   // back
    ], []);

    // apply clipping
    useMemo(() => {
        mist.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone();
                child.material.clippingPlanes = clippingPlanes;
                child.material.clipShadows = true;
            }
        });
    }, [mist, clippingPlanes]);

    return (
        <>
            <primitive object={mist} scale={75}/>
        </>
    );
};

export default MistEffect;
