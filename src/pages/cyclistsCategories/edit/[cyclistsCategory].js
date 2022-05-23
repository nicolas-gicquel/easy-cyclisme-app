import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

const Edit = ({ toto }) => {
    // Route
    const router = useRouter()

    // Hook pour le name
    const [namecyclistsCategory, setNameCyclistsCategory] = useState('')

    useEffect(() => {
        getCyclistsCategory()
        setNameCyclistsCategory()
    }, [])

    // GET - Récupère les valeurs de la fiche avec l'API
    const getCyclistsCategory = async () => {
        await axios
            .get(`http://localhost:8000/api/cyclists_category/${toto}`)
            .then(res => {
                console.log(res)
                setNameCyclistsCategory(res.data.data.name_cyclists_category)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
                console.log(error)
            })
    }

    // PUT - Mets à jour la fiche sport
    const submitForm = async event => {
        event.preventDefault()
        const updateCyclistsCategory = async () => {
            await axios
                .put(`/api/cyclists_category/${toto}`, {
                    name_cyclists_category: namecyclistsCategory,
                })
                .then(router.push('/cyclistsCategories'))
                .catch(error => {
                    // setErrors(error)
                    if (error.response.status !== 409) throw error
                    console.log(error)
                })
        }
        updateCyclistsCategory()
    }

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
                                            Nom de la catégorie
                                        </Label>
                                        <Input
                                            name="name_cyclists_category"
                                            type="text"
                                            value={`${namecyclistsCategory}`}
                                            className="mt-1 block w-full"
                                            onChange={event => {
                                                setNameCyclistsCategory(
                                                    event.target.value,
                                                )
                                            }}
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <a href="/cyclistsCategories">retour</a>
                                        <Button className="ml-4">
                                            Mettre à jour
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

export default Edit

export async function getServerSideProps({ params }) {
    return {
        props: { toto: params.cyclistsCategory },
    }
}
