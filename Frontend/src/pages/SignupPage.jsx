import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare, Loader2, User, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

import { toast } from 'react-hot-toast'


const SignupPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
    });

    const { signup, isSignup } = useAuthStore()

    const validateForm = () => {
        if (!formData.name.trim()) return toast.error("Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) return toast.error("Provide valid email address");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters long");
        if (!/[A-Z]/.test(formData.password)) return toast.error("Password must contain at least one uppercase letter");
        if (!/[a-z]/.test(formData.password)) return toast.error("Password must contain at least one lowercase letter");
        if (!/[0-9]/.test(formData.password)) return toast.error("Password must contain at least one number");

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const success = validateForm();
        if (success === true) {
            signup(formData);
        }
    }

    return (
        <div className='min-h-screen grid lg:grid-cols-1'>

            <div className='flex flex-col justify-center items-center p-6 sm:p-12 border border-base-800'>
                <div className='w-full max-w-md p-6 border border-secondary rounded-lg shadow-cl'>

                    <div className='w-full max-w-md space-y-8'>
                        {/* logo */}
                        {/* <div className='flex justify-center'>
                        <img src="/logo.png" alt="logo" className='h-12' />
                    </div> */}
                        <div className="text-center mb-8">
                            <div className="flex flex-col items-center gap-2 group">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <MessageSquare className="size-6 text-primary" />
                                </div>
                                <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                                <p className='text-base-content/60'>Get started with your free account</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="input input-bordered pl-10 w-full"
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Enter your email"
                                    className="input input-bordered pl-10 w-full"
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="input input-bordered pl-10 w-full"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword ? <EyeOff className="size-5 text-base-content/40" />
                                            : <Eye className="size-5 text-base-content/40" />
                                    }
                                </button>
                            </div>
                        </div>

                        <button type="submit"
                            className='btn btn-primary w-full'
                            disabled={isSignup}
                        >
                            {isSignup ? (
                                <>
                                    <Loader2 className='animate-spin size-5' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )
                            }

                        </button>
                    </form>

                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account?{" "}
                            <Link to="/login" className='link link-primary'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default SignupPage