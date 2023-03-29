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

export default function Coaster(props) {
    
    return (
        <>
            <CoasterStructure />
            <CoasterAnimated />
        </>
    )

}

function CoasterStructure(props) {

    const [
        enableIsRidingRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.enableIsRidingRide,
        state.setCurrentRide
    ])

    const coaster = useGLTF('./glb/3P_Coaster.glb')

    coaster.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <primitive
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('coaster')
            }}
            object={coaster.scene} 
            {...props} 
            />
    )
}

function CoasterAnimated(props) {

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
    
        const coaster = useGLTF('./glb/3P_CoasterTrain.glb')
        const animation = useAnimations(coaster.animations, coaster.scene)

        console.log(animation)
    
        coaster.scene.children.forEach((mesh) => {
            mesh.castShadow = true
        })
        useEffect(() => {
            const actions = animation.actions
            actions['Chasis.Chair.001'].reset().fadeIn(0.5).play()
            actions['Chasis.Chair.002'].reset().fadeIn(0.5).play()
            actions['Chasis.Chair.003'].reset().fadeIn(0.5).play()
            actions['CoasterCar1Action'].reset().fadeIn(0.5).play()
            actions['CoasterCar2Action'].reset().fadeIn(0.5).play()
            actions['CoasterCar3Action'].reset().fadeIn(0.5).play()

        }, [animation.actions])

        useEffect(() => {
            if (coaster.scene) {
                const frontChasis = coaster.scene.getObjectByName('CoasterChasisFront')
                if (frontChasis) {
                    frontChasisRef.current = frontChasis

                    const chasisCamera = new THREE.Object3D()
                    chasisCamera.position.set(0, 0.25, -0.5)
                    frontChasis.add(chasisCamera)
                    chasisCameraRef.current = chasisCamera
                }
            }
        }, [coaster.scene])

        useFrame(() => {

            if (isRidingRide && currentRide === 'coaster' && chasisCameraRef.current) {
                const chasisCamera = chasisCameraRef.current
                
                camera.position.copy(chasisCamera.getWorldPosition(new THREE.Vector3()))

                camera.setRotationFromQuaternion(frontChasisRef.current.quaternion)

            }

        })
    
        return (
            <primitive 
                onClick={() => {
                    enableIsRidingRide()
                    setCurrentRide('coaster')
                }}
                object={coaster.scene} 
                {...props} 
                />
        )
    
}