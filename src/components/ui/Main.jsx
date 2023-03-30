import { useState } from "react"

import {
    TbInfoHexagon
} from 'react-icons/tb'

import useCameraState from "../../hooks/useCameraState"

export default function Main() {

    const [hasInteracted, setHasInteracted] = useState(false)
    const [showInfo, setShowInfo] = useState(false)

    const [
        isRidingRide,
        disableIsRidingRide,
        clearCurrentRide,
        resetCameraPosition
    ] = useCameraState(state => [
        state.isRidingRide,
        state.disableIsRidingRide,
        state.clearCurrentRide,
        state.resetCameraPosition
    ])

    return ( 
        <div className="absolute inset-0 z-100 w-full h-screen pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 p-3">
                { !hasInteracted && !isRidingRide && <span
                    className="bg-blue-500 px-4 py-2 rounded-lg text-white text-bold">
                        Try Tapping A Ride!
                    </span>
                }   
                { isRidingRide && <button 
                    className="bg-gray-700 px-4 py-2 rounded-lg text-white uppercase text-bold hover:bg-red-500 pointer-events-auto"
                    onClick={() => {
                        disableIsRidingRide()
                        clearCurrentRide()
                        resetCameraPosition()
                        setHasInteracted(true)
                    }}
                    >
                    Exit
                </button> }
                <button
                    className={`${showInfo ? 'bg-red-400' : 'bg-gray-700'} px-4 py-2 rounded-lg text-white uppercase text-bold hover:bg-red-500 pointer-events-auto`}
                    onClick={() => setShowInfo(!showInfo)}
                    >
                    <TbInfoHexagon className="h-[24px] w-[24px]" />
                </button>
            </div>

            { showInfo &&
                <div className="absolute w-full max-w-lg top-[50px] left-1/2 -translate-x-1/2 space-x-4 p-4 flex items-center pointer-events-auto">
                    <div className="bg-gray-700 bg-opacity-90 p-4 rounded-lg">
                        <h1 className="text-2xl text-white font-bold mb-4">Three.js Tiny Park!</h1>

                        <p className="text-white mb-4">
                            This is a small demo of a 3D park built with Three.js and React.
                        </p>

                        <p className="text-white mb-4">
                            Tap any of the rides to enter a POV!
                        </p>

                        <p className="text-white mb-4">
                            Check out more of my work at <a href="https://daviddylancarr.com" target="_blank" className="text-blue-400 hover:text-blue-200">daviddylancarr.com</a>
                        </p>
                    </div>
                </div>
            }


        </div>
    )
}