'use client';

import React from 'react'
import ButtonLoading from '../customComponents/Button';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();

    const handleGoHome = () => {
        const home = '/private/dashboard';
        router.push(home);
    }

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className="centerStage flex flex-col items-center gap-4">
                <p>This is the 404 Page</p>
                <ButtonLoading title='take me home' onClick={handleGoHome} />
            </div>
        </div>
    )
}

export default page
