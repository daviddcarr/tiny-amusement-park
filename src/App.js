import './App.css'
import { Canvas } from "@react-three/fiber"

import Scene from "./components/Scene";
import Main from "./components/ui/Main";

function App() {
  return (
    <div className="app w-100 h-screen">
      <Canvas
        shadows
        camera={{ 
          position: [12, 5, 0],
          near: 0.01,
        }}
        >
        <Scene />
      </Canvas>
      <Main />
    </div>
  )
}

export default App;
