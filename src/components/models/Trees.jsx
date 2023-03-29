import { useGLTF } from "@react-three/drei"

export default function Trees(props) {

    const trees = useGLTF('./glb/3P_Trees.glb')

    trees.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return (
        <primitive object={trees.scene} {...props} />
    )

}