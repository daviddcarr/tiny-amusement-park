import create from "zustand"

export default create((set, get) => {

    return {
        useOrbitControls: true,
        enableOrbitControls: () => {
            set({ useOrbitControls: true })
            console.log("useOrbitControls enabled")
        },
        disableOrbitControls: () => {
            set({ useOrbitControls: false })
            console.log("useOrbitControls disabled")
        },

        usePointerLockControls: false,
        enablePointerLockControls: () => set({ usePointerLockControls: true }),
        disablePointerLockControls: () => set({ usePointerLockControls: false }),

        isRidingRide: false,
        enableIsRidingRide: () => {
            console.log("enableIsRidingRide")
            set({ isRidingRide: true })
        },
        disableIsRidingRide: () => {
            set({ isRidingRide: false })
            console.log("disableIsRidingRide")
        },

        currentRide: null,
        setCurrentRide: (ride) => set({ currentRide: ride }),
        clearCurrentRide: () => set({ currentRide: null }),

        cameraRef: null,
        setCameraRef: (ref) => set({ cameraRef: ref }),
        resetCameraPosition: () => {
            const { cameraRef } = get()
            if (cameraRef) {
                cameraRef.position.set(12, 5, 0)
            }
        }
    }
})