import NavBalance from '../components/NavBalance.jsx'
import QuickAccess from '../components/QuickAccess.jsx'
import RecentTransactions from '../components/RecentTransactions.jsx'

const Dashboard = () => {
    return (
        <>
            <main className='w-full h-full flex flex-wrap max-md:flex-col'>

                <div className='w-[40%] h-[50%] flex md:flex-col max-sm:flex-col gap-2 p-2 max-md:w-full '>
                    <section className='w-full h-[50%] max-md:h-full'>
                        <NavBalance />
                    </section>

                    <section className='w-full h-[50%] max-md:h-full '>
                        <QuickAccess />
                    </section>
                </div>

                <section className='w-[60%] h-[50%] max-md:w-full p-2'>
                    <RecentTransactions />
                </section>

                <section className='w-full h-[50%] max-md:hidden'></section>
            </main>
        </>
    )
}

export default Dashboard