import axios from 'axios'
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSignup: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,


    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSignup: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success("Account created successful");
            
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSignup: false });
        }
    },

    login: async (data) => {
        set({ isLogin: true });
        try {
            const res = await axiosInstance.post('/auth/login', data);
            set({ authUser: res.data });
            toast.success("Login successful");

            get().connectSocket();

        } catch (error) {
            console.log("Error in login", error);
            toast.error(error.res.data.message);
        } finally {
            set({ isLogin: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success("Logout successful");

            get().disconnectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: res.data });
            toast.success("Profile updated successful");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io("http://localhost:3000", {
            query: {
                userId: authUser._id
            },
        });
        socket.connect();
        set({ socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    },

}))