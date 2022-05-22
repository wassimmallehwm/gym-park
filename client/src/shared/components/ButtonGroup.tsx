import React from 'react'
import { IconType } from 'react-icons'
import { FaPlus, FaSave, FaUndo } from 'react-icons/fa'
import { Button } from '.'

interface ButtonGroupProps {
    save?: any,
    cancel?: any,
    group: string[]
}

const btns = [
    {
        label: 'save',
        Icon: FaSave,
        color: 'primary'
    },
    {
        label: 'cancel',
        Icon: FaUndo,
        color: 'secondary'
    }
]

const ButtonGroup = ({
    save,
    cancel,
    group
}: ButtonGroupProps) => {

    const click = (btn: string | undefined) => {
        switch(btn){
            case "save":
                save();
                break;
            case "cancel":
                cancel();
                break;
            default: 
                cancel();
        }
    }

    return (
        <>
            {
                group && group.map((item: string) => {
                    const btn = btns.find(elem => elem.label == item)
                    const Icon: any = btn?.Icon
                    return (
                        <Button key={btn?.label} title={btn?.label} onClick={() => click(btn?.label)} outline color={btn?.color!}>
                        <div className='flex items-center'>
                            <Icon size="14px" />
                            <span className='mx-1'>{btn?.label}</span>
                        </div>
                    </Button>
                    )
                })
            }
        </>
    )
}

export default ButtonGroup