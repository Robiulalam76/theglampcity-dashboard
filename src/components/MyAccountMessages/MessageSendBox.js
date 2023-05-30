import React, { useContext, useState } from 'react';
// import {
//     IconButton,
//     SpeedDial,
//     SpeedDialHandler,
//     SpeedDialContent,
//     SpeedDialAction,
//     Button,
//     Accordion,
//     AccordionBody,
//     Badge
// } from "@material-tailwind/react";
// import {
//     PlusIcon,
// } from "@heroicons/react/24/outline";
import { AdminContext } from '../../context/AdminContext';
import { MessageContext } from '../../context/MessageContext';
import { Badge, Button, Modal, ModalBody, ModalFooter } from '@windmill/react-ui';
import CreateOfferForm from './CreateOfferForm';
import SelectProductForOffer from './SelectProductForOffer';
import MyOffers from './OffersPanels/MyOffers';
import MyRequestOffers from './OffersPanels/MyRequestOffers';
// import CreateOfferForm from './CreateOfferForm';
// import SelectProductForOffer from './SelectProductForOffer';
// import MyOffers from './OffersPanels/MyOffers';
// import MyRequestOffers from './OffersPanels/MyRequestOffers';
// import { useSelector } from 'react-redux';
// import { AuthContext } from '@/ContextAPI/AuthProvider';

const data = [
    {
        label: "Offers",
        value: "offers"
    },
    {
        label: "Request",
        value: "request"
    },
];

const MessageSendBox = ({ sendMessage }) => {
    const { user } = useContext(AdminContext)
    const { receiverData, store, chatId } = useContext(MessageContext)
    const [totalOffers, setTotalOffers] = useState("0")
    const [messageText, setMessageText] = useState("")
    const [productId, setProductId] = useState("");
    const [tab, setTab] = useState("offers")

    // console.log(messageText, user);

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


    return (
        <div class="p-4">

            {
                openOffers && (
                    <div className='fixed w-full h-full bg-white top-0 left-0 bottom-0 right-0 z-50'>
                        <div className='grid grid-cols-2 min-w-[800px] h-full' >
                            {data.map(({ label, value }) => (
                                <button onClick={() => setTab(value)}
                                    className={`w-full rounded-none h-10
                            ${tab === value ? "bg-green-500 text-white" : "bg-white text-black"}`} >
                                    {label}
                                </button>
                            ))}
                        </div>

                        {tab === "offers" && <MyOffers storeId={store?._id} buyerId={receiverData?._id} setTotalOffers={setTotalOffers} />}
                        {tab === "request" && <MyRequestOffers storeId={store?._id} buyerId={receiverData?._id} />}
                    </div>
                )
            }

            {
                openCreateOffer && (
                    <div className='fixed w-full h-full bg-white top-0 left-0 bottom-0 right-0 z-50'>
                        <div className='w-full' >
                            {productId && <CreateOfferForm productId={productId} setClose={handleclose} />}
                            {!productId && <SelectProductForOffer handleSelectProduct={setProductId} />}
                        </div>
                    </div>
                )
            }

            <div className='flex items-center gap-2 w-fit h-10'>
                <div class="relative m-6 inline-flex w-fit">
                    <div
                        class="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-2.5 text-xs">{totalOffers}</div>
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