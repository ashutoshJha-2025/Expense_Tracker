import axios from 'axios'
import { useState, useEffect } from 'react'

const RecentTransactions = () => {
    const [recentTransactions, setRecentTransactions] = useState([])

    const getAllTransactions = async () => {
        try {
            const result = await axios.get('https://expense-tracker-backend-jigy.onrender.com/api/user/transaction/get-all', { withCredentials: true })
            setRecentTransactions(result.data.results)
        } catch (error) {
            console.log(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Unauthorized user, login/register to continue !')
        }
    }

    useEffect(() => {
        getAllTransactions()
    }, [])

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })

    const typeBadgeClass = (type) => {
        if (type === 'Income') return 'bg-green-800 text-green-100'
        if (type === 'Expense') return 'bg-red-800 text-red-100'
        return 'bg-slate-700 text-slate-200'
    }

    return (
        <div className='w-full bg-[#1b1b1b] rounded-2xl border border-slate-800 flex flex-col items-start '>
            <div className='p-4'>
                <h1 className='text-lg font-semibold text-slate-200'>Recent Transactions</h1>
            </div>

            <div className='w-full border-t border-slate-800' />

            <div className='w-full p-2'>

                <div className='hidden md:block overflow-x-auto'>
                    <table className='w-full border-separate table-fixed border-spacing-y-2'>
                        <thead>
                            <tr className='text-xs uppercase tracking-widest text-gray-400'>
                                <th className='text-left px-4'>Title</th>
                                <th className='text-left px-4'>Category</th>
                                <th className='text-left px-4'>Amount</th>
                                <th className='text-left px-4'>Account</th>
                                <th className='text-left px-4'>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.slice(0, 5).map((item, index) => (
                                <tr key={index} className='text-sm'>
                                    <td className='px-4 py-2 text-gray-400 font-semibold truncate'>
                                        {item.title}
                                    </td>
                                    <td className='px-4 py-2'>
                                        <span className={`rounded-full px-3 py-1 text-sm ${typeBadgeClass(item.type)}`}>
                                            {item.categoryId?.name}
                                        </span>
                                    </td>
                                    <td className='px-4 py-2 text-slate-200 font-medium'>
                                        {item.amount}
                                    </td>
                                    <td className='px-4 py-2 text-gray-400 font-semibold'>
                                        {item.accountId?.name}
                                    </td>
                                    <td className='px-4 py-2 text-gray-400 font-semibold whitespace-nowrap'>
                                        {formatDate(item.createdAt)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ── Mobile Cards (hidden on desktop) ── */}
                <div className='flex flex-col gap-2 md:hidden'>
                    {recentTransactions.slice(0, 5).map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-between rounded-xl bg-slate-800/50 border border-slate-700 px-4 py-3 gap-3'
                        >
                            {/* Left: title + date */}
                            <div className='flex flex-col min-w-0'>
                                <span className='text-slate-200 font-semibold text-sm truncate'>
                                    {item.title}
                                </span>
                                <span className='text-gray-500 text-xs mt-0.5'>
                                    {formatDate(item.createdAt)} · {item.accountId?.name}
                                </span>
                            </div>

                            {/* Right: badge + amount */}
                            <div className='flex flex-col items-end gap-1 shrink-0'>
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadgeClass(item.type)}`}>
                                    {item.categoryId?.name}
                                </span>
                                <span className='text-slate-200 font-semibold text-sm'>
                                    {item.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default RecentTransactions