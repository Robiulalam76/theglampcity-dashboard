
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MessageContext } from '../../context/MessageContext';
import MyAccountMessageArea from '../../components/MyAccountMessages/MyAccountMessageArea';
import MessagesChatSidebar from '../../components/MyAccountMessages/MessagesChatSidebar';
import StoreServices from '../../services/StoreServices';
import useAsync from '../../hooks/useAsync';
import StoreCard from '../../components/cards/StoreCard';

const StoreMessages = () => {
    const { user } = useContext(AdminContext)
    const { receiverData, chatId, fullScreen, store, setStore, setOpenMyAccountMessageSidebar } = useContext(MessageContext)

    const { data } = useAsync(StoreServices.getAllStore)
    console.log(store);

    const [chatData, setChatData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5055/api/storechat/${store?._id}`)
            .then(res => res.json())
            .then(data => {
                setChatData(data);
            })

    }, [store?._id])

    return (
        <main className={`bg-slate-100 h-screen w-full
        ${fullScreen && "fixed top-0 right-0 bottom-0 left-0 z-[1000] w-full bg-primary bg-opacity-50"}`}>
            {
                store?._id ? <div className='w-full'>
                    <div className='flex justify-between'>
                        <MessagesChatSidebar chatData={chatData} />
                        <div className='flex-grow h-screen w-full relative z-30'>

                            {
                                receiverData ? <MyAccountMessageArea chatId={chatId} />
                                    : (
                                        <div className='flex justify-center items-center'>
                                            <h1>Please Select</h1>
                                        </div>
                                    )
                            }

                        </div>
                    </div>
                    <button onClick={() => setOpenMyAccountMessageSidebar(true)}>open</button>
                </div>
                    :
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8'>
                        {
                            data?.map(store => <StoreCard store={store} />)
                        }
                    </div>
            }

        </main>
    );
};


export default StoreMessages;