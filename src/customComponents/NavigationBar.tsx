'use client'

import React from 'react'
import Button from './Button'
import TopNavbarLinks, { TopNavBarLinksProps } from './TopNavBarLinks'

import { useRouter } from 'next/navigation'

const NavigationBar = () => {
    const links: TopNavBarLinksProps[] = [
        { type: 'single', title: 'About', href: '/' },
        { type: 'single', title: 'Services', href: '/services' },
        { type: 'single', title: 'Contact Us', href: '/contact' },
        // {type:'single',title:'Blog',href:'/blog'},
        // {type:'single',title:'Testimonials',href:'/testimonials'},
        { type: 'single', title: 'FAQs', href: '/faqs' },
        { type: 'single', title: 'Privacy Policy', href: '/privacy-policy' },
        { type: 'single', title: 'Terms of Service', href: '/terms-of-service' },
        { type: 'single', title: 'Careers', href: '/careers' },
    ]

    const router = useRouter()

    const goToRegister = () => {
        router.push('/register')
    }

    const goToLogin = () => {
        router.push('/login')
    }

    return (
        <div className="top-0 sticky z-50 flex p-4 px-6 items-center justify-between bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            {/* logo */}
            <div className="logo">logo</div>
            {/* midsection */}
            <div className="midSection flex items-center justify-center gap-2">
                <TopNavbarLinks links={links} />
            </div>
            {/* authActions */}
            <div className="authActions flex items-center justify-center gap-2">
                <Button title='Register' outline className='cursor-pointer' onClick={goToRegister} />
                <Button title='Login' className='cursor-pointer' onClick={goToLogin} />
            </div>
        </div>
    )
}

export default NavigationBar
