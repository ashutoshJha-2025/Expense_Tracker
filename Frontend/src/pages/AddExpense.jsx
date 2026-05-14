import { Link } from "react-router-dom";
import { showSuccess, showError, showWarning, showInfo } from "../components/ToastMessageBox.jsx";
import { useState, useEffect } from "react";
import axios from 'axios';
import backspaceImg from "../assets/backspace.svg"

const AddExpense = () => {
    const [activeType, setActiveType] = useState("EXPENSE");
    const [display, setDisplay] = useState("0");
    const [expression, setExpression] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: activeType === 'INCOME' ? 'Income' : activeType === 'EXPENSE' ? 'Expense' : 'Transfer',
        amount: display,
        categoryName: selectedCategory,
        accountName: selectedAccount,
    })

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            categoryName: selectedCategory,
            accountName: selectedAccount,
            amount: display,
            type: activeType === 'INCOME' ? 'Income' : activeType === 'EXPENSE' ? 'Expense' : 'Transfer',
        }));
    }, [display, selectedAccount, selectedCategory, activeType]);

    const sendNewTransaction = async () => {
        try {
            const result = await axios.post('http://localhost:8000/api/user/transaction/add', formData, { withCredentials: true });
            showSuccess(result.data.message);
        } catch (error) {

            showError(error.response?.data?.message || error.response?.data?.errors[0]?.msg || 'Invalid credentials')
        }
    };


    const handleButtonClick = (value) => {
        if (value === "=") {
            try {
                setExpression((prev) => {
                    const result = eval(prev.replace(/x/g, "*")).toString();
                    setDisplay(result);
                    return result;
                });
            } catch (error) {
                setDisplay("Error");
                setExpression("");
            }
        } else if (value === "backspace") {
            setExpression((prev) => {
                const newExpr = prev.slice(0, -1);
                setDisplay(newExpr || "0");
                return newExpr;
            });
        } else {
            setExpression((prev) => {
                const newExpr = prev + value;
                setDisplay(newExpr);
                return newExpr;
            });
        }
    };

    const getAllAccounts = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/user/account/get-all', { withCredentials: true });
            setAccounts(result.data.results);
            if (result.data.results.length > 0) {
                setSelectedAccount(result.data.results[0].name);
            }
        } catch (error) {
            console.log('Error in getting accounts:', error.message);
        }
    };

    const getAllCategories = async () => {
        try {
            const result = await axios.get('http://localhost:8000/api/user/category/get-all', { withCredentials: true });
            const categoryType = activeType === 'INCOME' ? 'Income' : 'Expense';
            const filtered = result.data.results.filter(cat => cat.type === categoryType);
            setCategories(filtered);
            if (filtered.length > 0) {
                setSelectedCategory(filtered[0].name);
            }
        } catch (error) {
            console.log('Error in getting categories:', error.message);
        }
    };

    useEffect(() => {
        getAllCategories();
        getAllAccounts();
    }, [activeType]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key;
            if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
                handleButtonClick(key);
            } else if (key === 'Enter') {
                handleButtonClick('=');
            } else if (key === 'Backspace') {
                handleButtonClick('backspace');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);



    return (
        <>
            <div className="w-full h-full flex justify-center items-center ">
                <div className="w-75 h-[97%] bg-[#1B1B1B] rounded-2xl border border-slate-800 flex flex-col p-2 gap-2 ">

                    <div className="flex justify-between items-center px-2">
                        <Link onClick={() => showError('Failed to create transaction')} to="/dashboard" className="text-yellow-400 font-normal text-lg">Cancel</Link>
                        <Link onClick={() => sendNewTransaction()} to="/dashboard" className="text-yellow-400 font-normaltext-lg">Save</Link>
                    </div>

                    <div className="flex justify-around items-center text-white">
                        <h1
                            onClick={() => setActiveType("INCOME")}
                            className={`cursor-pointer ${activeType === "INCOME"
                                ? "font-bold text-slate-500"
                                : "font-normal"
                                }`}
                        >
                            INCOME
                        </h1>

                        <h1>|</h1>

                        <h1
                            onClick={() => setActiveType("EXPENSE")}
                            className={`cursor-pointer ${activeType === "EXPENSE"
                                ? "font-bold text-slate-500"
                                : "font-normal"
                                }`}
                        >
                            EXPENSE
                        </h1>

                        <h1>|</h1>

                        <h1
                            onClick={() => setActiveType("TRANSFER")}
                            className={`cursor-pointer ${activeType === "TRANSFER"
                                ? "font-bold text-slate-500"
                                : "font-normal"
                                }`}
                        >
                            TRANSFER
                        </h1>
                    </div>

                    <div className="w-full h-20 flex px-x gap-2">
                        <div className="w-[50%] h-full flex flex-col gap-1 justify-center items-center">
                            <h1 className="text-[#A4A489] text-lg">Account</h1>
                            <select
                                name="account"
                                value={selectedAccount}
                                onChange={(e) => setSelectedAccount(e.target.value)}
                                className="w-full px-4 py-1 text-center cursor-pointer outline-none border border-[#A4A489]  text-white rounded-lg">
                                {accounts.map((acc, index) => (
                                    <option key={index} value={acc.name} className="text-center bg-[#1a1a1a] text-white"  >{acc.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-[50%] h-full flex flex-col gap-1 justify-center items-center">
                            <h1 className="text-[#A4A489] text-lg">{activeType === 'TRANSFER' ? 'Account' : 'Category'}</h1>
                            <select
                                name="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-1 text-center cursor-pointer outline-none border border-[#A4A489] text-white rounded-lg">
                                {(activeType === 'TRANSFER') ? accounts.map((acc, index) => (
                                    <option key={index} value={acc.name} className="text-center bg-[#1a1a1a] text-white" >{acc.name}</option>
                                )) : categories.map((cat, index) => (
                                    <option key={index} value={cat.name} className="text-center bg-[#1a1a1a] text-white" >{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <input
                        name="title"
                        type="text"
                        placeholder="Add Title"
                        required={true}
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full h-10 px-2 font-light border outline-none border-[#A4A489] text-white rounded-lg ">
                    </input>

                    <input
                        name="description"
                        type="text"
                        placeholder="Add description (optional)"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full h-15 px-2 font-light border outline-none border-[#A4A489] text-white rounded-lg ">
                    </input>

                    <div className="w-full h-15 bg-[#424242] border border-[#A8A68D] rounded-lg flex gap-1">
                        <input
                            name="total"
                            type="number"
                            placeholder={0}
                            disabled={true}
                            value={display}
                            className="w-[90%] h-full text-white  placeholder:text-white text-4xl font-bold text-right ">
                        </input>
                        <button onClick={() => handleButtonClick('backspace')} className="w-[10%] overflow-hidden flex justify-center mr-2 cursor-pointer">
                            <img src={backspaceImg} alt="backspace" className='w-full object-center ' />
                        </button>
                    </div>

                    <div className="w-full h-55 grid grid-cols-4 grid-rows-4 gap-1">
                        <button onClick={() => handleButtonClick('+')} className="col-span-1 row-span-1 cursor-pointer bg-[#ADAA8B] text-[#424242] text-2xl font-medium rounded-lg text-center" >+</button>
                        <button onClick={() => handleButtonClick('7')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >7</button>
                        <button onClick={() => handleButtonClick('8')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >8</button>
                        <button onClick={() => handleButtonClick('9')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >9</button>

                        <button onClick={() => handleButtonClick('-')} className="col-span-1 row-span-1 cursor-pointer bg-[#ADAA8B] text-[#424242] text-2xl font-medium rounded-lg text-center" >-</button>
                        <button onClick={() => handleButtonClick('4')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >4</button>
                        <button onClick={() => handleButtonClick('5')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >5</button>
                        <button onClick={() => handleButtonClick('6')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >6</button>

                        <button onClick={() => handleButtonClick('x')} className="col-span-1 row-span-1 cursor-pointer bg-[#ADAA8B] text-[#424242] text-2xl font-medium rounded-lg text-center" >x</button>
                        <button onClick={() => handleButtonClick('1')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >1</button>
                        <button onClick={() => handleButtonClick('2')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >2</button>
                        <button onClick={() => handleButtonClick('3')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >3</button>

                        <button onClick={() => handleButtonClick('/')} className="col-span-1 row-span-1 cursor-pointer bg-[#ADAA8B] text-[#424242] text-2xl font-medium rounded-lg text-center" >/</button>
                        <button onClick={() => handleButtonClick('0')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >0</button>
                        <button onClick={() => handleButtonClick('.')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >.</button>
                        <button onClick={() => handleButtonClick('=')} className="col-span-1 row-span-1 cursor-pointer text-[#ADAA8B] text-2xl font-medium rounded-lg text-center border border-[#ADAA8B]" >=</button>
                    </div>

                    <div className="flex justify-around items-center text-white mt-2">
                        <h1>{date}</h1>
                        <h1>|</h1>
                        <h1>{time}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddExpense