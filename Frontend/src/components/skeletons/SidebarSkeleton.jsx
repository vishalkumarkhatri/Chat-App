import React from 'react'
import { Users } from "lucide-react"

const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);
    return (
        <aside className='flex flex-col transition-all duration-200 h-full w-20 lg:w-72 border-r border-base-300'>
            {/* Header */}
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
            </div>

            {/* Skeleton Contacts */}
            <div className='overflow-y-auto w-full py-3'>
                {skeletonContacts.map((_, index) => (
                    <div
                        key={index}
                        className='flex items-center gap-3 w-full p-3'>
                        {/* Avatar Skeleton */}
                        <div className='relative mx-auto lg:mx-0'>
                            <div className='skeleton size-12 rounded-full' />
                        </div>

                        {/* User Info Skeleton - only visible on large screens */}
                        <div className='hidden lg:block text-left min-w-0 flex-1'>
                            <div className='skeleton mb-2 h-4 w-32' />
                            <div className='skeleton h-3 w-16' />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}

export default SidebarSkeleton