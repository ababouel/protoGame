import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Stats } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useRef } from "react";
import { PointLight, Vector3 } from "three";

function Cam() {
    return (
    <>
        <PerspectiveCamera
        makeDefault 
        position={[0, 0, 545]} 
        fov={80}  
        near={0.1}  
        far={5000} 
        aspect={window.innerWidth/window.innerHeight}
        up={[0,0,1]}
        />
        <OrbitControls />
        <Stats/>
    </>
    )
};

function Light() {
    const lightRef = useRef<PointLight>(null);
    lightRef.current?.lookAt(0,0,0);
    return (
    <>
        <ambientLight intensity={0.5} />
        <pointLight ref={lightRef} position={[0, 0, 100]}/>
    </>
    )
};


export function CamScene() {
    return (
        <>
            <Cam/>
            <Light/>
        </>
    )
};