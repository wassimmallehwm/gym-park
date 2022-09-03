import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { NoData, PageTitle } from '../../../../shared/components'
import { showToast } from '../../../../utils'
import ForumForm from '../forum-form/ForumForm'
import ForumItem from '../forum-item/ForumItem'
import { ForumService } from '../forum.service'

const ForumPage = () => {
    const [forumData, setForumData] = useState<string>('')
    const [forumList, setForumList] = useState<any>([])
    const [page, setPage] = useState<number>(1)
    const [forumMedia, setForumMedia] = useState<any>()
    const [mediaPreview, setMediaPreview] = useState<any>()
    const [totalItems, setTotalItems] = useState<number>(0)
    const forumService = new ForumService()

    const resetData = () => {
        setForumData('')
        setMediaPreview(null)
        setForumMedia(null)
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
                <ForumForm
                    forumData={forumData}
                    mediaPreview={mediaPreview}
                    forumMedia={forumMedia}
                    setForumMedia={setForumMedia}
                    setMediaPreview={setMediaPreview}
                    setForumData={setForumData}
                    onForumCreate={onForumCreate}
                />
                <div className='mt-20 flex flex-col gap-8'>
                    {
                        forumList.length > 0 ? (
                            <>
                                {
                                    forumList.map((item: any) => (
                                        <ForumItem key={item._id} post={item} />
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
                                <NoData/>
                            )
                    }


                </div>
            </div>
        </div>
    )
}

export default ForumPage