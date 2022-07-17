import React from 'react'

interface ChannelsFormProps {
    channel: any
    onChange: any
}

const ChannelsForm = ({
    channel,
    onChange
}: ChannelsFormProps) => {
    const {
        label,
        description,
        isPrivate
    } = channel
    return (
        <form action="" className="space-y-6">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Label
                </label>
                <input type="text" name="label" value={label} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Description
                </label>
                <textarea name="description" value={description} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"></textarea>
            </div>
            <div>
                <div className='flex justify-between items-center my-4'>
                    <label className='flex items-center cursor-pointer'>
                        <input name='isPrivate' onChange={onChange} className='w-6 h-6 mx-2 cursor-pointer accent-blue-600' type='checkbox' checked={channel.isPrivate} />
                        Private
                    </label>

                </div>
            </div>
        </form>
    )
}

export default ChannelsForm