import React, { useRef } from 'react'
import { FaImage, FaTrash } from 'react-icons/fa'
import { Button } from '../../../../shared/components'

interface ForumFormProps {
    forumData: any
    mediaPreview: any
    forumMedia: any
    setForumMedia: any
    setMediaPreview: any
    setForumData: any
    onForumCreate: any
}

const ForumForm = ({
    forumData,
    mediaPreview,
    forumMedia,
    setForumMedia,
    setMediaPreview,
    setForumData,
    onForumCreate
}: ForumFormProps) => {

    const mediaRef = useRef<any>();

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

    return (
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
    )
}

export default ForumForm