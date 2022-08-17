import { Button } from 'src/shared/components'
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { courseImage } from 'src/utils/filePath'
import { SubscriptionsService } from '../services/subscription.service'
import { showToast } from 'src/utils'

const levelColor = (level: string) => {
    let color = 'success'
    if (level == 'ADVANCED') {
        color = 'secondary'
    } else if (level == 'INTERMEDIATE') {
        color = 'primary'
    }
    return `text-${color}-500 bg-${color}-50 border border-${color}-500`
}

const CourseItem = ({
    course,
    user
}: any) => {

    const subscriptionsService = new SubscriptionsService()

    const participants = new Set(course.participants)
    const isSubscribed = participants.has(user)

    const onSubscribe = async () => {
        try {
            const { data } = await subscriptionsService.create({
                user,
                course: course._id
            })
            console.log(data)

            showToast('success', 'Subscription request sent successfully')
        } catch (e: any) {
            let message = 'Error sending subscription request'
            if(e.response?.status == 400){
                message = e.response?.data?.message
            }
            showToast('error', message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-between cursor-pointer rounded-lg border hover:shadow-lg'>
            <div className='w-full h-full flex items-center'>
                <img className='w-9/12 mx-auto' src={courseImage(course.poster)} />
            </div>
            <div className='p-4 bg-white w-full rounded-b-lg'>
                <h6 className='text-2xl text-center'> {course.label} </h6>
                <div className='flex items-center justify-between mt-4'>
                    <span className={`flex items-center gap-1 text-xs p-2 rounded-2xl ${levelColor(course.level)}`}>
                        {course.level}
                    </span>
                    {
                        isSubscribed ? (
                            <span className='flex items-center mx-2 gap-1'>
                                <FaUsers />
                                {course.participants.length}
                            </span>
                        ) : (
                            <Button onClick={onSubscribe} color='primary'>
                                Subscribe
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseItem