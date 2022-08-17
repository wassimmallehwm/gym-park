import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { FaImage, FaTrash } from 'react-icons/fa'
import { Button, PageTitle } from '../../../../shared/components'
import { showToast } from '../../../../utils'
import { forumImage, userImage } from '../../../../utils/filePath'
import { ForumService } from '../forum.service'

const ForumPage = () => {
    const [forumData, setForumData] = useState<string>('')
    const [forumList, setForumList] = useState<any>([])
    const [page, setPage] = useState<number>(1)
    const [forumMedia, setForumMedia] = useState<any>()
    const [mediaPreview, setMediaPreview] = useState<any>()
    const [totalItems, setTotalItems] = useState<number>(0)
    const mediaRef = useRef<any>();
    const forumService = new ForumService()

    const resetData = () => {
        setForumData('')
        setMediaPreview(null)
        setForumMedia(null)
    }

    const mediaPreviewHandler = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setForumMedia(file)
            setMediaPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }

    const removeImg = () => {
        setForumMedia(null)
        setMediaPreview(null)
    }

    const getUniqueListBy = (arr: any, key: string) => {
        //return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
        //return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    const getForumList = () => {
        forumService.list({
            page
        }).then(
            (res: any) => {
                if (res.data.docs.length > 0) {
                    setTotalItems(res.data.total)
                    setForumList((prev: any[]) => ([...prev, ...res.data.docs]))
                }
            },
            error => {
                console.log(error)
            }
        )
    }

    const onForumCreate = async () => {
        let formData = new FormData();
        formData.append('media', forumMedia);
        formData.append('body', forumData)
        try {
            const result = await forumService.createForumPost(formData)
            setForumList((prev: any[]) => ([result.data, ...prev]))
            resetData()
            showToast('success', 'Post created successfully')
        } catch (error: any) {
            showToast('error', 'An error occured while creating a post')
            console.log(error)
        }
    }

    useEffect(() => {
        getForumList()
    }, [page])

    return (
        <div className="main-div">
            <PageTitle color="primary">Forum</PageTitle>
            <div className='w-11/12 md:w-4/6 lg:w-1/2 mx-auto mt-4'>
                <div className='bg-white p-4 rounded-md'>
                    <textarea name="description" placeholder="Create your post" value={forumData}
                        onChange={(e: any) => setForumData(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1">
                    </textarea>
                    <input ref={mediaRef} type="file" name="poster" onChange={mediaPreviewHandler} className="hidden" />
                    {
                        mediaPreview && <img className='w-56 mx-auto my-4 shadow-md' src={mediaPreview} />
                    }
                    <div className='my-2 flex items-center justify-between'>
                        <div>
                            <Button title="Attach image" onClick={() => mediaRef.current.click()} color="primary" outline rounded>
                                <FaImage />
                            </Button>
                            {
                                forumMedia && (
                                    <Button title="Remove image" onClick={removeImg} color="secondary" outline rounded>
                                        <FaTrash />
                                    </Button>
                                )
                            }

                        </div>
                        <Button title="Create" onClick={onForumCreate} color="primary">
                            Post
                        </Button>
                    </div>
                </div>
                <div className='mt-20 flex flex-col gap-8'>
                    {
                        forumList ?
                            forumList.length > 0 ? (
                                <>
                                    {
                                        forumList.map((item: any) => (
                                            <div key={item._id} className='bg-white py-6 rounded-md'>
                                                <div className='flex items-center my-2 px-4'>
                                                    <img className='w-12 h-12 rounded-full mx-2 shadow-md' src={userImage(item.user?.imagePath)} />
                                                    <div className='flex flex-col'>
                                                        <span className='text-md'>
                                                            {item.user?.firstname} {item.user?.lastname}
                                                        </span>
                                                        <span className='text-xs text-slate-500'>
                                                            {moment(item.createdAt).fromNow()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className='px-4 my-2'> {item.body} </p>
                                                <img className='w-full mx-auto' src={forumImage(item.mediaPath)} />
                                            </div>
                                        ))
                                    }
                                    {
                                        forumList.length > 0 && totalItems > forumList.length &&
                                        <span onClick={() => setPage((prev: number) => ++prev)} className='text-center text-primary-600 cursor-pointer underline'>
                                            Load more
                                        </span>
                                    }
                                </>
                            )

                                : (
                                    <p>Empty</p>
                                )
                            : (
                                <p>Error</p>
                            )
                    }


                </div>
            </div>
        </div>
    )
}

export default ForumPage