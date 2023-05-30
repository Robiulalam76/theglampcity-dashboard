import React, { useEffect, useState } from 'react';
import { MessageContext } from '../../context/MessageContext';
import { useContext } from 'react';
import { Avatar } from '@windmill/react-ui';

const SingleChatUser = ({ chatData }) => {
    const { receiverData, setReceiverData, chatId, setChatId, fullScreen, setFullScreen } = useContext(MessageContext)
    const [receiverUser, setReceiverUser] = useState(null)
    const [messageData, setMessageData] = useState([])

    console.log(receiverData);
    console.log(chatData);

    useEffect(() => {
        fetch(`http://localhost:5055/api/user/${chatData?.members[0]}`)
            .then(res => res.json())
            .then(data => {
                setReceiverUser(data);
            })
    }, [chatData?.members[0], chatData?.members[1]])

    const handleSetData = () => {
        setChatId(chatData?._id)
        setReceiverData(receiverUser)
    }

    return (
        <button onClick={() => handleSetData()}
            className={`w-full flex items-center justify-start px-2 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer
            ${receiverData?._id === chatData?.members[0] ? "bg-gray-200" : "hover:bg-gray-100"}`}>

            <button className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 object-cover text-white text-[18px]'>
                {
                    receiverUser?.image ? <Avatar className=""
                        src={receiverUser?.image} alt="username" />
                        :
                        <span className=''>{receiverUser?.name?.slice(0, 1)} </span>
                }
            </button>

            <div className="w-full flex flex-col">
                <span className="block ml-2 font-semibold text-gray-600 text-left">{receiverUser?.name}</span>
                <span className="block ml-2 text-sm text-gray-600 text-left">bye</span>
            </div>
        </button>
    );
};

export default SingleChatUser;