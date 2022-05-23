import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Disciplines = () => {


    // Hooks : useState, useEffect
    const [disciplines, setDisciplines] = useState([])

    console.log('avant useEffect', disciplines)

    useEffect(() => {
        url()
    }, []) // Sans les crochets ça tourne en boucle

    const url = async () => {
        await axios.get('/api/discipline').then(res => {
            // console.log("axios :", res.data);
            setDisciplines(res.data.data)
        })
    }

    // Supprimer un sport

    const deleteDiscipline = disciplineID => {
        // console.log("l'id sport à supprimer est", sportID);
        axios.delete(`/api/discipline/${disciplineID}`).then(url())
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Liste des disciplines
                </h2>
            }>
            {/* Titre de l'onglet */}
            <Head>
                <title>Liste des disciplines</title>
            </Head>

            {/*************************** Contenu ***************************/}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center justify-end mt-4">
                            <a href="/disciplines/add">
                                <Button className="ml-4 mr-4">
                                    Créer une nouvelle discipline
                                </Button>
                            </a>
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="bg-white">
                                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                                        Liste des disciplines
                                    </h2>

                                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {disciplines.map(discipline => (
                                            <div
                                                key={discipline.id}
                                                className="group relative">
                                                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                                    <img
                                                        src={`http://localhost:8000/api/image/${discipline.image_discipline}`}
                                                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                                    />
                                                </div>
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            {
                                                                discipline.name_discipline
                                                            }
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            <a
                                                                href={`http://localhost:3000/disciplines/edit/${discipline.id}`}>
                                                                Editer
                                                            </a>
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            <button
                                                                onClick={() => {
                                                                    deleteDiscipline(
                                                                        discipline.id,
                                                                    )
                                                                }}>
                                                                Supprimer
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Disciplines
