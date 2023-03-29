import {
    useRef,
    useEffect
} from "react"
import {
    useThree,
    useFrame
} from "@react-three/fiber"
import { 
    useGLTF,
    useAnimations
} from "@react-three/drei"

export default function Tower(props) {

    return (
        <>
            <TowerStructure />
            <TowerAnimated />
        </>
    )
}

function TowerStructure(props) {

    const tower = useGLTF('./glb/3P_Tower.glb')

    tower.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <primitive object={tower.scene} {...props} />
    )
}

function TowerAnimated(props) {

    const tower = useGLTF('./glb/3P_TowerChasis.glb')
    const animation = useAnimations(tower.animations, tower.scene)

    tower.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {

        const actions = animation.actions
        actions['TowerChasisAction'].reset().fadeIn(0.5).play()

    }, [animation.actions])

    return (
        <primitive object={tower.scene} {...props} />
    )

}