import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import { useState, useEffect } from 'react'


const Competitions = () => {
    // Hooks : useState, useEffect
    const [cyclistsCategories, setCategories] = useState([])

    useEffect(() => {
        url()
    }, []) // Sans les crochets ça tourne en boucle

    const url = async () => {
        await axios.get('/api/cyclists_category').then(res => {
            // console.log("axios :", res.data);
            setCategories(res.data.data)
        })
    }

    // Supprimer un sport

    const deleteCompetition = cyclistsCategoryID => {
        // console.log("l'id sport à supprimer est", sportID);
        axios.delete(`/api/cyclists_category/${cyclistsCategoryID}`).then(url())
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Liste des catégories
                </h2>
            }>
            {/* Titre de l'onglet */}
            <Head>
                <title>Liste des catégories</title>
            </Head>

            {/*************************** Contenu ***************************/}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-end mt-4">
                            <a href="/cyclistsCategories/add">
                                <Button className="ml-4 mr-4">
                                    Créer une nouvelle catégorie
                                </Button>
                            </a>
                        </div>

                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="bg-white"></div>
                            <table className="border-collapse table-auto w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                            Nom de la catégorie
                                        </th>
                                        <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800">
                                    {cyclistsCategories.map(
                                        cyclistsCategory => (
                                            <tr key={cyclistsCategory.id}>
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    {
                                                        cyclistsCategory.name_cyclists_category
                                                    }
                                                </td>
                                                <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                                    <p className="mt-1 text-sm text-gray-500 text-center">
                                                        <a
                                                            href={`/cyclistsCategories/edit/${cyclistsCategory.id}`}>
                                                            Editer{' '}
                                                        </a>
                                                        <button
                                                            onClick={() => {
                                                                deleteCompetition(
                                                                    cyclistsCategory.id,
                                                                )
                                                            }}>
                                                            Supprimer
                                                        </button>
                                                    </p>
                                                </td>

                                                {/*<td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{cyclistsCategory.postal_code_cyclistsCategory}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{cyclistsCategory.postal_code_cyclistsCategory}</td> */}
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Competitions
