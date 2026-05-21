import NavBalance from '../components/NavBalance.jsx'
import QuickAccess from '../components/QuickAccess.jsx'
import RecentTransactions from '../components/RecentTransactions.jsx'

const Dashboard = () => {
    return (
        <>
            {/* <div className="w-full h-full grid md:grid-cols-12  bg-[#0B0B0B] text-white">
                <main className=" md:col-span-12 col-span-6 grid md:grid-cols-10 md:grid-rows-12 md:p-4 max-md:flex max-md:flex-col gap-4 max-md:p-2">
                    <section className="bg-green-500 md:col-span-4 md:row-span-3 max-md:col-span-4">
                        <NavBalance />
                    </section>

                    <section className="bg-red-500 md:col-span-6 md:row-span-6 px-2">
                        <RecentTransactions />
                    </section>

                    <section className="bg-yellow-500 md:col-span-4 md:row-span-3">
                        <QuickAccess />
                    </section>

                    <section className="md:col-span-10 md:row-span-6">
                    </section>
                </main>
            </div> */}

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