import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils';
import React from 'react'


interface AppDividerProps {
  className?: string;
  text?: string;
  position?: 'left' | 'right' | 'center';
}

const AppDivider = ({ className, text, position = 'left' }: AppDividerProps) => {
  return (
    <div className={cn('flex items-center justify-between w-full overflow-hidden gap-1')}>
      {/* left divider */}
      <Separator className={cn(position == 'left' ? 'hidden' : 'block', 'grow flex-1')} />
      {/* text */}
      <span className={cn('mx-2 text-sm text-muted-foreground', text ? 'block' : 'hidden')}>{text}</span>
      {/* right divider */}
      {position !== 'right' && <Separator className='grow flex-1' />}
    </div>
  )
}

export default AppDivider
