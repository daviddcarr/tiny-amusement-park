import { useState } from "react"

import useCameraState from "../../hooks/useCameraState"

export default function Main() {

    const [hasInteracted, setHasInteracted] = useState(false)

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
            </div>
        </div>
    )
}