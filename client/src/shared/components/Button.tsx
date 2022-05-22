import React from 'react'

interface ButtonProps {
    color: string
    outline?: boolean
    rounded?: boolean
    children?: any
    [x:string]: any;
}

const Button = ({ 
    color,
    outline,
    rounded,
    children,
    ...props 
}: ButtonProps) => {

    const btnPadd = rounded ? 'px-2' : 'px-4'
    const btnClass = outline ?
    `text-${color}-500 border border-${color}-500 hover:bg-${color}-50 font-bold uppercase text-xs ${btnPadd} py-2 ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none mx-1 ease-linear transition-all duration-150`
    : `bg-${color}-400 text-white hover:bg-${color}-500 font-bold uppercase text-xs ${btnPadd} py-2 ${rounded ? 'rounded-full' : 'rounded'} shadow-lg hover:shadow-2xl outline-none focus:outline-none mx-1 ease-linear transition-all duration-150`
    return(
        <button {...props} className={btnClass} type="button">
            {children}
        </button>
    )
}

export default Button
