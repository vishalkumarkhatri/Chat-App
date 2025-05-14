import React from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { THEMES } from '../constants'
import { Send } from 'lucide-react'


const PREVIEW_MESSAGE = [
    { id: 1, content: "Hello, how are you?", isSent: false },
    { id: 2, content: "I am fine, how about you?", isSent: true },
]



function SettingsPage() {
    const { theme, setTheme } = useThemeStore();



    return (
        <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
            <div className="space-y-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Theme</h2>
                    <p className="text-sm text-base-content/70">Select your preferred theme</p>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES.map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg border-2 transition-colors cursor-pointer
                                ${theme === t ? 'bg-base-200' : 'hover:bg-base-200/50'
                                }`}
                        >
                            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1" >
                                    <div className="rounded bg-primary"></div>
                                    <div className="rounded bg-secondary"></div>
                                    <div className="rounded bg-tertiary"></div>
                                    <div className="rounded bg-accent"></div>
                                    <div className="rounded bg-neutral"></div>
                                    {/* <div className="rounded bg-base-100"></div>
                                    <div className="rounded bg-info"></div>
                                    <div className="rounded bg-success"></div>
                                    <div className="rounded bg-warning"></div>
                                    <div className="rounded bg-error"></div>
                                    <div className="rounded bg-base-content"></div>
                                    <div className="rounded bg-base-300"></div>
                                    <div className="rounded bg-base-200"></div>
                                    <div className="rounded bg-base-100"></div> */}
                                </div>
                            </div>
                            <span className="text-[11px] font-medium truncate w-full text-center">
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Preview Section */}
                <h3 className="text-lg font-semibold mb-3">Preview</h3>
                <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
                    <div className="p-4 bg-base-200">
                        <div className="max-w-lg mx-auto">
                            {/* Preview Chat UI */}
                            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                                {/* Chat Header */}
                                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary-content font-medium">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">Vishal Khatri</h3>
                                            <p className="text-xs text-base-content/70">Online</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Chat Messages */}
                                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                                    {PREVIEW_MESSAGE.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.isSent ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${message.isSent ? 'bg-primary text-primary-content' : 'bg-base-200 text-base-content'}
                                            `}>
                                                <p className="text-sm">{message.content}</p>
                                                <p className={`text-[10px] mt-1.5 ${message.isSent ? 'text-primary-content' : 'text-base-content/70'}`
                                                }>
                                                    12:00 AM
                                                </p>

                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chat Input */}
                                <div className="p-4 border-t border-base-300 bg-base-100">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            className="input input-bordered flex-1 text-sm h-10"
                                            value="This is a test message"
                                            readOnly
                                        />
                                        <button className='btn btn-primary h-10 min-h-8'>
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default SettingsPage