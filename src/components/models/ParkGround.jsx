import { useGLTF } from "@react-three/drei"

export default function ParkGround(props) {

    const park = useGLTF('./glb/3P_Ground.glb')

    park.scene.children.forEach((mesh) => {
        mesh.receiveShadow = true
    })

    return (
        <primitive object={park.scene} {...props} />
    )
}