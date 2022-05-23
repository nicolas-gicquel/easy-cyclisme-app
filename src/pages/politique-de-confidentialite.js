import Head from 'next/head'
import ApplicationLogo from '@/components/ApplicationLogo'
import Footer from '@/components/Footer'

const PolitiqueConfidentialite = () => {
    return (
        <>
            <Head>
                <title>Easy Cyclisme</title>
                <meta
                    name="description"
                    content="Moteur de recherche de courses et compétions de cyclisme en Bretagne et Pays de la Loire"></meta>
            </Head>

            <nav className="bg-white p-2 mt-0 w-full drop-shadow">
                <div className="container mx-auto flex flex-wrap items-center">
                    <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
                        <a
                            className="text-gray-600 no-underline hover:no-underline"
                            href="#">
                            <div className="flex flex-col text-2xl pl-2 sm:h-20 sm:flex-row sm:text-4xl">
                                <ApplicationLogo />
                                <h1 className="text-center sm:mt-5">
                                    Easy Cyclisme
                                </h1>
                            </div>
                        </a>
                    </div>
                    <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li className="mr-3">
                                <a
                                    className="inline-block py-2 px-4 text-gray-600 no-underline"
                                    href="#">
                                    Accueil
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                                    href="#">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Footer />
        </>
    )
}
export default PolitiqueConfidentialite
