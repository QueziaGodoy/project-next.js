import React, { useEffect, useState } from "react";
import Header from "@/components/header.components"
import api from "@/services/api";
import { useRouter } from "next/router";




import style from "../../styles/repo.module.css"

export default function Repo() {
    const router = useRouter()
    const [repo, setRepo] = useState()
    const dashboard = async () => {
        router.push('/dashboard/')
    }


    useEffect(() => {

        // get user in localStorage    
        const user = JSON.parse(localStorage.getItem('auth'))
        const repoUrl = window.location.pathname.replace('/specifications/', '')

        if (user) {
            api.get(`/repos/${user.login}/${repoUrl}`).then((res) => {
                setRepo(res.data)
                console.log(res.data);

            }).catch((err) => {
                console.log(err)
            })
        } else {
            router.push('/')
        }
    }, []) //Função do react que executa primeiro as coisas do useefect antes de todo o resto


    return (
        <main>

            <Header />

            {repo ?
                <div className={style.content}>
                    <div className={style.desc}>
                        <h2>{repo.name}</h2>

                        <p className={style.descricao}>{repo.description}</p>
                        <p><span className-={style['span-weight']}>Linguagem Utilizadas:</span> {repo.language ? repo.language : 'Não Informado'}</p>
                        <p><span className={style['span-weight']}>Repositório Privado:</span> {repo.private === true ? 'Sim' : 'Não'}</p>
                        <p><span className={style['span-weight']}>Data de Criação:</span> {repo.created_at ? repo.created_at : 'Não Informado'}</p>
                        <p><span className={style['span-weight']}>Data da última atualização:</span> {repo.created_at ? repo.created_at : 'Não Informado'}</p>
                        
                        <button
                            onClick={() => dashboard()}
                            className={style['button-back']}>
                            Voltar
                        </button>

                        <button
                            onClick={() => window.location.href = repo.svn_url}
                            className={style['button-git']}>
                            Acessar no GitHub
                        </button>
                        
                    </div>
                </div>
                :
                <div className={style['loader-container']}>
                    <article className={style['c-loader']} />
                </div>
            }

        </main>
    )

}