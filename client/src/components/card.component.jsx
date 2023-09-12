import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import style from "../styles/card.module.css"

export default function Card({ data }) {

    const router = useRouter()
    const mode = useSelector(state => state.mode)

    function validateCharacterDescription(desc) {

        
        const dataString = String(desc)
        var myArray = []
        var newDescription

        if (dataString.length >= 80) {
            for (let i = 0; i < 80; i++) {
                myArray.push(dataString[i])
            }
            myArray.push('...')
            newDescription = myArray.join('').toString()
        } else {
            newDescription = desc
        }

        return newDescription
    }

    function validateCharacterTitle(title) {
        const dataString = String(title)
        var myArray = []
        var newTitle

        if (dataString.length >= 20) {
            for (let i = 0; i < 20; i++) {
                myArray.push(dataString[i])
            }
            myArray.push('...')
            newTitle = myArray.join('').toString()
        } else {
            newTitle = title
        }

        return newTitle
    }

    return (
        <div className={mode === 'light' ? style['card'] : `${style['card']} ${style['card-dark-mode']}`}>
            <section className={style.content}>
                {data.name ?
                    <h4>{validateCharacterTitle(data.name)}</h4>
                    : <h4>Sem título</h4>
                }
                {data.description ?
                    <p>{validateCharacterDescription(data.description)}</p>
                    : <p>Sem Descrição</p>
                }

            </section>
            <button onClick={() => router.push(`/specifications/${data.name}`)}>
                Conhecer</button>
        </div>
    )
}
