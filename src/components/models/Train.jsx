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

export default function Train(props) {

    return (
        <>
            <TrainTracks />
            <TrainAnimated />
        </>
    )

}

function TrainTracks(props) {
    
    const tracks = useGLTF('./glb/3P_TrainTracks.glb')

    tracks.scene.children.forEach((mesh) => {
        mesh.receiveShadow = true
    })

    return (
        <primitive object={tracks.scene} {...props} />
    )
    
}

function TrainAnimated(props) {
    
    const train = useGLTF('./glb/3P_Train.glb')
    const animation = useAnimations(train.animations, train.scene)

    useEffect(() => {
        const actions = animation.actions
        actions['TrainCar1Action'].reset().fadeIn(0.5).play()
        actions['TrainCar2Action'].reset().fadeIn(0.5).play()
        actions['TrainCarEngineAction'].reset().fadeIn(0.5).play()

    }, [animation.actions])

    train.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    animation.mixer.timeScale = 0.5

    return (
        <primitive object={train.scene} {...props} />
    )
    
}