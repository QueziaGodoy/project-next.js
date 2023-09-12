import React, { useEffect, useState } from "react"
import { UseSelector, useSelector } from "react-redux"
import Header from "@/components/header.components"
import Card from "@/components/card.component"
import api from "@/services/api"
import { useRouter } from "next/router"


import style from "../styles/dashboard.module.css"



export default function Dashboard() {

    const router = useRouter()
    const mode = useSelector (state => state.mode)
    const [repositories, setRepositories] = useState()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('auth'))

        if (user) {

            api.get(`/users/${user.login}/repos`).then((response) => {
                console.log(response.data);
                setRepositories(response.data)
            }).catch((err) => {
                console.log
            })
        } else {
            router.push('/')
        }

    }, [])



    return (
        <main className={mode === 'light' ? style['light-mode']: style['dark-mode']}>
            <Header />

            <div className={style.content}>

                <section className={style['dashboard-panel']}>
                    <h3>Repositórios Encontrados:</h3>
                </section>


                <section className={style['container-grid']}>

                    {repositories ? repositories.map((item) => (
                        <Card data={item} /> /*Um item é o repositorio*/
                    )) :

                        <div className={style['loader-container']}>
                            <article className={style['c-loader']} />
                        </div>

                    }

                </section>


            </div>
        </main>
    )
}