import { useEffect, useState } from "react"
import { showSuccess, showWarning, showError } from "../components/ToastMessageBox.jsx";
import axios from 'axios'


const Category = () => {
    const [isOpen, setIsOpen] = useState('close')
    const [formData, setFormData] = useState({ name: '', type: 'Expense' })
    const [category, setCategory] = useState([])

    const addCategory = async () => {
        try {
            const result = await axios.post('https://expense-tracker-backend-jigy.onrender.com/api/user/category/add', formData, { withCredentials: true })
            showSuccess(result.data.message)
            setIsOpen('close')
            setFormData({ ...formData, name: '' })
        } catch (error) {
            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    }
    const getAllCategory = async () => {
        try {
            const result = await axios.get('https://expense-tracker-backend-jigy.onrender.com/api/user/category/get-all', { withCredentials: true })
            setCategory(result.data.results)
        } catch (error) {
            console.log('Error in getting categories:-\n', error.message)
        }
    }
    const delCategory = async (name) => {
        try {
            const result = await axios.delete(
                'https://expense-tracker-backend-jigy.onrender.com/api/user/category/delete',
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
        getAllCategory()
    }, [addCategory, delCategory])

    return (
        <>
            <div className="w-full h-full flex justify-center items-center ">

                <div className=" flex flex-col md:w-[70%] md:h-[70%] items-center max-md:gap-5">

                    <div className="flex w-full md:h-[80%] gap-10">

                        <div className="w-[50%] h-full">
                            <h1 className="text-[#03BEA8] sm:text-xl font-bold px-4 py-2">Income Categories</h1>
                            <div className="w-full  border border-slate-800 "></div>
                            <ul className="md:text-lg max-md:text-md max-sm:text-sm font-medium text-white px-4 py-2 md:ml-5">
                                {category.filter(cat => cat.type === 'Income').map((cat, index) => (
                                    <div key={index} className="w-[80%] flex justify-between items-center mb-2">
                                        <li>{cat.name}</li>
                                        <span onClick={() => delCategory(cat.name)} className="w-5 h-5 border border-red-500 flex justify-center items-center rounded-sm cursor-pointer">-</span>
                                    </div>
                                ))}
                            </ul>
                        </div>


                        <div className="w-[50%] h-full">
                            <h1 className="text-[#03BEA8] sm:text-xl font-bold px-4 py-2">Expense Categories</h1>
                            <div className="w-full  border border-slate-800 "></div>
                            <ul className="md:text-lg max-md:text-md max-sm:text-sm font-medium text-white px-4 py-2 md:ml-5">
                                {category.filter(cat => cat.type === 'Expense').map((cat, index) => (
                                    <div key={index} className="w-[80%] flex justify-between items-center mb-2">
                                        <li >{cat.name}</li>
                                        <span onClick={() => delCategory(cat.name)} className="w-5 h-5  border border-red-500 flex justify-center items-center rounded-sm cursor-pointer">-</span>
                                    </div>
                                ))}
                            </ul>
                        </div>

                    </div>


                    <div
                        onClick={() => setIsOpen('open')}
                        className="text-[#A8A68D] flex justify-center items-center gap-4 border-2 border-[#A8A68D] px-4 py-2 rounded-md cursor-pointer">
                        <div className="border-2 border-[#A8A68D] h-6 w-6 flex justify-center items-center rounded-full text-center">
                            +
                        </div>
                        <h1 className="font-semibold sm:text-lg max-sm:text-sm">ADD NEW CATEGORY</h1>
                    </div>
                </div>

            </div>

            <div className={`fixed inset-0 flex justify-center items-center backdrop-blur-xs  z-100 ${isOpen === 'close' ? 'hidden' : ''}`}>
                <div className="w-80 max-sm:w-75 h-50 bg-[#585752] rounded-xl flex flex-col items-center justify-start ">
                    <h1 className="text-[#FFFAC5] text-lg font-medium px-4 py-2">Add new category</h1>

                    <div className="w-full flex justify-around items-center text-lg font-medium mb-2">
                        <h1 className="text-[#FFFAC5]">Type:</h1>
                        <h1 onClick={() => setFormData({ ...formData, type: 'Income' })} className={`${formData.type === 'Income' ? 'text-[#F7F3C0]' : 'text-[#A3A28A]'} cursor-pointer`}>Income</h1>
                        <h1 onClick={() => setFormData({ ...formData, type: 'Expense' })} className={`${formData.type === 'Expense' ? 'text-[#F7F3C0]' : 'text-[#A3A28A]'} cursor-pointer`}>Expense</h1>
                    </div>

                    <div className="w-full flex justify-center items-center gap-4 mb-4">
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
                            onClick={addCategory}
                            className="text-yellow-400 font-normal text-lg border border-yellow-500 rounded-lg px-3 py-1 cursor-pointer">Save</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category