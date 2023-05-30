import React, { createContext, useState } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [store, setStore] = useState(null)
    const [receiverData, setReceiverData] = useState(null)
    const [chatId, setChatId] = useState("")
    const [fullScreen, setFullScreen] = useState(false)
    const [openMyAccountMessageSidebar, setOpenMyAccountMessageSidebar] = useState(false)

    const value = {
        receiverData,
        setReceiverData,
        chatId,
        setChatId,
        fullScreen,
        setFullScreen,
        openMyAccountMessageSidebar,
        setOpenMyAccountMessageSidebar,
        store,
        setStore,
    };
    return (
        <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
    );
};
