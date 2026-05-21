import axios from 'axios'
import { useState, useEffect } from 'react'

const NavBalance = () => {
    const [response, setResponse] = useState({})

    const getStats = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/user/transaction/stats', { withCredentials: true })
            setResponse(result.data)
        } catch (error) {
            console.log('Error in getting balance:-\n', error.message)
        }
    }

    useEffect(() => {
        getStats()
    }, [])

    return (
        <>
            <div className="w-full h-full bg-[#1b1b1b] rounded-2xl border-slate-800 border p-4 gap-4 flex justify-center items-center md:gap-4 max-sm:gap-2">

                <div className="w-[100%/3] h-full bg-[#E5FAFF] rounded-xl flex flex-col justify-center gap-2 items-start px-2">
                    <h1 className="text-slate-800 font-semibold text-md ">Current Balance</h1>
                    <div>
                        <p className="text-4xl text-slate-700 font-bold">{response?.totalBalance?.balance || 0}<span className="text-sm font-medium -space-x-4">{localStorage.getItem('currency') || 'INR'}</span></p>
                    </div>
                </div>

                <div className="w-[100%/3] h-full bg-[#F6EFFF] rounded-xl flex flex-col justify-center gap-2 items-start p-2">
                    <h1 className="text-slate-800 font-semibold text-md ">Total Income</h1>
                    <div>
                        <p className="text-4xl text-slate-700 font-bold">{response?.stats?.[1]?.total || 0}<span className="text-sm font-medium -space-x-4">{localStorage.getItem('currency') || 'INR'}</span></p>
                    </div>
                </div>

                <div className="w-[100%/3] h-full bg-[#E5FAFF] rounded-xl flex flex-col justify-around items-start p-2">
                    <h1 className="text-slate-800 font-semibold text-md ">Total Expenses</h1>
                    <div>
                        <p className="text-4xl text-slate-700 font-bold">{response?.stats?.[0]?.total || 0}<span className="text-sm font-medium -space-x-4">{localStorage.getItem('currency') || 'INR'}</span></p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NavBalance