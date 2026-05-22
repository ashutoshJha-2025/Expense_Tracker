import { useState, useEffect } from "react"
import { showSuccess, showWarning, showError } from "../components/ToastMessageBox.jsx";
import axios from 'axios'


const Accounts = () => {
    const [isOpen, setIsOpen] = useState('close')
    const [formData, setFormData] = useState({ accountBalance: '', name: '' })
    const [account, setAccount] = useState([])

    const addAccount = async () => {
        try {
            const result = await axios.post('https://expense-tracker-backend-jigy.onrender.com/api/user/account/add', formData, { withCredentials: true })
            showSuccess(result.data.message)
            setIsOpen('close')
            setFormData({ accountBalance: 0, name: '' })
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    }

    const getAllAccount = async () => {
        try {
            const result = await axios.get('https://expense-tracker-backend-jigy.onrender.com/api/user/account/get-all', { withCredentials: true })
            setAccount(result.data.results)
        } catch (error) {
            console.log('Error in getting categories:-\n', error.message)
        }
    }
    const delAccount = async (name) => {
        try {
            const result = await axios.delete(
                'https://expense-tracker-backend-jigy.onrender.com/api/user/account/delete',
                {
                    data: { name },
                    withCredentials: true
                }
            );

            showSuccess(result.data.message);
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    };
    useEffect(() => {
        getAllAccount()
    }, [addAccount, delAccount])
    return (
        <>
            <div className="w-full h-full flex justify-center items-center z-0 ">

                <div className=" flex flex-col w-[70%] h-[70%] items-center gap-5">
                    <div className="w-full h-[90%] flex flex-col flex-wrap border-2 border-[#1b1b1b] p-5 rounded-lg">
                        {account.map((acc, index) => (
                            <div key={index} className="border border-[#A8A68D] px-2 py-1 text-[#fffbc1] bg-[#4C4A3E] sm:w-50 max-sm:w-43 rounded-lg flex items-center mb-2">
                                <div className="h-full w-[90%]">
                                    <h1 className="text-lg font-semibold">{acc.name}</h1>
                                    <h1 className="text-md font-medium ">Balance: <span className="text-green-400 font-normal">  {acc.accountBalance || 0}  {localStorage.getItem('currency') || 'INR'}</span></h1>
                                </div>
                                <span onClick={() => delAccount(acc.name)} className="w-5 h-5 border-2 border-red-500 flex justify-center items-center rounded-sm cursor-pointer">-</span>
                            </div>
                        ))}
                    </div>


                    <div
                        onClick={() => setIsOpen('open')}
                        className="text-[#A8A68D] flex justify-center items-center gap-4  border-2 border-[#A8A68D] px-4 py-2 rounded-md cursor-pointer">
                        <div className="border-2 border-[#A8A68D] h-6 w-6 flex justify-center items-center rounded-full text-center">
                            +
                        </div>
                        <h1 className="font-semibold sm:text-lg max-sm:text-sm">ADD NEW ACCOUNT</h1>
                    </div>
                </div>


            </div>

            <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-xs  z-100 ${isOpen === 'close' ? 'hidden' : ''}`}>
                <div className="w-80 h-50 bg-[#585752] rounded-xl flex flex-col items-center justify-start ">
                    <h1 className="text-[#FFFAC5] text-lg font-medium px-4 py-2">Add new account</h1>

                    <div className="gap-4 w-full flex justify-start items-center text-lg font-medium mb-2 px-4">
                        <h1 className="text-[#FFFAC5]">Initial amount</h1>
                        <input required={true} value={formData.accountBalance} onChange={(e) => { setFormData({ ...formData, accountBalance: e.target.value }) }} type="number" placeholder="0" className="outline-none border border-[#FFFAC5] px-4 py-1 rounded-md text-white placeholder:text-[#FFFAC5] w-30" />
                    </div>

                    <div className="w-full flex justify-start items-center gap-4 mb-4 px-4">
                        <h1 className="text-[#FFFAC5] text-md font-medium">Name</h1>
                        <input required={true} value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} type="text" placeholder="Untitled" className="outline-none border border-[#FFFAC5] px-4 py-1 rounded-md text-white placeholder:text-[#FFFAC5]" />
                    </div>

                    <div className="flex justify-around items-center px-2 gap-5 ">
                        <button
                            onClick={() => {
                                showWarning('Failed !')
                                setIsOpen('close')
                            }}
                            className="text-yellow-400 font-normal text-lg border border-yellow-500 rounded-lg px-3 py-1 cursor-pointer">Cancel
                        </button>


                        <button
                            onClick={addAccount}
                            className="text-yellow-400 font-normal text-lg border border-yellow-500 rounded-lg px-3 py-1 cursor-pointer">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Accounts