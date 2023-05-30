import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import SingleMessage from './SingleMessage';
import MessageSendBox from './MessageSendBox';
import { MessageContext } from '../../context/MessageContext';

const MyAccountMessageArea = ({ chatId }) => {
    const { store, receiverData, setReceiverData, setChatId, fullScreen, setFullScreen } = useContext(MessageContext)
    const [messages, setMessages] = useState([])

    const getMessage = () => {
        fetch(`http://localhost:5055/api/storemessage/${chatId}`)
            .then(res => res.json())
            .then(data => {
                setMessages(data?.data);
            })
    }

    useEffect(() => {
        getMessage()
    }, [chatId])


    const handleCloseMessage = () => {
        setChatId("")
        setReceiverData(null)
    }


    const sendMessage = (message) => {

        const newMessage = {
            text: message,
            storeId: receiverData?._id,
            chatId: chatId,
            senderId: store?._id,
            members: [store?._id, receiverData?._id],
            // productId: ""
        }

        // console.log(newMessage);

        fetch(`http://localhost:5055/api/storemessage`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
            .then(res => res.json())
            .then(data => {
                getMessage()
            })
    }




    return (

        <div class={`bg-indigo-50 flex flex-col items-center justify-center`}>
            {/* <!-- chat box --> */}

            <div class="w-full h-screen flex flex-col border shadow-md bg-white">
                <div class="flex items-center justify-between border-b p-2">
                    {/* <!-- user info --> */}
                    <div class="flex items-center">
                        <button className='flex items-center justify-center min-w-[40px] h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]'>
                            {
                                receiverData?.image ? <img className="object-cover w-10 h-10 rounded-full"
                                    src={receiverData?.image} alt="username" />
                                    :
                                    <span>{receiverData?.name?.slice(0, 1)}</span>
                            }
                        </button>
                        <div class="pl-2">
                            <div class="font-semibold">
                                <p class="hover:underline">{receiverData?.name}</p>
                            </div>
                            <div class="text-xs text-gray-600">Online</div>
                        </div>
                    </div>
                    {/* <!-- end user info --> */}


                    {/* <!-- chat box action --> */}
                    <div>
                        <button onClick={() => setFullScreen(!fullScreen)}
                            class="inline-flex hover:bg-indigo-50 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </button>

                        <button onClick={() => handleCloseMessage()} class="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* <!-- end chat box action --> */}
                </div>

                <div class="flex-1 px-4 py-4 scrollBar overflow-y-auto">

                    {
                        messages?.map((message, i) => <SingleMessage key={i} message={message} />)
                    }
                </div>

                <MessageSendBox sendMessage={sendMessage} />
            </div>

            {/* <!-- end chat box --> */}


        </div >
    );
};

export default MyAccountMessageArea;