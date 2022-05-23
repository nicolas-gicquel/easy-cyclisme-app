import Head from 'next/head'
// import Link from 'next/link'
// import { useAuth } from '@/hooks/auth'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import ApplicationLogo from '@/components/ApplicationLogo'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const Home = () => {
    // const { user } = useAuth({ middleware: 'guest' })
    const EasyMap = dynamic(() => import('../components/EasyMap'), {
        ssr: false,
    })

    const [competitions, setCompetitions] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [cyclistsCategories, setCyclistsCategories] = useState([])

    useEffect(() => {
        getDisciplines()
        getCyclistsCategories()
    }, [])

    const getDisciplines = async () => {
        await axios.get('/api/discipline').then(res => {
            // console.log("axios :", res.data);
            setDisciplines(res.data.data)
        })
    }

    const getCyclistsCategories = async () => {
        await axios.get('/api/cyclists_category').then(res => {
            // console.log("axios :", res.data);
            setCyclistsCategories(res.data.data)
        })
    }

    const submitForm = async event => {
        event.preventDefault() // Je contrôle ma requête

        const discipline = document.getElementById('discipline').value
        const cyclistsCategory = document.getElementById('cyclistsCategory')
            .value
        const dateCompetition = document.getElementById('dateCompetition').value

        const searchCompetition = async () => {
            await axios
                .get(
                    '/api/search?discipline_id=' +
                        discipline +
                        '&cyclists_category_id=' +
                        cyclistsCategory +
                        '&date_competition=' +
                        dateCompetition,
                )

                .then(res => {
                    setCompetitions(res.data.data)
                })
                .catch(error => {
                    // setErrors(error)
                    if (error.response.status !== 409) throw error
                })
        }

        searchCompetition()
    }

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

            <div className="flex flex-col">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">
                                <form
                                    onSubmit={submitForm}
                                    id="searchCompetition">
                                    <div className="mt-4">
                                        <Label htmlFor="discipline">
                                            Discipline concernée
                                        </Label>
                                        <select
                                            id="discipline"
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            aria-label="Default select example">
                                            <option value="" selected>
                                                Selectionner une discipline
                                            </option>
                                            {disciplines.map(discipline => (
                                                <option key={discipline.id} value={discipline.id}>
                                                    {discipline.name_discipline}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="discipline">
                                            Catégorie concernée
                                        </Label>
                                        <select
                                            id="cyclistsCategory"
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            aria-label="Default select example">
                                            <option value="" selected>
                                                Selectionner une catégorie
                                            </option>
                                            {cyclistsCategories.map(
                                                cyclistsCategory => (
                                                    <option
                                                        key={cyclistsCategory.id}
                                                        value={
                                                            cyclistsCategory.id
                                                        }>
                                                        {
                                                            cyclistsCategory.name_cyclists_category
                                                        }
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="date">
                                            Date de la compétition
                                        </Label>
                                        <Input
                                            id="dateCompetition"
                                            type="date"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <Button className="ml-4">
                                            Rechercher
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-100 h-screen">
                <div className="container mx-auto pt-24 md:pt-16 px-6">
                    <div id="map">
                        <EasyMap competitions={competitions} />
                    </div>
                    <div className="row my-4"></div>
                </div>
            </div>

            <div className="py-12 bg-slate-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="border-collapse table-auto w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Date
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Compétition
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Adresse du départ
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            CP
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Ville
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
                                            Détails
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800">
                                    {competitions.map(competition => (
                                        <tr key={competition.id}>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                {competition.date_competition}
                                            </td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                <span className="uppercase">
                                                    {
                                                        competition.city_competition
                                                    }
                                                </span>{' '}
                                                - {competition.name_competition}
                                            </td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                {
                                                    competition.address_competition
                                                }
                                            </td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                {
                                                    competition.club
                                                        .postal_code_competition
                                                }
                                            </td>
                                            <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                {
                                                    competition.organization_details
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Home
