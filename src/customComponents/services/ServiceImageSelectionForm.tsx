import React from 'react'
import IconifyIcon from '../IconifyIcon'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const ServiceImageSelectionForm = () => {
    return (
        <div className='flex flex-col h-full'>
            {/* image selection */}
            <div className="imageSelection ">
                <label htmlFor='productImages' className=' flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive'>Product images <span className='text-red-500'>*</span></label>
                <div className="selectionContainer bg-[#F7F9FF] h-[227px] border border-dashed mt-2 rounded flex flex-col items-center justify-center gap-2">
                    {/* image icon */}
                    <IconifyIcon icon='mage:image-upload' fontSize={40} className='text-lg text-blue-600' />
                    <div className="textSection text-center">
                        <p className='text-sm'> <label className='text-blue-600' htmlFor='productImages'>Click here</label> to upload or drag and drop</p>
                        <p className='text-xs'>Maximum file size 2MB</p>
                        <input type='file' className='hidden' id='productImages' />
                    </div>
                </div>
            </div>

            {/* Choose a sample image here */}
            <div className="chooseSampleImages mt-8 h-full overflow-hidden flex flex-col relative">
                <p className='text-sm'>Choose a sample image here</p>

                <div className="sampleImages mt-2 flex flex-col overflow-y-auto">
                    <div className="container">
                        <div className="avatar flex items-center gap-4 flex-wrap overflow-y-auto">
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                            <Avatar className='size-22 rounded-lg'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>
                                    <IconifyIcon icon='mage:image-upload' />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceImageSelectionForm
