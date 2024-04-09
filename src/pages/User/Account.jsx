import React from 'react'

export default function Account() {
    return (
        <div>
            <div className='lg:px-28 lg:py-20'>
                <div className='md:flex flex-col gap-y-20'>
                    <div className='lg:flex justify-between'>
                        <div className='hidden md:inline-block'>Home / My Account</div>
                        <div>Welcome! Md Rimel</div>
                    </div>
                    <div className='lg:flex gap-16'>
                        <div className='lg:w-1/5'>
                            <div className='font-semibold text-lg'>Manage my account</div>
                            <ul className='flex flex-col gap-y-1 py-1 pl-10'>
                                <li className='text-red-500'>My Profile</li>
                                <li>Address Book</li>
                                <li>My Payment Options</li>
                            </ul>
                            <div className='font-semibold text-lg'>My Orders</div>
                            <ul className='flex flex-col gap-y-1 py-1 pl-10'>
                                <li>My Returns</li>
                                <li>My Cancellations</li>
                            </ul>
                            <div className='font-semibold text-lg'>My Wishlist</div>
                        </div>
                        <div className='lg:w-4/5'>
                            <div className='py-6 px-10'>
                                <div className='flex flex-col gap-y-2'>
                                    <div className='text-xl text-red-500 font-semibold'>Edit Your Profile</div>
                                    <div>
                                        <div className='md:grid grid-cols-2 gap-y-4 gap-x-16'>
                                            <div className='flex flex-col gap-y-1'>
                                                <label htmlFor="" className='font-semibold'>First Name</label>
                                                <input type="text" placeholder='Md' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            </div>
                                            <div className='flex flex-col gap-y-1'>
                                                <label htmlFor="" className='font-semibold'>Last Name</label>
                                                <input type="text" placeholder='Rimel' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            </div>
                                            <div className='flex flex-col gap-y-1'>
                                                <label htmlFor="" className='font-semibold'>Email</label>
                                                <input type="text" placeholder='rimel@gmail.com' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            </div>
                                            <div className='flex flex-col gap-y-1'>
                                                <label htmlFor="" className='font-semibold'>Address</label>
                                                <input type="text" placeholder='vietnam' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-2.5 pt-2'>
                                            <label htmlFor="" className='font-semibold'>Password Changes</label>
                                            <input type="text" placeholder='Current Password' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            <input type="text" placeholder='New Password' className='px-2.5 py-2 bg-slate-100 rounded' />
                                            <input type="text" placeholder='Confirm New Password' className='px-2.5 py-2 bg-slate-100 rounded' />
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-8 py-2.5'>
                                        <div className='cursor-pointer'>Cancel</div>
                                        <button className='bg-red-600 text-white py-2.5 px-10 text-sm rounded'>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
