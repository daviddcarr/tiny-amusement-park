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

export default function Coaster(props) {
    
    return (
        <>
            <CoasterStructure />
            <CoasterAnimated />
        </>
    )

}

function CoasterStructure(props) {
    const coaster = useGLTF('./glb/3P_Coaster.glb')

    coaster.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <primitive object={coaster.scene} {...props} />
    )
}

function CoasterAnimated(props) {
    
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
    
        return (
            <primitive object={coaster.scene} {...props} />
        )
    
}