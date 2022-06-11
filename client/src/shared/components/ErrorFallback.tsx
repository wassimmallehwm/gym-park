import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '.'
import { ErrorContext } from '../../contexts/error/ErrorContext'

const ErrorFallback = ({ children }: any) => {
    const { error, setError } = useContext(ErrorContext)
    const navigate = useNavigate();

    const goBack = () => {
        setError(null)
        navigate(-1)
    }

    const tryAgain = () => {
        setError(null)
        error?.tryAgain()
    }
    return error ? (
        <div className='w-full h-full mt-16 flex justify-center items-center flex-col'>
            <p>Something went wrong:</p>
            <p className='text-3xl text-gray-600'>{error?.status}</p>
            <pre>{error?.message}</pre>
            <div className='flex gap-4'>
                <Button color='blue' onClick={tryAgain}>
                    Try again
                </Button>
                <Button color='red' outline onClick={goBack}>
                    Go back
                </Button>
            </div>
        </div>
    ) : children
}

export default ErrorFallback