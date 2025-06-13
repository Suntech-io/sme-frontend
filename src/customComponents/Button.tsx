import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import IconifyIcon from "./IconifyIcon"
import { cn } from "@/lib/utils";


interface ButtonLoadingProps {
    title: string;
    outline?: boolean;
    disabled?: boolean;
    leftIcon?: string;
    rightIcon?: string;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    bgColor?: string,
    fontSize?: string | number;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null;
}


export default function ButtonLoading({
    title,
    leftIcon,
    rightIcon,
    loading = false,
    variant = 'default',
    outline,
    disabled,
    bgColor,
    onClick,
    className,
    fontSize = "1.375rem",
}: ButtonLoadingProps) {
    return (
        <Button disabled={loading} className={cn('flex items-center justify-center gap-1', outline ? 'bg-transparent text-inherit border border-current hover:bg-accent-foreground/5' : '', className)} onClick={onClick} style={{ backgroundColor: bgColor }} variant={variant || "default"}>
            {/* icon and loading */}
            {<div className={cn("iconOrLoading", (loading || leftIcon) ? 'block' : 'hidden')}>
                {/* loading */}
                <Loader2 className={cn("animate-spin", loading ? 'block' : 'hidden')} />
                {/* icon */}
                {leftIcon && <div className={cn("icon", loading ? 'hidden' : 'block')}>
                    <IconifyIcon icon={leftIcon} className=""/>
                </div>}
            </div>}
            <p>
                {title}
            </p>

            {rightIcon && <div className={cn("rightIcon", loading ? 'hidden' : 'block')}>
                <IconifyIcon icon={rightIcon} className="" />
            </div>}
        </Button>
    )
}
