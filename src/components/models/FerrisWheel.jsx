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

export default function FerrisWheel(props) {

    return (
        <>
            <FerrisSupports />
            <FerrisWheelAnimated />
        </>
    )


}

function FerrisSupports(props) {

    const supports = useGLTF('./glb/3P_FerrisSupport.glb')

    supports.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })
    
    return (
        <primitive object={supports.scene} {...props} />
    )
    
}

function FerrisWheelAnimated(props) {

    const wheel = useGLTF('./glb/3P_FerrisWheel.glb')
    const animation = useAnimations(wheel.animations, wheel.scene)

    wheel.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    useEffect(() => {

        const actions = animation.actions
        console.log(actions)
        actions['Ride.FerrisWheelAction'].reset().fadeIn(0.5).play()
        for (let i = 1; i < 13; i++) {
            actions['Chasis.' + i].reset().fadeIn(0.5).play()
        }

        animation.mixer.timeScale = 0.25

    }, [animation.actions])
    
    return (
        <primitive object={wheel.scene} {...props} />
    )
    
}
