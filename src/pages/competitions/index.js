import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import Button from '@/components/Button'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


const Competitions = () => {
  // Route
  const router = useRouter();

  // Hooks : useState, useEffect
  const [competitions, setCompetitions] = useState([]);

  console.log("avant useEffect", competitions)

  useEffect(() => {
    getCompetitions();
  }, []) 

  // Récupération des compétitions
  const getCompetitions = async () => {
    await axios.get('/api/competition')
      .then(res => {
        setCompetitions(res.data.data);
      });
  }

  // Supprimer une compétition
  const deleteCompetition = (competitionID) => {
    axios
      .delete(`/api/competition/${competitionID}`)
      .then(res => {
        getCompetitions()
      })
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Liste des competitions
        </h2>
      }>

      {/* Titre de l'onglet */}
      <Head>
        <title>Liste des competitions</title>
      </Head>

      {/*************************** Contenu ***************************/}

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="flex items-center justify-end mt-4">
              <a href="/competitions/add">
                <Button className="ml-4 mr-4">Créer une nouvelle compétition</Button>
              </a>
            </div>

            <div className="p-6 bg-white border-b border-gray-200">

              <div className="bg-white"></div>
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
                      <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"><p className="mt-1 text-sm text-gray-500 text-center">
                        <a href={`http://localhost:3000/competitions/edit/${competition.id}`}>Editer </a>
                        <button onClick={
                          () => {
                            deleteCompetition(competition.id);
                          }
                        }
                        >
                          Supprimer</button>

                      </p></td>

                      {/*<td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.postal_code_competition}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{competition.postal_code_competition}</td> */}
                    </tr>
                  ))}
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