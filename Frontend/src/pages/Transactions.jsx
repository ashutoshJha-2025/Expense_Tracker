import axios from 'axios'
import { useState, useEffect } from 'react'
import { showError, showSuccess } from '../components/ToastMessageBox.jsx'

const Transactions = () => {
    const [recentTransactions, setRecentTransactions] = useState([])

    const getAllTransactions = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/user/transaction/get-all', { withCredentials: true })
            setRecentTransactions(result.data.results)
        } catch (error) {
            showError(error.message)
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    return (
        <>
            <div className="w-full h-full flex justify-center items-center">    
                <div className="md:w-[80%] h-[80%] md:p-2 max-md:overflow-x-scroll">
                    <table className="w-full border-separate border-spacing-y-2">

                        <thead>
                            <tr className="text-xs uppercase tracking-[0.12em] text-gray-400">
                                <th className="text-left px-4">Title</th>
                                <th className="text-left px-4">Category</th>
                                <th className="text-left px-4">Amount</th>
                                <th className="text-left px-4">Account</th>
                                <th className="text-left px-4">Date</th>
                                <th className="text-left px-4">Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentTransactions.map((item, index) => (
                                <tr key={index} className="text-sm">

                                    <td className="px-4 py-2 text-gray-400 font-semibold whitespace-nowrap">
                                        {item.title}
                                    </td>

                                    <td className="px-4 py-2 ">
                                        <span className={`rounded-full px-3 py-1 text-sm text-white 
                                        ${item.type === "Income"
                                                ? "bg-green-800"
                                                : item.type === "Expense"
                                                    ? "bg-red-800"
                                                    : "bg-slate-800"
                                            }`}>
                                            {item.categoryId.name}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 text-slate-200 font-medium">
                                        {item.amount}
                                    </td>

                                    <td className="px-4 py-2 text-gray-400 font-semibold">
                                        {item.accountId.name}
                                    </td>

                                    <td className="px-4 py-2 text-gray-400 font-semibold">
                                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </td>

                                    <td className="px-4 py-2 text-gray-400 font-semibold">
                                        {new Date(item.createdAt).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    )
}

export default Transactions