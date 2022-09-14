import React from 'react'
import { useNavigate } from 'react-router-dom'
import homeImg from '../../../../../assets/home.webp'

const GuestHome = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full'>
            <div className='absolute top-0 left-0 w-full z-20 py-6 px-8 gap-3 text-slate-100 flex items-center justify-end'>
                <button className='font-bold shadow-md'>
                    Contact us
                </button>
                <span>|</span>
                <button onClick={() => navigate('/login')} className='font-bold shadow-md'>
                    Login
                </button>
            </div>
            <div className="bg-blue-200 grid grid-rows-1 grid-flow-col gap-1">

                <div className="col-span-11 relative">
                    <div className="w-full h-full flex items-baseline absolute top-0 left-0 bg-black bg-opacity-60">
                        <div className="h-1/2 my-auto mx-8 text-slate-200">
                            <span className="text-6xl m-8 font-bold">Welcome to Gym Park</span>
                            <div className='font-bold my-8'>
                                <p className="text-4xl mx-12 my-4">
                                    Practice hard
                                </p>
                                <p className="text-4xl mx-12 my-4">
                                    Play strong
                                </p>
                                <p className="text-4xl mx-12 my-4">
                                    Pain is glory
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className="w-full" src={homeImg} alt="Gym Space Logo" />
                </div>
            </div>
        </div>
    )
}

export default GuestHome