import { Routes, Route } from "react-router-dom"
import { ToastMessageBox } from "./components/ToastMessageBox.jsx"
import AddExpense from "./pages/AddExpense.jsx"
import Profile from "./pages/Profile.jsx"
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Navbar from "./components/Navbar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Category from "./pages/Category.jsx"
import Accounts from "./pages/Accounts.jsx"
import Transactions from "./pages/Transactions.jsx"

const App = () => {
  return (
    <>
      <ToastMessageBox />
      <div className="h-screen md:flex ">
        <Navbar />
        <div className="flex-1 max-md:h-[90%]">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/add-expense' element={<AddExpense />} />
            <Route path='/' element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/category" element={<Category />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App