import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppSettingsStore  {
    noMaxWidthStatus: boolean
}

interface AppSettingsActions  {
    updatenoMaxWidthStatus: (status: boolean) => void
}

export const useAppSettingsStore = create<AppSettingsStore & AppSettingsActions>()(
    persist((set) => ({
        noMaxWidthStatus: false,
        updatenoMaxWidthStatus(status) {
            set((state) => ({
                noMaxWidthStatus: status
            }))
        },
    }), {
        name: 'App Settings',
        partialize: (state) => ({
            // noMaxWidthStatus: state.noMaxWidthStatus
        }),
    })
)
