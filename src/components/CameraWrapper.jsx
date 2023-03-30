import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import useCameraState from "../hooks/useCameraState"

const CameraWrapper = () => {
  const { camera } = useThree()
  const setCameraRef = useCameraState((state) => state.setCameraRef)

  useEffect(() => {
    setCameraRef(camera)
  }, [setCameraRef, camera])

  return null
}

export default CameraWrapper
