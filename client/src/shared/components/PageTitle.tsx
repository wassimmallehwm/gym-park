import React from 'react'

interface PageTitleProps {
    color?: string
    children?: any
}

const PageTitle = ({
    color = 'primary',
    children
}: PageTitleProps) => {
    return (
        <div className={`bg-${color}-400 rounded-md w-11/12 h-10 mx-auto my-4 flex justify-center items-center`}>
            <h4 className="text-slate-100">
                {children}
            </h4>
        </div>
    )
}

export default PageTitle
