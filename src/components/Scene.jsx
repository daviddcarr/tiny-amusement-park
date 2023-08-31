import {
    useEffect,
    useRef
} from 'react'
import {
    useThree
} from '@react-three/fiber'
import {
    Environment,
    OrbitControls,
    PointerLockControls,
} from '@react-three/drei'
import {
    EffectComposer,
    DepthOfField,
    Bloom,
} from '@react-three/postprocessing'

import useCameraState from '../hooks/useCameraState'

import Coaster from './models/Coaster'
import FerrisWheel from './models/FerrisWheel'
import ParkGround from './models/ParkGround'
import Tower from './models/Tower'
import Train from './models/Train'
import Trees from './models/Trees'

export default function Scene() {

    const ocRef = useRef()

    const [
        isRidingRide,
    ] = useCameraState(state => [
        state.isRidingRide,
    ])


    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight
                castShadow
                position={[5, 5, -5]}
                intensity={0.9}
                // shadow-mapSize={[1024, 1024]}
                shadow-camera-top={8}
                shadow-camera-right={8}
                shadow-camera-bottom={-8}
                shadow-camera-left={-9}
                shadow-bias={-0.0005}
                />
            <color attach="background" args={['#ccf2ff']} />
            <Environment files={"sunset_fairway_2k.hdr"} />
            { !isRidingRide && <EffectComposer>
                <DepthOfField 
                    focusDistance={0} 
                    focalLength={0.08} 
                    bokehScale={2} 
                    height={480} />
                <Bloom 
                    intensity={0.5}
                    luminanceThreshold={0.9}
                    luminanceSmoothing={1.3}
                    height={500} />
            </EffectComposer> }
            <OrbitControls
                ref={ocRef}
                enablePan={false}
                maxDistance={20}
                autoRotate={!isRidingRide}
                autoRotateSpeed={0.5}
                />

            <group>

                <Coaster />
                <Trees />
                <Tower />
                <Train />
                <FerrisWheel />

                <ParkGround />
            </group>
        </>
    )

}