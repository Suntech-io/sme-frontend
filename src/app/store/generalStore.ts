import {create } from 'zustand'
import { persist } from 'zustand/middleware'

// types
import { TProductViews } from '@/types/generalTypes'

interface IGeneralStore{
    currentProductView:string
}

interface IGneneralStoreActions{
    updateCurrentProductView:(view:string)=>void
}

export const useGeneralStore = create<IGeneralStore & IGneneralStoreActions>()(
    persist((set) => ({
        currentProductView: 'products',
        updateCurrentProductView(view) {
            set((state) => ({
                currentProductView: view
            }))
        },
    }), {
        name: 'General Store',
        partialize: (state) => ({
            currentProductView: state.currentProductView
        }),
    })
) 