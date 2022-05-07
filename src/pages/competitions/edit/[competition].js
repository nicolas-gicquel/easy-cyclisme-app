import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const Edit = ({ toto }) => {
    console.log("params vaut :", toto)

    // Route
    const router = useRouter();

    // Hook pour le name
    const [nameCompetition, setNameCompetition] = useState("");
    const [dateCompetition, setDateCompetition] = useState("");
    const [addressCompetition, setAdressCompetition] = useState("");
    const [postalCodeCompetition, setPostalCodeCompetition] = useState("");
    const [cityCompetition, setCityCompetition] = useState("");
    const [latCompetition, setLatCompetition] = useState("");
    const [lonCompetition, setLonCompetition] = useState("");
    const [organizationalDetails, setOrganizationalDetails] = useState("");


    useEffect(() => {
        getCompetition()
        setNameCompetition()
        setDateCompetition()
        setAdressCompetition()
        setPostalCodeCompetition()
        setCityCompetition()
        setLatCompetition()
        setLonCompetition()
        setOrganizationalDetails()
    }, [])

    // GET - Récupère les valeurs de la fiche avec l'API
    const getCompetition = async () => {
        await axios
            .get(`http://localhost:8000/api/competition/${toto}`)
            .then(res => {
                // console.log(res.data.data.name_competition)
                setNameCompetition(res.data.data.name_competition)
                setDateCompetition(res.data.data.date_competition)
                setAdressCompetition(res.data.data.address_competition)
                setPostalCodeCompetition(res.data.data.postal_code_competition)
                setCityCompetition(res.data.data.city_competition)
                setLatCompetition(res.data.data.lat_competition)
                setLonCompetition(res.data.data.lon_competition)
                setOrganizationalDetails(res.data.data.organizational_details)
            })
            .catch(error => {
                // if (error.response.status !== 409) throw error
                console.log(error)
            })
    }

    // PUT - Mets à jour la fiche sport
    const submitForm = async (event) => {
        event.preventDefault();
        const updateCompetition = async () => {

            await axios
                .put(`/api/competition/${toto}`, {
                    "name_competition": nameCompetition,
                    "date_competition": dateCompetition,
                    "address_competition": addressCompetition,
                    "postal_code_competition": postalCodeCompetition,
                    "city_competition": cityCompetition,
                    "lat_competition": latCompetition,
                    "lon_competition": lonCompetition,
                    "organizational_details": organizationalDetails
                })
                .then(res => {
                    router.push('/competitions')
                })
                .catch(error => {
                    // setErrors(error)
                    if (error.response.status !== 409) throw error
                    console.log(error)
                })
        }
        updateCompetition();
    };


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Modification d'une compétition
                </h2>
            }>

            <Head>
                <title>Easy-Cyclisme - Compétition</title>
            </Head>


            <div className="flex flex-col">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">
                                <form onSubmit={submitForm}>

                                    <div className="mt-4">
                                        <Label htmlFor="name">
                                            Nom de la compétition
                                        </Label>
                                        <Input
                                            name="name_competition"
                                            type="text"
                                            value={`${nameCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setNameCompetition(event.target.value);
                                                }
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="date">
                                            Date de la compétition
                                        </Label>
                                        <Input
                                            name="date_competition"
                                            type="date"
                                            value={`${dateCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setNameCompetition(event.target.value);
                                                }
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="adress">
                                            Adresse de la compétition
                                        </Label>
                                        <Input
                                            name="adress_competition"
                                            type="text"
                                            value={`${addressCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setAdressCompetition(event.target.value);
                                                }
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="postal_code">
                                            Code Postal
                                        </Label>
                                        <Input
                                            name="postal_code_competition"
                                            type="text"
                                            value={`${postalCodeCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setPostalCodeCompetition(event.target.value);
                                                }
                                            }
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
                                            value={`${cityCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setCityCompetition(event.target.value);
                                                }
                                            }
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
                                            value={`${latCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setLatCompetition(event.target.value);
                                                }
                                            }
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
                                            value={`${lonCompetition}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setLonCompetition(event.target.value);
                                                }
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="details">
                                            Détails de l'organisation
                                        </Label>
                                        <Input
                                            name="organizational_details"
                                            type="text"
                                            value={`${organizationalDetails}`}
                                            className="mt-1 block w-full"
                                            onChange={
                                                event => {
                                                    setOrganizationalDetails(event.target.value);
                                                }
                                            }
                                            
                                        />
                                    </div>


                                    <div className="flex items-center justify-end mt-4">
                                        <a href="http://localhost:3000/competitions">retour</a>
                                        <Button className="ml-4">Mettre à jour</Button>
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

export default Edit

export async function getServerSideProps({ params }) {
    return {
        props: { toto: params.competition },
    }
}