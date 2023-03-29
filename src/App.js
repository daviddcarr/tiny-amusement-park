import './App.css'
import { Canvas } from "@react-three/fiber"

import Scene from "./components/Scene";

function App() {
  return (
    <div className="app w-100 h-screen">
      <Canvas
        shadows
        camera={{ position: [12, 5, 0] }}
        >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
