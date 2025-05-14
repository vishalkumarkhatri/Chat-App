import React from 'react'
import { useChatStore } from '../../store/useChatStore';
import { Image, Send, X } from 'lucide-react';
import { toast } from 'react-hot-toast';


function MessageInput() {
    const [text, setText] = React.useState('');
    const [imagePreview, setImagePreview] = React.useState(null);
    const fileInputRef = React.useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({ text: text.trim(), image: imagePreview });

            // Clear form
            setText('');
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log("Failed to send message", error);
        }
    };


    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className='flex items-center gap-2 mb-3'>
                    <div className='relative'>
                        <img src={imagePreview} alt="Preview"
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                        />

                        <button
                            onClick={removeImage}
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
                            type='button'
                        >
                            <X className='size-3' />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex gap-2'>
                {/* <div className='flex flex-1 gap-2 absolute bottom-15'> */}
                    <input type="text" placeholder='Type a message...'
                        value={text} onChange={(e) => setText(e.target.value)}
                        className='w-full input input-bordered input-sm rounded-lg sm:input-md'
                    />

                    <input type="file" accept='image/*'
                        ref={fileInputRef} onChange={handleImageChange}
                        className='hidden'
                    />

                    <button type='button'
                        className={`hideen sm:flex btn btn-circle ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>

                <button type='submit'
                    className='btn btn-circle btn-sm '
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>

            </form>

        </div>
    )
}

export default MessageInput