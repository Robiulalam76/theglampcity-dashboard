import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MessageContext } from '../../context/MessageContext';
import { Button, } from '@windmill/react-ui';
import CreateOfferForm from './CreateOfferForm';
import SelectProductForOffer from './SelectProductForOffer';
import BuyerOfferRequest from './OffersPanels/BuyerOfferRequest';
import MyRequestOffers from './OffersPanels/MyRequestOffers';

const data = ["Buyer Request", "Send Offer"];

const MessageSendBox = ({ sendMessage }) => {
    const { user } = useContext(AdminContext)
    const { receiverData, store } = useContext(MessageContext)
    const [totalOffers, setTotalOffers] = useState([])
    const [messageText, setMessageText] = useState("")
    const [productId, setProductId] = useState("");
    const [tab, setTab] = useState("Buyer Request")

    const [openOffers, setOpenOffers] = useState(false);
    const [openCreateOffer, setOpenCreateOffer] = useState(false);

    const handleOffer = (data) => {
        if (data === "openoffer") {
            setOpenCreateOffer(false)
            setOpenOffers(!openOffers)
        }
        else {
            setOpenOffers(false)
            setOpenCreateOffer(!openCreateOffer)
        }
    }

    const handleclose = () => {
        setProductId("")
        setOpenCreateOffer(false)
    }

    const handleGetOffers = () => {
        fetch(`http://localhost:5055/api/offer/myrequest/${store?._id}/${receiverData?._id}/buyer/true`)
            .then(res => res.json())
            .then(data => {
                setTotalOffers(data)
            })
    }

    useEffect(() => {
        handleGetOffers()
    }, [store?._id, receiverData?._id])


    return (
        <div class="p-4">

            {
                openOffers && (
                    <div className='fixed w-full h-full bg-gray-600 bg-opacity-50 top-0 left-0 bottom-0 right-0 z-50 md:p-8'>
                        <div className='w-full h-full bg-white relative overflow-y-auto overflow-hidden' >
                            <div className='grid grid-cols-2 w-full h-10 border-y' >
                                {
                                    data.map(item => (
                                        <button onClick={() => setTab(item)}
                                            className={`w-full rounded-none h-10 outline-none focus:outline-none
                            ${tab === item ? "bg-green-500 text-white" : "bg-white text-black"}`} >
                                            {item}
                                        </button>
                                    ))
                                }
                            </div>

                            {tab === "Buyer Request" && <BuyerOfferRequest storeId={store?._id} buyerId={receiverData?._id} offers={totalOffers} refetch={handleGetOffers} />}
                            {tab === "Send Offer" && <MyRequestOffers storeId={store?._id} buyerId={receiverData?._id} />}
                            <button onClick={() => setOpenOffers(false)}
                                className='absolute bottom-0 right-0 w-40 h-10 bg-pink-600 hover:bg-pink-700 text-white flex justify-center items-center' >
                                <span>Close</span>
                            </button>
                        </div>

                    </div>
                )
            }

            {
                openCreateOffer && (
                    <div className='fixed w-full h-full bg-gray-600 bg-opacity-50 top-0 left-0 bottom-0 right-0 z-50 md:p-8'>
                        <div className='w-full h-full bg-white relative' >
                            {productId && <CreateOfferForm buyerId={receiverData?._id} productId={productId} setClose={handleclose} />}
                            {!productId && <SelectProductForOffer storeId={store?._id} handleSelectProduct={setProductId} />}
                            <button onClick={() => handleclose()}
                                className='absolute bottom-0 right-0 w-40 h-10 bg-pink-600 hover:bg-pink-700 text-white flex justify-center items-center' >
                                <span>Close</span>
                            </button>
                        </div>
                    </div>
                )
            }

            <div className='flex items-center gap-2 w-fit h-10'>
                <div class="relative m-6 inline-flex w-fit">
                    <div
                        class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-2.5 text-xs">{totalOffers?.length > 0 ? totalOffers?.length : 0}</div>
                    <Button className="rounded-md" onClick={() => handleOffer("openoffer")} >Offer</Button>
                </div>
                <Button className="rounded-md" onClick={() => handleOffer("createoffer")} >Create</Button>
            </div>

            <div class="flex items-center gap-1 w-full bg-gray-200 rounded-md">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-800">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>

                <input onChange={(e) => setMessageText(e.target.value)}
                    type="text" placeholder="Write your message!"
                    class="flex-grow w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 bg-gray-200 rounded-md py-3" />


                <button onClick={() => sendMessage(messageText)}
                    disabled={messageText ? false : true} type="button"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-600 hover:bg-primary-700 focus:outline-none">
                    <span class="font-bold">Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MessageSendBox;