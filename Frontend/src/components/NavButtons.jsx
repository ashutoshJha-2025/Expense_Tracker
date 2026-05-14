import { NavLink } from "react-router-dom";

const NavButtons = ({ title, route }) => {
    return (
        <>
            <NavLink
                to={route}
                className={({ isActive }) => `hover:bg-[#28282A] active:scale-95 cursor-pointer transition-all duration-150 ease-in-out md:px-10 md:py-2 sm:px-2 max-sm:px-1  rounded-2xl ${isActive ? 'text-[#03BEA8]' : 'text-slate-200'}`}>

                <h1 className='font-semibold md:text-lg sm:text-sm max-sm:text-xs text-center'>{title}</h1>

            </NavLink>
        </>
    )
}

export default NavButtons