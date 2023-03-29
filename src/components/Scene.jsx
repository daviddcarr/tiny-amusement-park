
import {
    Environment,
    OrbitControls
} from '@react-three/drei'
import {
    EffectComposer,
    DepthOfField,
    Bloom,
} from '@react-three/postprocessing'
import Coaster from './models/Coaster'
import FerrisWheel from './models/FerrisWheel'


import ParkGround from './models/ParkGround'
import Tower from './models/Tower'
import Train from './models/Train'
import Trees from './models/Trees'

export default function Scene() {

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight
                castShadow
                position={[0, 5, -10]}
                intensity={0.9}
                />
            <color attach="background" args={['#ccf2ff']} />
            <Environment preset="sunset" />
            <EffectComposer>
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
            </EffectComposer>
            <OrbitControls 
                enablePan={false}
                maxDistance={20}
                autoRotate
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