import React from 'react'
import { fromNow } from 'src/utils/dateFormat'
import { forumImage, userImage } from 'src/utils/filePath'

interface ForumItemProps {
    post: any
}

const ForumItem = ({
    post
}: ForumItemProps) => {
    return (
        <div key={post._id} className='bg-white py-6 rounded-md'>
            <div className='flex items-center my-2 px-4'>
                <img className='w-12 h-12 rounded-full mx-2 shadow-md' src={userImage(post.user?.imagePath)} />
                <div className='flex flex-col'>
                    <span className='text-md'>
                        {post.user?.firstname} {post.user?.lastname}
                    </span>
                    <span className='text-xs text-slate-500'>
                        {fromNow(post.createdAt)}
                    </span>
                </div>
            </div>
            <p className='px-4 my-2'> {post.body} </p>
            <img className='w-full mx-auto' src={forumImage(post.mediaPath)} />
        </div>
    )
}

export default ForumItem