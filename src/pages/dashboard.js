import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tableau de bord
                </h2>
            }>
            <Head>
                <title>Administration Easy Admin</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Vous êtes bien connecté!
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-center mb-7">Gestion de l'application</h2>

            <div className="container flex justify-evenly mx-auto ">
                <div class="grid-col-3 grid-flow-col gap-8 columns-12 w-max flex justify-evenly">
                    <div className="columns-12 bg-[url('/competition.jpg')] bg-cover h-96">
                        01
                    </div>
                    <div className="columns-12 bg-[url('/img/hero-pattern.svg')]">
                        09
                    </div>
                    <div className="columns-12 bg-[url('/img/hero-pattern.svg')]">
                        09
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard
