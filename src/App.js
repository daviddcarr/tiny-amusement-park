import './App.css'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"

import Scene from "./components/Scene"
import Main from "./components/ui/Main"
import CameraWrapper from './components/CameraWrapper'
import Loading from './components/ui/Loading'

function App() {
  return (
    <Suspense fallback={<Loading />} >
      <div className="app w-100 h-screen">
        <Canvas
          shadows={{ 
            enabled: true,
            type: THREE.PCFSoftShadowMap
          }}
          camera={{ 
            position: [12, 5, 0],
            near: 0.01,
          }}
          >
          <CameraWrapper />
          <Scene />
        </Canvas>
        <Main />
      </div>
    </Suspense>
  )
}

export default App;
