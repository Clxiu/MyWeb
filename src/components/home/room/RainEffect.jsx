import React, {useEffect, useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";
import {MeshReflectorMaterial} from "@react-three/drei";

const RainEffect = () => {
    const rainRef = useRef();
    const groundRef = useRef();
    const {scene: rainScene, clock, camera} = useThree();

    // initialize rain particles as line segments
    const rainCount = 3000;
    const positions = new Float32Array(rainCount * 6);
    const speeds = [];

    for (let i = 0; i < rainCount; i++) {
        const x = Math.random() * 70 - 25;
        const y = Math.random() * 10 - 60;
        const z = Math.random() * 35;
        positions[i * 6 + 0] = x;
        positions[i * 6 + 1] = y;
        positions[i * 6 + 2] = z;
        positions[i * 6 + 3] = x;
        positions[i * 6 + 4] = y - 2; // end of line slightly below start
        positions[i * 6 + 5] = z;
        speeds.push(0.1 + Math.random() * 0.4);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
        color: 0xaaaaaa,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
    });

    // ripple shader setup
    useEffect(() => {
        geometry.attributes.position.needsUpdate = true;

        const geometryPlane = new THREE.PlaneGeometry(70, 35);
        const rippleUniforms = {
            uTime: {value: 0},
        };

        const rippleMaterial = new THREE.ShaderMaterial({
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;

        #define MAX_RADIUS 2
        #define HASHSCALE1 .1031
        #define HASHSCALE3 vec3(.1031, .1030, .0973)

        float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * HASHSCALE1);
          p3 += dot(p3, p3.yzx + 19.19);
          return fract((p3.x + p3.y) * p3.z);
        }

        vec2 hash22(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * HASHSCALE3);
          p3 += dot(p3, p3.yzx + 19.19);
          return fract((p3.xx + p3.yz) * p3.zy);
        }

        void main() {
          vec2 fragCoord = vUv * 512.0;
          float resolution = 10.0;
          vec2 uv = fragCoord / 512.0 * resolution;
          vec2 p0 = floor(uv);
          vec2 circles = vec2(0.0);

          for (int j = -MAX_RADIUS; j <= MAX_RADIUS; ++j) {
            for (int i = -MAX_RADIUS; i <= MAX_RADIUS; ++i) {
              vec2 pi = p0 + vec2(i, j);
              vec2 hsh = pi;
              vec2 p = pi + hash22(hsh);
              float t = fract(0.3 * uTime + hash12(hsh));
              vec2 v = p - uv;
              float d = length(v) - float(MAX_RADIUS + 1) * t;
              float h = 1e-3;
              float d1 = d - h;
              float d2 = d + h;
              float p1 = sin(31. * d1) * smoothstep(-0.6, -0.3, d1) * smoothstep(0.0, -0.3, d1);
              float p2 = sin(31. * d2) * smoothstep(-0.6, -0.3, d2) * smoothstep(0.0, -0.3, d2);
              circles += 0.5 * normalize(v) * ((p2 - p1) / (2.0 * h) * (1.0 - t) * (1.0 - t));
            }
          }

          circles /= float((MAX_RADIUS * 2 + 1) * (MAX_RADIUS * 2 + 1));
          vec3 n = vec3(circles, sqrt(1.0 - dot(circles, circles)));
          vec3 viewDir = normalize(vec3(120,80,240));
          vec3 light = normalize(vec3(100,50,240));
          vec3 reflectDir = reflect(-light, n);
          float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
          vec3 baseColor = vec3(0.75, 0.72, 0.55);
          float rippleStrength = length(circles);
          float edgeHighlight = smoothstep(0.1, 0.4, rippleStrength);
          vec3 finalColor = baseColor + edgeHighlight * vec3(1.0);
          gl_FragColor = vec4(finalColor, edgeHighlight * 0.2);
        }
      `,
            uniforms: rippleUniforms,
            transparent: true,
            depthWrite: false,
        });

        const ripplePlane = new THREE.Mesh(geometryPlane, rippleMaterial);
        ripplePlane.rotation.x = -Math.PI / 2;
        ripplePlane.position.set(10, -49.89, 20);
        groundRef.current.add(ripplePlane);

        // animate ripple time
        const update = () => {
            rippleMaterial.uniforms.uTime.value = clock.getElapsedTime();
            requestAnimationFrame(update);
        };
        update();
    }, [rainScene, clock, camera]);

    // raindrop movement
    useFrame(() => {
        const pos = geometry.attributes.position.array;
        for (let i = 0; i < rainCount; i++) {
            pos[i * 6 + 1] -= speeds[i];
            pos[i * 6 + 4] -= speeds[i];

            // reset raindrop when hits the ground
            if (pos[i * 6 + 1] < -50) {
                const x = Math.random() * 70 - 25;
                const z = Math.random() * 35;
                const y = Math.random() * 100 - 30;
                pos[i * 6 + 0] = x;
                pos[i * 6 + 1] = y;
                pos[i * 6 + 2] = z;
                pos[i * 6 + 3] = x;
                pos[i * 6 + 4] = y - 2;
                pos[i * 6 + 5] = z;
            }
        }
        geometry.attributes.position.needsUpdate = true;
    });

    return (
        <>
            {/* rain lines */}
            <lineSegments ref={rainRef} geometry={geometry} material={material}/>

            {/* reflective wet ground*/}
            <mesh position={[0, -50, 30]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[155, 155]}/>
                <MeshReflectorMaterial
                    blur={[150, 50]}
                    resolution={512}
                    mixBlur={1}
                    mixStrength={1.5}
                    roughness={0.8}
                    depthScale={0.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.25}
                    color="#A17B5E"
                    metalness={0.2}
                    transparent={true}
                    opacity={0.8}
                />
            </mesh>

            {/* ripple ground */}
            <group ref={groundRef}/>
        </>
    );
};

export default RainEffect;