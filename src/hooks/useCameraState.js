import create from "zustand"

export default create((set) => {

    return {
        isRidingRide: false,
        enableIsRidingRide: () => set({ isRidingRide: true }),
        disableIsRidingRide: () => set({ isRidingRide: false }),

        currentRide: null,
        setCurrentRide: (ride) => set({ currentRide: ride }),
        clearCurrentRide: () => set({ currentRide: null }),
    }
})