import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageContext } from '../../context/MessageContext';
import { AdminContext } from '../../context/AdminContext';

const SingleMessage = ({ message }) => {
    const { store, receiverData, chatId } = useContext(MessageContext)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if (message?.productId) {
            fetch(`http://localhost:5055/api/products/${message?.productId}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data)
                })
        }
    }, [message])

    const scroll = useRef()
    // scrooll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])
    return (
        <>

            {
                message?.members[0] === store?._id ? <div ref={scroll} class="flex items-center flex-row-reverse justify-start gap-4 mb-4">
                    <div class="flex-none flex flex-col items-center justify-center space-y-1">
                        <button className='flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]'>
                            {
                                store?.logo ? <img className="object-cover w-10 h-10 rounded-full"
                                    src={store?.logo} alt="username" />
                                    :
                                    <div className='w-full h-full'>{store?.name?.slice(0, 1)}</div>
                            }
                        </button>
                        {/* <a href="#" class="block text-xs hover:underline">{user?.name}</a> */}
                    </div>
                    <div class="w-fit max-w-[70%] h-fit  bg-indigo-400 text-white p-2 rounded-lg relative">

                        {
                            message?.productId && (
                                <div>
                                    <img className='w-44 h-20 object-cover' src={product?.images[0]} alt="" />
                                </div>
                            )
                        }

                        <div>{message?.text}</div>


                        <div class="absolute -right-2 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>

                    </div>
                </div>
                    :
                    <div ref={scroll} class="flex items-center gap-4 mb-4">
                        <div class="flex-none flex flex-col items-center justify-center space-y-1">
                            <button className='flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]'>
                                {
                                    receiverData?.image ? <img className="object-cover w-10 h-10 rounded-full"
                                        src={receiverData?.image} alt="username" />
                                        :
                                        <div className='w-full h-full'>{receiverData?.name?.slice(0, 1)}</div>
                                }
                            </button>
                            {/* <a href="#" class="block text-xs hover:underline">{receiverData?.name}</a> */}
                        </div>

                        <div class="w-fit max-w-[70%] h-fit bg-indigo-100 text-gray-800 p-2 rounded-lg relative">

                            {
                                message?.productId && (
                                    <div>
                                        <img className='w-44 h-20 object-cover' src={product?.images[0]} alt="" />
                                    </div>
                                )
                            }

                            <div>{message?.text}</div>

                            <div class="absolute -left-2 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
                        </div>
                    </div>
            }

        </>
    );
};

export default SingleMessage;