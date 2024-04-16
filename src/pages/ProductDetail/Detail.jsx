import React from 'react';
import { Breadcrumb, Rate } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

export default function Detail() {
    const user = JSON.parse(localStorage.getItem('user_login'));
    console.log(user);
    let ram = ['32GB', '128GB', '512GB', '1T'];
    return (
        <div>
            <div className='lg:px-28 lg:py-20 px-4 py-2'>
                <div className='md:flex flex-col gap-y-20'>
                    <div className='hidden md:inline-block'>
                        <Breadcrumb
                            items={[
                                { title: 'Account' },
                                { title: 'Gaming' },
                                { title: 'Havic HV G-92 Gamepad' }
                            ]}
                        />
                    </div>
                    <div className='md:flex gap-20'>
                        <div className='flex w-3/5 gap-8'>
                            <div className='md:grid grid-cols-1 md:w-1/4 gap-y-2.5 hidden'>
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className='border-2 border-slate-500 rounded'>
                                        <img
                                            src='https://hanoicomputercdn.com/media/product/37583_gamepad_sony_ps4_dualshock4_wireless_controller_xanh_chinhhang_0001_1.jpg'
                                            alt=''
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='md:w-3/4 border-2 border-slate-500 rounded'>
                                <div className='flex justify-center items-center h-full'>
                                    <img
                                        src='https://hanoicomputercdn.com/media/product/37583_gamepad_sony_ps4_dualshock4_wireless_controller_xanh_chinhhang_0001_1.jpg'
                                        alt=''
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='md:w-2/5'>
                            <div className='flex flex-col gap-y-4'>
                                <div className='text-2xl font-semibold'>Havic HV G-92 Gamepad</div>
                                <div className='flex gap-4'>
                                    <div className='flex gap-2.5 items-center'>
                                        <div>
                                            <Rate disabled defaultValue={4} className='text-sm' />
                                        </div>
                                        <div className='text-sm'>(150 review)</div>
                                    </div>
                                    <div className='px-4 border-l-2 border-green-500 text-green-400'>In Stock</div>
                                </div>
                                <div className='text-2xl'>$192.00</div>
                                <div className='text-sm font-semibold py-2'>
                                    PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy
                                    bubble free install & mess free removal Pressure sensitive.
                                </div>
                                <div className='my-2 border border-slate-300'></div>
                                <div className='flex gap-8 items-center'>
                                    <div>Colours: </div>
                                    <div className='flex gap-4'>
                                        <div className='rounded-full bg-red-500 border w-[20px] h-[20px]'></div>
                                        <div className='rounded-full bg-green-500 border w-[20px] h-[20px]'></div>
                                    </div>
                                </div>
                                <div className='flex gap-8 items-center'>
                                    <div>Size: </div>
                                    <div className='flex gap-4'>
                                        {ram.map((e, i) => (
                                            <div key={i} className='px-2 py-1 border border-black rounded'>
                                                {e}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex md:gap-10 gap-0 md:gap-y-2 '>
                                    <div className='w-2/4 flex'>
                                        <button className='border border-slate-400 text-xl h-full flex items-center justify-center w-1/4'>
                                            -
                                        </button>
                                        <div className='border border-slate-400 px-4 h-full flex items-center justify-center w-2/4'>
                                            2
                                        </div>
                                        <button className='bg-red-500 text-white h-full flex items-center justify-center w-1/4'>
                                            +
                                        </button>
                                    </div>
                                    <div className='bg-red-600 text-white py-2.5 px-8 text-sm rounded w-max'>Buy Now</div>
                                    <div className='border border-black flex items-center px-2.5 sm:w-max'>
                                        <HeartOutlined />
                                    </div>
                                </div>
                                <div className='w-full flex flex-col justify-center '>
                                    <div className='border border-black p-4 flex items-center gap-4'>
                                        <i className='fa-solid fa-truck-fast text-xl'></i>
                                        <div>
                                            <div className='text-sm font-semibold'>Free Delivery</div>
                                            <div className='font-semibold text-xs'>
                                                Enter your postal code for Delivery Availability
                                            </div>
                                        </div>
                                    </div>
                                    <div className='border border-black p-4 flex items-center gap-4'>
                                        <i className='fa-solid fa-right-left'></i>
                                        <div>
                                            <div className='text-sm font-semibold'>Return Delivery</div>
                                            <div className='font-semibold text-xs'>Free 30 Days Delivery Returns. Details</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mt-8'>
                            <div className='text-xl font-semibold mb-4'>Customer Reviews</div>
                            <div className='border border-slate-200 p-4 rounded-lg space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <div className='mr-4'>
                                            <img
                                                src={user.avatar}
                                                alt="User avatar"
                                                className="w-10 h-10 rounded-full"
                                            />
                                        </div>
                                        <div className='text-lg ' >{user.user_name}</div>
                                    </div>
                                    <div className='text-xs text-slate-500'>a few seconds ago</div>
                                </div>
                                <textarea
                                    className='form-textarea 
                                     mt-1 block w-full border-gray-300 rounded-md shadow-sm'
                                    rows='4'
                                    placeholder='
                                    Write your review...'
                                ></textarea>
                                <div className='flex justify-between items-center'>
                                    <button className='text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2'>
                                        Submit Review
                                    </button>
                                    <div>
                                        <Rate />
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className='flex flex-col gap-y-4'>
                        <div>Related Item</div>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-10'>
                            <div className='flex flex-col gap-y-2 relative'>
                                <div className='p-2 bg-slate-200'>
                                    <div className='w-max px-2 py-1 bg-red-400 rounded absolute m-2.5 text-white'>-30%</div>
                                    <div className='absolute right-[15px] mt-2 px-2.5 py-1 border border-black '>
                                        <HeartOutlined />
                                    </div>
                                    <img
                                        src='https://salt.tikicdn.com/ts/tmp/52/93/88/61ff58b8b3596ff29718c6aaa84d29b8.jpg'
                                        alt=''
                                    />
                                </div>
                                <div>
                                    <div className='font-semibold text-xs md:text-base'>HAVIT HV-G92 Gamepad</div>
                                    <div className='flex gap-4'>
                                        <div>$120</div>
                                        <div className='line-through'>$160</div>
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <Rate disabled defaultValue={4} className='text-xs md:text-sm' />
                                        <div>(150)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
