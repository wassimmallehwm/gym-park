import React, { useEffect, useRef, useState } from 'react'
import EventsEmitter from 'src/utils/events'
import { forumImage } from 'src/utils/filePath'
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
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editPost, setEditPost] = useState<string>()
    const forumService = new ForumService()

    const scrollRef = useRef<any>();

  const scrollToTop = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

    const resetData = () => {
        setForumData('')
        setMediaPreview(null)
        setForumMedia(null)
        setIsEdit(false)
        setEditPost('')
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
        if(forumMedia){
            formData.append('media', forumMedia);
        }
        formData.append('body', forumData)
        try {
            if(isEdit){
                let editData: any = {body: forumData} 
                if(forumMedia){
                    editData = formData
                }
                const { data } = await forumService.editForumPost(editPost!, editData)
                setForumList((prev: any) => prev.map((elem: any) => {
                    if(elem._id == data._id){
                        return data
                    }
                    return elem
                }))
            } else {
                const result = await forumService.createForumPost(formData)
                setForumList((prev: any[]) => ([result.data, ...prev]))
                showToast('success', 'Post created successfully')
            }
            resetData()
        } catch (error: any) {
            showToast('error', 'An error occured while creating a post')
            console.log(error)
        }
    }

    const onForumDelete = async (postId: string) => {
        try {
            await forumService.deleteForumPost(postId)
            setForumList((prev: any[]) => prev.filter((elem: any) => elem._id != postId))
            showToast('success', 'Post deleted successfully')
        } catch (error: any) {
            showToast('error', 'An error occured while deleting a post')
            console.log(error)
        }
    }

    const onForumEdit = (data: any) => {
        scrollToTop()
        setIsEdit(true)
        setEditPost(data)
        const edit = forumList.find((elem: any) => elem._id == data)
        setForumData(edit.body)
        setMediaPreview(forumImage(edit.mediaPath))
    }

    useEffect(() => {
        EventsEmitter.on('forum-post-delete', async (data: any) => {
            await onForumDelete(data)
        })
        EventsEmitter.on('forum-post-edit', async (data: any) => {
            //await onForumDelete(data)
            onForumEdit(data)
        })

        return () => {
            EventsEmitter.off('forum-post-delete')
            EventsEmitter.off('forum-post-edit')
        }
    }, [forumList])

    useEffect(() => {
        getForumList()
    }, [page])

    return (
        <div ref={scrollRef} className="main-div">
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
                    isEdit={isEdit}
                    cancel={resetData}
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