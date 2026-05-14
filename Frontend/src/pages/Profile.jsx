import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showSuccess, showError } from "../components/ToastMessageBox";

const Profile = () => {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || 'INR';
    });
    const [user, setUser] = useState({})

    async function logout() {
        try {
            const response = await axios.get('http://localhost:8000/api/user/authentication/logout-all', { withCredentials: true })
            showSuccess('Logged out successfully')
            localStorage.removeItem('username')
            localStorage.removeItem('currency')
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    }

    async function getMe() {
        try {
            const response = await axios.get('http://localhost:8000/api/user/profile/get-me', { withCredentials: true })
            setUser(response.data)
            localStorage.setItem('username', response?.data?.user?.name || null)
            localStorage.setItem('currency', response?.data?.user?.currency || null)
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    }

    async function setCurrBackend() {
        try {
            const response = await axios.post('http://localhost:8000/api/user/profile/set-currency', { currency }, { withCredentials: true })
            localStorage.setItem('currency', currency)
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    }

    useEffect(() => {
        getMe()
    }, [])
    useEffect(() => {
        setCurrBackend()
    }, [currency])

    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-95 mx-md:w-70 h-full py-10 gap-4 flex flex-col max-md:px-5" >

                    <div className="bg-[#141417]  rounded-[22px] p-6 flex flex-col items-center gap-3 border border-[#1e1e24] glow fade-in">
                        <div className="avatar-ring p-0.75 rounded-full bg-linear-to-r from-[#db2777] via-[#ef4444] to-[#f97316]">
                            <div className="bg-[#141417] rounded-full p-0.5">
                                <div className="w-18 h-18 rounded-full bg-[#0d0d0f] flex items-center justify-center border border-[#2a2a30]">
                                    <span className="text-2xl font-bold text-[#e4e4e7]">
                                        {user?.user?.name
                                            ?.split(' ')
                                            .slice(0, 2)
                                            .map(word => word.charAt(0).toUpperCase())
                                            .join('') || null
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <h1
                                className="text-xl font-bold text-[#f4f4f5] leading-tight"
                            >
                                {user?.user?.name
                                    ?.split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ') || null
                                }
                            </h1>
                            <p className="text-sm text-[#52525b] mt-0.5">{user?.user?.email || null}</p>
                        </div>
                    </div>

                    <div className="w-full flex justify-around gap-3">
                        <div
                            className="w-[40%] bg-[#141417] rounded-2xl p-4 flex flex-col gap-1 border border-[#1e1e24]"
                        >
                            <span className="text-sm font-medium text-[#52525b] ">
                                TOTAL EXPENSES
                            </span>
                            <span className="text-lg font-semibold text-[#f4f4f5]">
                                {user?.result?.[0]?.totalExpense || 0} <span className="text-sm"> {localStorage.getItem('currency') || 'INR'}</span>
                            </span>
                            <span className="text-sm text-[#3f3f46]">this month</span>
                        </div>

                        <div
                            className="w-[40%] bg-[#141417] rounded-2xl p-4 flex flex-col gap-1 border border-[#1e1e24]"
                        >
                            <span className="text-[9px] font-medium text-[#52525b] uppercase tracking-wider leading-tight">
                                TRANSACTIONS
                            </span>
                            <span className="text-lg font-semibold text-[#f4f4f5] ">
                                {user?.result?.[0]?.totalTransactions || 0}
                            </span>
                            <span className="text-sm text-[#3f3f46]">this month</span>
                        </div>
                    </div>

                    <div className="bg-[#141417] rounded-[22px] py-5 px-2 border border-[#1e1e24] fade-in flex flex-col gap-3">
                        <select name="currency" id="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="outline-none text-white cursor-pointer font-semibold px-4">

                            <option value="INR" className="bg-[#141417] text-white" >INR - Indian Rupee</option>
                            <option value="USD" className="bg-[#141417] text-white" >USD - US Dollar </option>
                            <option value="EUR" className="bg-[#141417] text-white" >EUR - Euro </option>
                            <option value="JPY" className="bg-[#141417] text-white" >JPY - Japanese Yen </option>
                        </select>
                    </div>

                    <div className="w-full flex gap-3">
                        <button
                            onClick={logout}
                            className="cursor-pointer hover:bg-[#180808] hover:border-[#691A1A] w-full bg-[#141417] rounded-2xl px-5 py-4 flex items-center justify-center gap-2 border border-[#1e1e24] transition-all"
                        >
                            <span className="text-sm font-medium text-[#f87171]">Sign out</span>
                        </button>

                        <Link
                            to='/login'
                            className="cursor-pointer hover:bg-[#0b1808] hover:border-[#1a691a] w-full bg-[#141417] rounded-2xl px-5 py-4 flex items-center justify-center gap-2 border border-[#1e1e24] transition-all"
                        >
                            <span className="text-sm font-medium text-[#81f871]">Log in</span>
                        </Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile