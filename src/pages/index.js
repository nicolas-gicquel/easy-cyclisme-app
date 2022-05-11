import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import ApplicationLogo from '@/components/ApplicationLogo'
import dynamic from "next/dynamic";
// import EasyMap from '@/components/EasyMap'

export default function Home() {
    const { user } = useAuth({ middleware: 'guest' })
    const EasyMap = dynamic(() => import("../components/EasyMap"), {
        ssr: false
      });

      

    return (
        <>
            <Head>
                <title>Easy Cyclisme</title>

            </Head>

            <nav class="bg-white p-2 mt-0 w-full drop-shadow">
                <div class="container mx-auto flex flex-wrap items-center">
                    <div class="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
                        <a class="text-gray-600 no-underline hover:no-underline" href="#">
                            <div class="flex flex-col text-2xl pl-2 sm:h-20 sm:flex-row sm:text-4xl">
                                <ApplicationLogo />
                                <h1 class="text-center sm:mt-5">Easy Cyclisme</h1>
                            </div>
                        </a>
                    </div>
                    <div class="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
                        <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                            <li class="mr-3">
                                <a class="inline-block py-2 px-4 text-gray-600 no-underline" href="#">Accueil</a>
                            </li>
                            <li class="mr-3">
                                <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>





            <div class="bg-slate-100 h-screen">
                <div class="container mx-auto pt-24 md:pt-16 px-6">
                <div id="map">
                    <EasyMap/>
                </div>
                </div>
            </div>

            <footer>


            </footer>
            
        </>
    )
}


