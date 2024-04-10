import { AiFillFacebook } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import React from 'react'

export default function About() {
    return (
        <div>
            <div>
               
                <div className='flex flex-col lg:flex-row pl-8 mt-8 lg:pl-32 lg:mt-10'>
                    <div className='w-full lg:w-1/2 xl:w-2/5 mb-10 lg:mb-0 lg:mr-10 xl:mt-44'>
                        <h1 className='text-4xl font-semibold mb-5 '>Our Story</h1>
                        <p className='text-base lg:text-lg mb-4'>Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.</p>
                        <p className='text-base lg:text-lg'>Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to household goods, toys, fashion, sports equipment, and groceries.</p>
                    </div>
                    <div className='w-full lg:w-1/2 xl:w-3/5'>
                        <img src="../../../src/assets/img/Side Image.png" alt="" className='w-full h-auto' />
                    </div>
                </div>
                <div className='mt-36'>
                    <div className='w-full flex flex-wrap justify-center lg:justify-between items-center mx-auto px-4'>
                        {/* Repeat this block for each statistic */}
                        <div className='w-full max-w-xs mx-auto rounded overflow-hidden shadow-lg my-4 px-4 py-2'>
                            <div className='w-20 h-20 mx-auto'>
                                <img src="../../../src/assets/img/Services3.png" alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <p className='text-3xl text-center mt-4'>10.5K</p>
                                <p className='text-base text-center'>Sellers active on our site</p>
                            </div>
                        </div>
                        <div className='w-full max-w-xs mx-auto rounded overflow-hidden shadow-lg my-4 px-4 py-2'>
                            <div className='w-20 h-20 mx-auto'>
                                <img src="../../../src/assets/img/Services3.png" alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <p className='text-3xl text-center mt-4'>33K</p>
                                <p className='text-base text-center'>Mopnthly Produduct Sale</p>
                            </div>
                        </div>
                        <div className='w-full max-w-xs mx-auto rounded overflow-hidden shadow-lg my-4 px-4 py-2'>
                            <div className='w-20 h-20 mx-auto'>
                                <img src="../../../src/assets/img/Services4.png" alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <p className='text-3xl text-center mt-4'>45.5k</p>
                                <p className='text-base text-center'>Customer active in our site</p>
                            </div>
                        </div>
                        <div className='w-full max-w-xs mx-auto rounded overflow-hidden shadow-lg my-4 px-4 py-2'>
                            <div className='w-20 h-20 mx-auto'>
                                <img src="../../../src/assets/img/Services5.png" alt="" className='w-full h-full' />
                            </div>
                            <div>
                                <p className='text-3xl text-center mt-4'>25K</p>
                                <p className='text-base text-center'>Anual gross sale in our site</p>
                            </div>
                        </div>
                        {/* ... other blocks */}
                    </div>
                </div>

                {/* Team list */}
                <div className='mt-36'>
                    <div className='w-full flex flex-wrap justify-center lg:justify-between items-center mx-auto px-4'>
                        {/* Repeat this block for each team member */}
                        <div className='w-full mb-4 lg:mb-0 lg:w-1/3 px-2'>
                            <div className='w-full h-auto mb-4'>
                                <img src="../../../src/assets/img/Frame 874.png" alt="" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-medium mb-2">Tom Cruise</h1>
                                <p className="text-base">Founder & Chairman</p>
                                <div className="flex w-full h-6 justify-center mt-2">
                                    <span className='text-3xl mx-1'>
                                        <AiFillTwitterCircle />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiOutlineInstagram />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiFillFacebook />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-4 lg:mb-0 lg:w-1/3 px-2'>
                            <div className='w-full h-auto mb-4'>
                                <img src="../../../src/assets/img/Frame 875.png" alt="" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-medium mb-2">Emma Watson</h1>
                                <p className="text-base">Managing Director</p>
                                <div className="flex w-full h-6 justify-center mt-2">
                                    <span className='text-3xl mx-1'>
                                        <AiFillTwitterCircle />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiOutlineInstagram />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiFillFacebook />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-4 lg:mb-0 lg:w-1/3 px-2'>
                            <div className='w-full h-auto mb-4'>
                                <img src="../../../src/assets/img/Frame 876.png" alt="" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-4xl font-medium mb-2">Will Smith</h1>
                                <p className="text-base">Product Designer</p>
                                <div className="flex w-full h-6 justify-center mt-2">
                                    <span className='text-3xl mx-1'>
                                        <AiFillTwitterCircle />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiOutlineInstagram />
                                    </span>
                                    <span className='text-3xl mx-1'>
                                        <AiFillFacebook />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* ... other team members */}
                    </div>
                </div>

                {/* Giao hang */}
                <div className="mt-48 mb-36">
                    <div className="w-full flex flex-wrap justify-center lg:justify-between items-center mx-auto px-4">
                        {/* Repeat this block for each service */}
                        <div className="w-60 mb-4 lg:mb-0 lg:w-1/3 px-2">
                            <div className="w-20 h-20 mx-auto mb-4">
                                <img src='../../../src/assets/img/Services.png' alt="Product Image" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold">FREE AND FAST DELIVERY</h1>
                                <p className="text-sm">Free delivery for all orders over $140</p>
                            </div>
                        </div>
                        <div className="w-60 mb-4 lg:mb-0 lg:w-1/3 px-2">
                            <div className="w-20 h-20 mx-auto mb-4">
                                <img src='../../../src/assets/img/Services1.png' alt="Product Image" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold">24/7 CUSTOMER SERVICE</h1>
                                <p className="text-sm">Friendly 24/7 customer support</p>
                            </div>
                        </div>
                        <div className="w-60 mb-4 lg:mb-0 lg:w-1/3 px-2">
                            <div className="w-20 h-20 mx-auto mb-4">
                                <img src='../../../src/assets/img/Services8.png' alt="Product Image" className='w-full h-full' />
                            </div>
                            <div className="text-center">
                                <h1 className="text-xl font-bold">MONEY BACK GUARANTEE</h1>
                                <p className="text-sm">We reurn money within 30 days</p>
                            </div>
                        </div>
                        {/* ... other blocks */}
                    </div>
                </div>
            </div>
        </div>
    )
}

