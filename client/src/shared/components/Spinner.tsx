import React from 'react'

interface SpinnerProps {
    show: boolean
}

const Spinner = ({
    show
}: SpinnerProps) => {
    return show ? (
        <div className='absolute w-full h-full flex justify-center items-center top-0 left-0 bg-white opacity-50'>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black"></div>
        </div>
    ) : null
}

export default Spinner