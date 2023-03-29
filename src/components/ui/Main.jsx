import useCameraState from "../../hooks/useCameraState"

export default function Main() {

    const [
        isRidingRide,
        disableIsRidingRide,
        clearCurrentRide
    ] = useCameraState(state => [
        state.isRidingRide,
        state.disableIsRidingRide,
        state.clearCurrentRide
    ])

    return ( isRidingRide &&
        <div className="absolute inset-0 z-100 w-full h-screen">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-3 p-3">
                <button 
                    className="bg-gray-700 px-4 py-2 rounded-lg text-white uppercase text-bold hover:bg-red-500"
                    onClick={() => {
                        disableIsRidingRide()
                        clearCurrentRide()
                    }}
                    >
                    Exit
                </button>
            </div>
        </div>
    )
}