import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Button } from '../../../../../../shared/components'
import { courseContentFile } from '../../../../../../utils/filePath';

interface CourseMediaProps {
    courseId: string
    media: any
    onChange: any
    onChangePoster: any
    onChangeMedia: any
    progress: any
}

const CourseMedia = ({
    courseId,
    media,
    onChange,
    onChangePoster,
    onChangeMedia,
    progress
}: CourseMediaProps) => {
    const {
        label,
        description,
        path,
        poster
    } = media;
    const [posterPreview, setPosterPreview] = useState<any>()
    const [mediaPreview, setMediaPreview] = useState<any>()

    const fileRef = useRef<any>();
    const posterRef = useRef<any>();

    const mediaCallback = (file: File, reader: FileReader) => {
        onChangeMedia(file);
        setMediaPreview(reader.result)
    }

    const posterCallback = (file: File, reader: FileReader) => {
        onChangePoster(file);
        setPosterPreview(reader.result)
    }

    const filePreviewHandler = (e: any, callback: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            callback(file, reader)
        }
        reader.readAsDataURL(file)
    }

    const displayMediaFile = () => {
        if (mediaPreview && mediaPreview !== "") {
            return mediaPreview
        } else if (path && path !== "") {
            return courseContentFile(courseId, path)
        }
        return null
    }

    const displayImagePreview = () => {
        if (posterPreview && posterPreview !== "") {
            return posterPreview
        } else if (poster && poster !== "") {
            return courseContentFile(courseId, poster)
        }
        return null
    }

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
                    className="w-full p-2 border border-gray-300 rounded mt-1">
                </textarea>
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block mb-2">
                    Media file
                </label>
                <Button onClick={() => fileRef.current.click()} color='blue' outline>Pick file</Button>
                {
                    displayMediaFile() && <video className='m-auto my-2 max-h-40 shadow-lg' preload="none" src={displayMediaFile()!} 
                        controls />
                }
                <input ref={fileRef} type="file" name="mediafile" onChange={(e: any) => filePreviewHandler(e, mediaCallback)} className="hidden" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block mb-2">
                    Media poster image
                </label>
                <Button onClick={() => posterRef.current.click()} color='blue' outline>Pick Image</Button>
                {
                    displayImagePreview() && <img className='m-auto my-2 max-h-40 shadow-lg' src={displayImagePreview()} />
                }
                <input ref={posterRef} type="file" name="posterfile" onChange={(e: any) => filePreviewHandler(e, posterCallback)} className="hidden" />
            </div>
        </form>
    )
}

export default CourseMedia