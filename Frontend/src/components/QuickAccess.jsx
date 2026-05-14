import addExpense from '../assets/add_expense.svg'
import { Link } from "react-router-dom";

const QuickAccess = () => {
    return (
        <>
            <div className='w-full h-[90%] bg-[#1B1B1B] rounded-2xl border border-slate-800 flex flex-col items-start mt-4'>
                <div className="p-2">
                    <h1 className="text-lg font-semibold text-slate-200 ml-2">Quick Access</h1>
                </div>
                <div className="w-full  border border-slate-800 "></div>

                <div className="w-full h-[75%] flex justify-start items-center ml-5">

                    <Link to='/add-expense' className="bg-[#28282A] w-[40%] h-18 flex justify-center items-center gap-2 rounded-2xl cursor-pointer">
                        <div className="w-10 h-10 bg-[#7B3642] rounded-full  p-2 overflow-hidden">
                            <img src={addExpense} alt="add icon" className='w-full object-center' />
                        </div>
                        <span className='text-white font-medium text-md'>+ New Expense</span>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default QuickAccess