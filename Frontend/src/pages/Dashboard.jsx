import NavBalance from '../components/NavBalance.jsx'
import QuickAccess from '../components/QuickAccess.jsx'
import RecentTransactions from '../components/RecentTransactions.jsx'

const Dashboard = () => {
    return (
        <>
            <div className="w-full h-full grid md:grid-cols-12  bg-[#0B0B0B] text-white">
                <main className="md:col-span-12 col-span-6 grid md:grid-cols-10 md:grid-rows-12 md:p-4 max-md:flex max-md:flex-col gap-4 max-md:p-2">
                    <section className="md:col-span-4 md:row-span-3 bg-[#1B1B1B] rounded-2xl border-slate-800 border py-4">
                        <NavBalance />
                    </section>

                    <section className="md:col-span-6 md:row-span-6 px-2">
                        <RecentTransactions />
                    </section>

                    <section className="md:col-span-4 md:row-span-3">
                        <QuickAccess />
                    </section>

                    <section className="md:col-span-10 md:row-span-6">
                    </section>
                </main>
            </div>
        </>
    )
}

export default Dashboard