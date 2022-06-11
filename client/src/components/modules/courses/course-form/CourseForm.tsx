import moment from 'moment';
import React, { useRef, useState } from 'react'
import { Button } from '../../../../shared/components';
import { courseImage } from '../../../../utils/filePath';

interface CourseFormProps {
    courseData: any,
    onChange: any,
    onChangeFile: any,
    onChangeIsPrivate: any
}

const CourseForm = ({
    courseData,
    onChange,
    onChangeFile,
    onChangeIsPrivate
}: CourseFormProps) => {
    const {
        label,
        description,
        level,
        date,
        poster,
        isPrivate
    } = courseData;
    const [posterPreview, setPosterPreview] = useState<any>()

    const posterRef = useRef<any>();

    const posterPreviewHandler = (e: any) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            onChangeFile(file)
            setPosterPreview(reader.result)
        }

        reader.readAsDataURL(file)
    }

    const displayPreview = () => {
        if (posterPreview && posterPreview !== "") {
            return posterPreview
        } else if (poster && poster !== "") {
            return courseImage(poster)
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
            <label className='flex items-center cursor-pointer'>
                <input onChange={onChangeIsPrivate} className='w-6 h-6 mx-2 cursor-pointer accent-blue-600' type='checkbox' checked={isPrivate} />
                Private
            </label>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Level
                </label>
                <select name="level" value={level} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1">
                    <option disabled selected>Select the course level</option>
                    <option value='BEGINER'>Beginner</option>
                    <option value='INTERMEDIATE'>Intermediate</option>
                    <option value='ADVANCED'>Advanced</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Date du cours
                </label>
                <input type="date" name="date" value={moment(date).format('YYYY-MM-DD')} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block mb-2">
                    Course poster
                </label>
                <Button onClick={() => posterRef.current.click()} color='blue' outline>Pick Image</Button>
                {
                    displayPreview() && <img className='m-auto my-2 max-h-40 shadow-lg' src={displayPreview()} />
                }
                <input ref={posterRef} type="file" name="poster" onChange={posterPreviewHandler} className="hidden" />
            </div>
        </form>
    )
}

export default CourseForm
