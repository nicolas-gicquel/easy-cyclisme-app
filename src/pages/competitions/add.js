import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
// import { useState } from 'react'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import Autocomplete from '@/components/Autocomplete'
import { useRouter } from 'next/router'

const Ajouter = () => {
    // Route
    const router = useRouter();

    // Hook pour le name
    // const [name, setName] = useState();
    // const [image, setImage] = useState();
    // const [category, setCategory] = useState();
    const [selectedOption, setSelectedOption] = useState("");
    const [clubs, setClubs] = useState([]);
    const [disciplines, setDisciplines] = useState([]);

    useEffect(() => {
        url();
            getDisciplines();
    }, []) // Sans les crochets ça tourne en boucle

    const url = async () => {
        await axios.get('/api/club')
            .then(res => {
                console.log("axios :", res.data.data[0].name_club);
                setClubs(res.data.data);
            });
    }

    const getDisciplines = async () => {
        await axios.get('/api/discipline')
            .then(res => {
                console.log("axios :", res.data.data[0].name_discipline);
                setDisciplines(res.data.data);
            });
    }



    // Méthode POST
    const submitForm = async (event) => {
        event.preventDefault(); // Je contrôle ma requête
        // console.log(event.target[1].files);

        const form = document.getElementById('addCompetition');
        console.log('form', form);
        const data = new FormData(form)
        console.log(data);
        const ajouterCompetition = async () => {
            await axios
                .post('/api/competition', data, { headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    router.push('/competitions')
                })
                .catch(error => {
                    // setErrors(error)
                    // if (error.response.status !== 409) throw error
                    console.log(error)
                })
        }
        ajouterCompetition();
    };

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
                                        <Label htmlFor="club">Club organisateur</Label>
                                        <select name="club_id" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                            <option selected>Selectionner un club</option>
                                            {clubs.map((club) => (
                                                <option value={club.id}>{club.name_club}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="discipline">Discipline concernée</Label>
                                        <select name="discipline_id" class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                            <option selected>Selectionner une discipline</option>
                                            {disciplines.map((discipline) => (
                                                <option value={discipline.id}>{discipline.name_discipline}</option>
                                            ))}
                                        </select>
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
                                        <Label htmlFor="city">
                                            Ville
                                        </Label>
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
                                        <Button className="ml-4">Ajouter</Button>
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