import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import ApplicationLogo from '@/components/ApplicationLogo'
import dynamic from "next/dynamic";


const Home = () => {

    const { user } = useAuth({ middleware: 'guest' })
    const EasyMap = dynamic(() => import("../components/EasyMap"), {
        ssr: false
    });

    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        getGompetitions();
    }, [])

    const getGompetitions = async () => {
        await axios.get('/api/competition')
            .then(res => {
                // console.log("axios :", res.data);
                setCompetitions(res.data.data);
            });
    }

    


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
                                <ApplicationLogo competitions = {competitions}/>
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
                        <EasyMap competitions={competitions}/>
                    </div>
                    <div className="row my-4">

                    </div>
                </div>
            </div>

            <table class="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Date</th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Compétition</th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Adresse du départ</th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">CP</th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Ville</th>
                    <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white dark:bg-slate-800">
                  {competitions.map((competition) => (
                    <tr>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.date_competition}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.name_competition}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.address_competition}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.postal_code_competition}</td>
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.city_competition}</td>
                      


                    </tr>
                  ))}
                </tbody>
              </table>

            <footer>


            </footer>

        </>
    )
}
export default Home;


