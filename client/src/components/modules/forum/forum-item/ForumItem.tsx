import React, { useContext } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { AuthContext } from 'src/contexts'
import { hasRole } from 'src/utils'
import { fromNow } from 'src/utils/dateFormat'
import { forumImage, userImage } from 'src/utils/filePath'
import { Button } from '../../../../shared/components'
import ActionsDropdown from './actions-dropdown/ActionsDropdown'

interface ForumItemProps {
    post: any
}

const ForumItem = ({
    post
}: ForumItemProps) => {
    const { user } = useContext(AuthContext)
    const isAdmin = hasRole('ADMIN', user.roles)
    const isOwner = user._id == post.user?._id
    return (
        <div className='bg-white pt-4 rounded-md'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-between my-2 px-4'>
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
                <div className='flex align-center justify-center px-4 -mt-2'>
                    {
                        (isAdmin || isOwner) && 
                        <ActionsDropdown postId={post._id}/>
                        
                    }
                </div>
            </div>
            <p className='px-4 my-2'> {post.body} </p>
            <img className='w-full mx-auto' src={forumImage(post.mediaPath)} />
        </div>
    )
}

export default ForumItem