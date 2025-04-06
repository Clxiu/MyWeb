import React from "react";
import {useGLTF} from "@react-three/drei";

const Book = () => {
    const {scene: bookScene} = useGLTF("/models/book.glb");
    return (
        <primitive object={bookScene} position={[35, -48.5, 56]} scale={7} rotation={[0, -Math.PI / 3, 0]}/>
    );
};

export default Book;