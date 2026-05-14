import userIcon from '../assets/face_icon.svg'
import NavButtons from '../components/NavButtons.jsx'

const Navbar = () => {
    const name = localStorage.getItem('username')
    return (
        <>
            <div className='md:w-47.5 h-full text-white relative'>
                <aside className="md:h-full bg-[#1b1b1b] flex flex-col justify-around items-center max-md:absolute max-md:bottom-0 max-md:w-screen max-md:h-10">
                    <div className="flex flex-col p-8 justify-center items-center max-md:hidden">
                        <div className="w-20 h-20 rounded-full border-2 border-white p-2 overflow-hidden">
                            <img src={userIcon} alt="user icon" className='w-full object-center' />
                        </div>
                        <h1 className='text-xl font-bold text-slate-400'>
                            {name
                                ?.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                .join(' ') || null
                            }
                        </h1>
                    </div>

                    <nav className="flex md:flex-col md:items-start max-md:justify-around max-md:items-center md:gap-3 md:mb-30">
                        <NavButtons title="Dashboard" route="/dashboard" />
                        <NavButtons title="Transactions" route="/transactions" />
                        <NavButtons title="Category" route="/category" />
                        <NavButtons title="Accounts" route="/accounts" />
                        <NavButtons title="Profile" route="/" />
                    </nav>
                </aside>
            </div>
        </>
    )
}

export default Navbar