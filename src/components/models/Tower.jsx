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

export default function Tower(props) {

    return (
        <>
            <TowerStructure />
            <TowerAnimated />
        </>
    )
}

function TowerStructure(props) {

    const [
        enableIsRidingRide, 
        setCurrentRide
    ] = useCameraState(state => [
        state.enableIsRidingRide,
        state.setCurrentRide
    ])

    const tower = useGLTF('./glb/3P_Tower.glb')

    tower.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <primitive 
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('tower')
            }}
            object={tower.scene}
            {...props}
            />
    )
}

function TowerAnimated(props) {

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

    const tower = useGLTF('./glb/3P_TowerChasis.glb')
    const animation = useAnimations(tower.animations, tower.scene)

    tower.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {

        const actions = animation.actions
        actions['TowerChasisAction'].reset().fadeIn(0.5).play()

    }, [animation.actions])

    useEffect(() => {
        if ( tower.scene ) {
            const towerChasis = tower.scene.getObjectByName('TowerChasis')
            if ( towerChasis ) {
                frontChasisRef.current = towerChasis

                const chasisCamera = new THREE.Object3D()
                chasisCamera.position.set(0, 0, 1)
                chasisCamera.rotation.set(0, Math.PI, 0)
                towerChasis.add(chasisCamera)
                chasisCameraRef.current = chasisCamera
            }
        }

    }, [tower.scene])

    useFrame(() => {

        if  (isRidingRide && currentRide === 'tower' && chasisCameraRef.current) {
            const chasisCamera = chasisCameraRef.current

            camera.position.copy(chasisCamera.getWorldPosition(new THREE.Vector3()))

        }

    })

    return (
        <primitive
            onClick={() => {
                enableIsRidingRide()
                setCurrentRide('tower')
            }}
            object={tower.scene}
            {...props}
            />
    )

}