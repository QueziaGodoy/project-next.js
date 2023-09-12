import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setMode } from "@/global/mode"
import { HiOutlineLogout } from "react-icons/hi"
import { MdDarkMode } from "react-icons/md"
import { useRouter } from "next/router"
import { MdOutlineLightMode } from "react-icons/md"
import { DiGithubFull } from "react-icons/di"
import { BsGithub } from "react-icons/bs"


import style from "../styles/header.module.css"

export default function Header() {


    const router = useRouter()
    const dispatch = useDispatch()
    const [user, setUser] = useState()
    const mode = useSelector(state => state.mode)


   


    useEffect(() => {

        //get info user - localStorage
        const modeData = JSON.parse(localStorage.getItem('mode'))
        if (modeData === 'dark') {
            dispatch(setMode('dark'))
        }


        // get info user - localStorage
        const userData = JSON.parse(localStorage.getItem('auth'))
        setUser(userData)

    }, [])


    const handleMode = async () => {
        if (mode === 'light') {
            dispatch(setMode('dark'))
        } else {
            dispatch(setMode('light'))
        }
        //setMode('light')
    }

    const handleLogout = async () => {
        localStorage.clear()
        router.push('/')
    }

    if (mode === 'dark') {
        document.body.style = "background-color: #2b2b2b; color: #ffffff; transition: .4s"
    } else {
        document.body.style = "background-color: #ffffff; color: #000000; transition: .4s"
    }

    return (
        <header className={mode === 'light' ? style.header : style['header-dark']}>
            <section style={{ display: 'flex', alignItems: 'center' }}>
                <BsGithub
                    size={42}
                />
                <DiGithubFull
                    size={60}
                    style={{ marginLeft: '15px' }}
                />
            </section>

            {user ?
                <div className={style['header-profile']}>

                    <p>Olá, {user.name}! </p>
                    <img src={user.avatar_url} alt="Imagem do Usuário" />

                    {mode === 'light' ?

                        <MdDarkMode
                            onClick={() => handleMode()}
                            size={35}
                            style={{ marginRight: "25px", cursor: "pointer" }}

                        />

                        :

                        <MdOutlineLightMode

                            onClick={() => handleMode()}
                            size={35}
                            style={{ marginRight: "25px", cursor: "pointer" }}

                        />

                    }

                    <HiOutlineLogout
                        size={40}
                        onClick={() => handleLogout()}
                        className={style.icon} />
                </div>
                : <></>
            }

        </header>
    )
}