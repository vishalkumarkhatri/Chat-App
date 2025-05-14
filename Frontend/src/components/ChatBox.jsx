import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

import ChatHeader from './ChatHeader'
import MessageInput from './skeletons/MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

import { formatMessageTime } from '../lib/utils'


function ChatBox() {
    const { selectedUser, fetchMessages, isMessagesLoading, messages, subscribeToMessages, unsubscribeToMessages } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = React.useRef(null);


    React.useEffect(() => {
        fetchMessages(selectedUser._id)
        subscribeToMessages();

        return () => unsubscribeToMessages();

    }, [selectedUser._id, fetchMessages, subscribeToMessages, unsubscribeToMessages]);

    React.useEffect(() => {
        
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (isMessagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )
    
    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
                        ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full'>
                                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
                            </div>
                        </div>

                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>

                        <div className='flex flex-col chat-bubble bg-transparent p-0'>
                            {message.image && (
                                <img src={message.image} alt="Attachment"
                                    className='sm:max-w-[200px] rounded-md mb-2' />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>


            <MessageInput />

        </div>
    )
}

export default ChatBox