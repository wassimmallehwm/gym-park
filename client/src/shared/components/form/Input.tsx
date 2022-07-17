import React from 'react';

interface InputProps {
    [x: string]: any;
}

const Input = ({ ...props }: InputProps) => {
    let editableClass = " bg-white py-1 px-2 border border-gray-300"
    if(props.disabled){
        editableClass = " bg-transparent border-none p-0"
    }
    return props.textarea ? (
        <textarea className={`w-full resize-none rounded mt-1 outline-hidden focus:border-primary-300 focus:outline-none focus:ring-1 ${editableClass}`} 
        disabled={props.disabled} {...props}></textarea>
    ) : (
        <input className={`w-full rounded mt-1 outline-hidden focus:border-primary-300 focus:outline-none focus:ring-1 ${editableClass}`} 
        disabled={props.disabled} {...props} />
    );
};

export default Input;
