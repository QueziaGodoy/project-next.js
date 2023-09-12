import React, { useState } from "react" //importando uma função
import { useRouter } from "next/router" //importando uma função
import api from "@/services/api"

import style from "../styles/home.module.css"


export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [alert, setAlert] = useState(false)

  const submitUser = async () => {
    if (user === '') {
      //return user error
      setAlert(true)
    }
    else {
      setAlert(false)

      //calling api
      api.get(`/users/${user}`).then((response) => {
        localStorage.setItem('auth', JSON.stringify(response.data))
        router.push('/dashboard')
      }).catch((err) => {
        console.log(err)
        setAlert(true)
      })
    }
  }


  var input 
  


  return (
    <main className={style.container}>
      <div className={style.form}>
        <h2>Bem vindo(a) ao Portal de Projetos</h2>
        <p>Para começar, indentifique-se com o seu user-name do GitHub para acessarmos os seus repositórios</p>
        <input
          type="text"
          name="user-name"
          placeholder="GitHub User"
          onChange={e => setUser(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submitUser();
            }
          }}
        />

        {alert ?
          <p className={style.alert} > Conta não encontrada </p>
          : <></>
        }

        <button onClick={() => submitUser()}  >
          Começar
        </button>
      </div>
    </main>
  )
}
