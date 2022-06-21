import React from 'react';

interface SelectProps {
    children: any;
    [x: string]: any;
}

const Select = ({ children, ...props }: SelectProps) => {
    return <select className="w-full py-1 px-2 border border-gray-300 
        rounded mt-1 outline outline-hidden focus:border-primary-300 
        focus:outline-none focus:ring-1" {...props} >
            {children}
        </select>;
};

export default Select;
