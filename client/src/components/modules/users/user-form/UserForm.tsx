import moment from 'moment';
import React from 'react'

interface UserFormProps {
    userData: any,
    onChange: any,
    rolesList: any,
    onChangeRole: any
}

const UserForm = ({
    userData,
    onChange,
    rolesList,
    onChangeRole
}: UserFormProps) => {
    const {
        firstname,
        lastname,
        email,
        phone,
        sex,
        birthdate,
        roles
    } = userData;

    
    return (
        <form action="" className="space-y-6">
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Firstname
                </label>
                <input type="text" name="firstname" value={firstname} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Lastname
                </label>
                <input type="text" name="lastname" value={lastname} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Email
                </label>
                <input type="email" name="email" value={email} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Phone number
                </label>
                <input type="tel" name="phone" value={phone} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Birthdate
                </label>
                <input type="date" name="birthdate" value={moment(birthdate).format('YYYY-MM-DD')} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1" />
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Sex
                </label>
                <select name="sex" value={sex} onChange={onChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1">
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                </select>
            </div>
            <div>
                <label className="text-sm font-bold text-gray-600 block">
                    Roles
                </label>
                <div className='flex justify-between items-center my-4'>
                    {
                        rolesList && rolesList.map((roleItem: any) => (
                            <>
                            <label className='flex items-center cursor-pointer'>
                                <input onChange={() => onChangeRole(roleItem.label)} className='w-6 h-6 mx-2 cursor-pointer accent-primary-400' type='checkbox' checked={roles.find((elem: any) => elem._id == roleItem._id)} />
                                {roleItem.label}
                            </label>
                            </>
                        ))
                    }
                </div>
            </div>
        </form>
    )
}

export default UserForm
