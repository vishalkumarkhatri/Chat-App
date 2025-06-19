import React from 'react'
import { X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import profile from '../assets/profile.png'


function ChatHeader() {

    const { selectedUser, setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* Avatar */}
                    <div className='avatar'>
                        <div className='relative size-10 rounded-full'>
                            <img src={selectedUser.profilePic || profile} alt={selectedUser.name} />
                        </div>
                    </div>

                    {/* User Info */}
                    <div>
                        <h3 className='font-medium'>{selectedUser.name}</h3>
                        <p className='text-sm text-base-content/70'>
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close Button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader