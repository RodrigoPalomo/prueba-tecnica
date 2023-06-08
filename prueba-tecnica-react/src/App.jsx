import React, { useState, useEffect } from 'react';
import style from './App.module.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact';
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function App() {
    const [fact, setFact] = useState();
    const [imageUrl, setImageUrl] = useState();
    // 3- Usaría un Fetch pero cada vez que se renderice el componente estaría
    // en un loop infinito y chau app. Lo más correcto para esta situación es
    // con un useEffect.

    // Acá tenemos un lindo fetch (NUNCA OLVIDAR EL ARRAY DE DEPENDENCIAS)
    // Efecto para recuperar la cita al cargar la página.
    useEffect(() => {
        // hacemos el fetch de datos
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            // transformamos la respuesta a json
            .then(res => res.json())
            // lo almacenamos en el estado
            .then(data => {
                const { fact } = data
                setFact(fact)
            })

    }, []) // y acá nos aseguramos que se renderice una sola vez, la primera vez

    // Otro efecto para recuperar la imagen cada vez que tenemos una nueva.
    useEffect(() => {
        if (!fact) return
        const threeFirstWords = fact.split(' ', 3).join(' ');
        console.log(threeFirstWords);

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                // Recupero la url
                const { url } = response
                setImageUrl(url);
            })
    }, [fact])

    return (
        <main className={style.main}>
            <h1>App de gatitos</h1>
            {/* renderizado condicional */}
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`}></img>}
        </main>
    )
}