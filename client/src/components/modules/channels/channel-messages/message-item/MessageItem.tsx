import moment from 'moment'
import React, { useContext } from 'react'
import { AuthContext } from '../../../../../contexts/auth/AuthContext'
import { userImage } from '../../../../../utils/filePath'

interface MessageItemProps {
    messageData: any
}

const MessageItem = ({
    messageData
}: MessageItemProps) => {
    const { message, createdAt, sender } = messageData

    const { user } = useContext(AuthContext)
    return (
        <div className={`flex items-center my-4 px-4 ${user._id == sender._id ? 'justify-end flex-row-reverse rtl' : ''}`}>
            {
                user._id !== sender._id && (
                    <div className='group -mt-4 min-w-max'>
                        <img className='w-10 h-10 rounded-full mx-2 shadow-md' src={userImage(sender.imagePath)} />
                        <p className='group-hover:block hidden absolute w-max -ml-8 mt-1 text-sm bg-gray-700 text-white p-2 rounded-md'>
                            {sender.firstname} {sender.lastname}
                        </p>
                    </div>
                )
            }
            <div className='flex flex-col'>
                <span className='w-fit px-4 py-2 rounded-md text-white bg-primary-400'>
                    {message}
                </span>
                <span className='text-xs text-slate-500'>
                    {moment(createdAt).fromNow()}
                </span>
            </div>
        </div>
    )
}

export default MessageItem