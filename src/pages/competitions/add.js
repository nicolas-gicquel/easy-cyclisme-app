import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
// import { useState } from 'react'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const Ajouter = () => {
    // Route
    const router = useRouter()

    // const [selectedOption, setSelectedOption] = useState('')
    const [clubs, setClubs] = useState([])
    const [disciplines, setDisciplines] = useState([])
    const [cyclistsCategories, setCyclistsCategories] = useState([])

    useEffect(() => {
        url()
        getDisciplines()
        getCyclistsCategories()
    }, []) // Sans les crochets ça tourne en boucle

    const url = async () => {
        await axios.get('/api/club').then(res => {
            console.log('axios :', res.data.data[0].name_club)
            setClubs(res.data.data)
        })
    }

    const getDisciplines = async () => {
        await axios.get('/api/discipline').then(res => {
            console.log('axios :', res.data.data[0].name_discipline)
            setDisciplines(res.data.data)
        })
    }

    const getCyclistsCategories = async () => {
        await axios.get('/api/cyclists_category').then(res => {
            setCyclistsCategories(res.data.data)
        })
    }

    // Création de compétions
    const submitForm = async event => {
        event.preventDefault() // Je contrôle ma requête

        //Je récupère les valeurs des checkbox
        const categories = document.getElementsByName('cyclistsCategories')
        const cyclistsCategories = []
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].checked) {
                cyclistsCategories.push(categories[i].value)
            }
        }

        //Je cible mon formulaire
        const form = document.getElementById('addCompetition')

        //Je récupère la donné du formulaire
        const data = new FormData(form)
        data.append('categories', cyclistsCategories.join())
        // Affiche le contenu envoyer par le formulaire
        // for (var pair of data.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]);
        // }

        //J'envoie les données à l'API
        const ajouterCompetition = async () => {
            await axios
                .post('/api/competition', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })

                .then(
                    router.push('/competitions')
                )
                .catch(error => {
                    // setErrors(error)
                    if (error.response.status !== 409) throw error
                })
        }
        ajouterCompetition()
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ajouter une nouvelle compétition
                </h2>
            }>
            <Head>
                <title>Easy-cyclisme</title>
            </Head>

            <div className="flex flex-col">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">
                                <form onSubmit={submitForm} id="addCompetition">
                                    <div className="mt-4">
                                        <Label htmlFor="name">
                                            Nom de la compétition
                                        </Label>
                                        <Input
                                            name="name_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="club">
                                            Club organisateur
                                        </Label>
                                        <select
                                            name="club_id"
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            aria-label="Default select example">
                                            <option selected>
                                                Selectionner un club
                                            </option>
                                            {clubs.map(club => (
                                                <option value={club.id}>
                                                    {club.name_club}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="discipline">
                                            Discipline concernée
                                        </Label>
                                        <select
                                            name="discipline_id"
                                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            aria-label="Default select example">
                                            <option selected>
                                                Selectionner une discipline
                                            </option>
                                            {disciplines.map(discipline => (
                                                <option value={discipline.id}>
                                                    {discipline.name_discipline}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="discipline">
                                            Catégories concernées
                                        </Label>
                                        {cyclistsCategories.map(
                                            cyclistsCategory => (
                                                <div className="form-check">
                                                    <input
                                                        name="cyclistsCategories"
                                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                                        type="checkbox"
                                                        value={
                                                            cyclistsCategory.id
                                                        }
                                                        id="flexCheckDefault"
                                                    />
                                                    <label
                                                        className="form-check-label inline-block text-gray-800"
                                                        for="flexCheckDefault">
                                                        {
                                                            cyclistsCategory.name_cyclists_category
                                                        }
                                                    </label>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="date">
                                            Date de la compétition
                                        </Label>
                                        <Input
                                            name="date_competition"
                                            type="date"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="address">
                                            Adresse de la compétition
                                        </Label>
                                        <Input
                                            name="address_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="postal_code">
                                            Code postale
                                        </Label>
                                        <Input
                                            name="postal_code_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="city">Ville</Label>
                                        <Input
                                            name="city_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="latitude">
                                            Latitude
                                        </Label>
                                        <Input
                                            name="lat_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="longitude">
                                            Longitude
                                        </Label>
                                        <Input
                                            name="lon_competition"
                                            type="text"
                                            className="mt-1 block w-full"
                                            required
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="address">
                                            Détails de l'organisation
                                        </Label>
                                        <Input
                                            name="organizational_details"
                                            type="text"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                    <div className="flex items-center justify-end mt-4">
                                        <Button className="ml-4">
                                            Ajouter
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Ajouter
