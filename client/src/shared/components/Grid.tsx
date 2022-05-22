import React from 'react';
interface GridProps {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    cols?: number
    gap?: number
    children?: any
}
const Grid = ({
    xs,
    sm,
    md,
    lg,
    cols,
    gap,
    children
}: GridProps) => {
    let className: string = 'grid'
    if(cols){
        className += ` grid-cols-${cols}`
    } else {
        className += xs ? ` xs:grid-cols-${xs}` : ` grid-cols-1`
        if(sm){
            className += ` sm:grid-cols-${sm}`
        }
        if(md){
            className += ` md:grid-cols-${md}`
        }
        if(lg){
            className += ` lg:grid-cols-${lg}`
        }
    }
    if(gap){
        className += ` gap-${gap}`
    }
    return <div className={className}>
        {children}
    </div>;
};

export default Grid;
