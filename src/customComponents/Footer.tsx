import React from 'react'
import IconifyIcon from './IconifyIcon'

const Footer = () => {
    return (
        <div className='bg-primary px-8 pt-8'>
            {/* top section */}
            <section className="topSection flex justify-between gap-20 mb-10">
                {/* left side */}
                <div className="leftSide w-[45%]">
                    <div className="logo text-white text-xl">
                        Logo
                    </div>
                </div>

                {/* right side */}
                <div className="rightSide grow text-white flex justify-end">
                    <table className='w-full text-left'>
                        <thead>
                            <tr>
                                <th className='px-4 py-3'>Company</th>
                                <th className='px-4 py-3'>Contact</th>
                                <th className='px-4 py-3'>Country</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm text-gray-200'>
                            <tr>
                                <td className='px-4 py-1'>Alfreds Futterkiste</td>
                                <td className='px-4 py-1'>Maria Anders</td>
                                <td className='px-4 py-1'>Germany</td>
                            </tr>
                            <tr>
                                <td className='px-4 py-1'>Centro comercial Moctezuma</td>
                                <td className='px-4 py-1'>Francisco Chang</td>
                                <td className='px-4 py-1'>Mexico</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </section>

            {/* bottom section */}
            <section className="bottomSection flex items-center justify-between p-4 border-t text-gray-200 border-gray-500">
                {/* left under */}
                <div className="left text-sm text-white flex items-center gap-8">
                    <p className=''>© 2023 Your Company. All rights reserved.</p>
                    <p>Terms</p>
                    <p>Privacy</p>
                </div>
                {/* right under */}
                <div className="socialIcons flex items-center gap-2">
                    <IconifyIcon icon='akar-icons:twitter-fill' className='text-white ' />
                    <IconifyIcon icon='akar-icons:facebook-fill' className='text-white' />
                    <IconifyIcon icon='akar-icons:instagram-fill' className='text-white' />
                    <IconifyIcon icon='akar-icons:linkedin-fill' className='text-white' />
                </div>
            </section>
        </div>
    )
}

export default Footer
