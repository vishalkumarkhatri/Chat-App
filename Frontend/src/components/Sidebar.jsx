import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import profile from '../assets/profile.png'




function Sidebar() {

    const { fetchUsers, users, isUsersLoading, selectedUser, setSelectedUser } = useChatStore()

    const { onlineUsers } = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = React.useState(false)

    React.useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users

    if (isUsersLoading) return <SidebarSkeleton />



    return (
        <aside className='flex felx-col h-full w-20 lg:w-72 border-r border-base-300 transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>

                {/* Online filter */}
                <div className='lg:flex items-center gap-2 mt-3 hidden'>
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type='checkbox'
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className='checkbox checkbox-sm'
                        />
                        <span className='text-sm'>Show Online Only</span>
                    </label>

                    <span className='text-xs text-zinc-400'> ({onlineUsers.length - 1} online)</span>

                </div>
                {/* </div> */}

                <div className='overflow-y-auto w-full py-3'>
                    {filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            className={`flex items-center gap-3 w-full p-3 cursor-pointer hover:bg-base-300 transition-colors
                            ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''}`}
                            onClick={() => setSelectedUser(user)}
                        >
                            <div className='relative mx-auto lg:mx-0'>
                                <img src={user.profilePic || profile} alt={user.name}
                                    className='size-12 rounded-full object-cover'
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
                                )}
                            </div>

                            {/* User Info - only visible on large screens */}
                            <div className='hidden lg:block text-left min-w-0'>
                                <div className='font-medium truncate'>{user.name}</div>
                                <div className='text-sm text-zinc-400'>
                                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                                </div>
                            </div>
                        </button>
                    ))}
                    {filteredUsers.length === 0 && (
                        <div className='py-4 text-center text-zinc-500'>No online users</div>
                    )}
                </div>
            </div>
        </aside>
    )
}

export default Sidebar