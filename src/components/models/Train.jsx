import {
    useRef,
    useEffect
} from "react"
import * as THREE from "three"
import {
    useThree,
    useFrame
} from "@react-three/fiber"
import { 
    useGLTF,
    useAnimations
} from "@react-three/drei"

import useCameraState from "../../hooks/useCameraState"

export default function Train(props) {

    return (
        <>
            <TrainTracks />
            <TrainAnimated />
        </>
    )

}

function TrainTracks(props) {

    const [
        enableIsRidingRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.enableIsRidingRide,
        state.setCurrentRide
    ])
    
    const tracks = useGLTF('./glb/3P_TrainTracks.glb')

    tracks.scene.children.forEach((mesh) => {
        mesh.receiveShadow = true
    })

    return (
        <primitive 
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('train')
            }}
            object={tracks.scene} 
            {...props} 
            />
    )
    
}

function TrainAnimated(props) {

    const [
        isRidingRide, 
        enableIsRidingRide, 
        currentRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.isRidingRide,
        state.enableIsRidingRide,
        state.currentRide,
        state.setCurrentRide
    ])

    const { camera } = useThree()

        const frontChasisRef = useRef()
        const chasisCameraRef = useRef()
    
    const train = useGLTF('./glb/3P_Train.glb')
    const animation = useAnimations(train.animations, train.scene)

    train.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {
        const actions = animation.actions
        actions['TrainCar1Action'].reset().fadeIn(0.5).play()
        actions['TrainCar2Action'].reset().fadeIn(0.5).play()
        actions['TrainCarEngineAction'].reset().fadeIn(0.5).play()

    }, [animation.actions])

    useEffect(() => {
        if (train.scene) {
            const frontChasis = train.scene.getObjectByName('TrainChasisEngine')
            if (frontChasis) {
                frontChasisRef.current = frontChasis

                const chasisCamera = new THREE.Object3D()
                chasisCamera.position.set(0, 0, -0.6)
                frontChasis.add(chasisCamera)
                chasisCameraRef.current = chasisCamera
            }
        }

    }, [train.scene])

    useFrame(() => {

        if (isRidingRide && currentRide === 'train' && chasisCameraRef.current) {
            const chasisCamera = chasisCameraRef.current

            camera.position.copy(chasisCamera.getWorldPosition(new THREE.Vector3()))

            camera.setRotationFromQuaternion(frontChasisRef.current.quaternion)
        }

    })

    animation.mixer.timeScale = 0.5

    return (
        <primitive 
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('train')
            }}
            object={train.scene} 
            {...props}
            />
    )
    
}