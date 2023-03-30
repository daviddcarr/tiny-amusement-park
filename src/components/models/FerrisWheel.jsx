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

export default function FerrisWheel(props) {

    return (
        <>
            <FerrisSupports />
            <FerrisWheelAnimated />
        </>
    )


}

function FerrisSupports(props) {

    const [
        enableIsRidingRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.enableIsRidingRide,
        state.setCurrentRide
    ])

    const supports = useGLTF('./glb/3P_FerrisSupport.glb')

    supports.scene.children.forEach((mesh) => {
        mesh.castShadow = true
        mesh.receiveShadow = true
    })
    
    return (
        <primitive 
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('ferrisWheel')
            }}
            object={supports.scene}
            {...props}
            />
    )
    
}

function FerrisWheelAnimated(props) {

    const [
        disableOrbitControls,
        enablePointerLockControls,
        isRidingRide, 
        enableIsRidingRide, 
        currentRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.disableOrbitControls,
        state.enablePointerLockControls,
        state.isRidingRide,
        state.enableIsRidingRide,
        state.currentRide,
        state.setCurrentRide
    ])

    const { camera } = useThree()

    const frontChasisRef = useRef()
    const chasisCameraRef = useRef()

    const wheel = useGLTF('./glb/3P_FerrisWheel.glb')
    const animation = useAnimations(wheel.animations, wheel.scene)

    wheel.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {

        const actions = animation.actions
        actions['Ride.FerrisWheelAction'].reset().fadeIn(0.5).play()
        for (let i = 1; i < 13; i++) {
            actions['FerrisChasis' + i].reset().fadeIn(0.5).play()
        }

    }, [animation])

    useEffect(() => {
        if (wheel.scene) {
            const frontChasis = wheel.scene.getObjectByName('Chasis1')
            if (frontChasis) {
                frontChasisRef.current = frontChasis

                const chasisCamera = new THREE.Object3D()
                chasisCamera.position.set(0, -0.25, -0.2)
                frontChasis.add(chasisCamera)
                chasisCameraRef.current = chasisCamera
            }
        }
    }, [wheel.scene])

    useFrame(() => {

        if (isRidingRide && currentRide === 'ferrisWheel' && chasisCameraRef.current) {

            const chasisCamera = chasisCameraRef.current
            
            camera.position.copy(chasisCamera.getWorldPosition(new THREE.Vector3()))

            // camera.setRotationFromQuaternion(frontChasisRef.current.quaternion)
        }

    })
    
    return (
        <primitive
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('ferrisWheel')
                disableOrbitControls()
            }}
            object={wheel.scene}
            {...props}
            />
    )
    
}
