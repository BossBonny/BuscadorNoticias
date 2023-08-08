import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext()

const NotciasProvider = ({children}) => {

    const [categoria, setCategoria] = useState('general')

    const [noticias, setNoticias] = useState([])

    const [paginas, setPaginas] = useState(1)

    const [totalNoticias, setTotalNoticias] = useState(0)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&pageSize=100&apikey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios(url)

            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)
            setPaginas(1)
        }
        consultarAPI()
    }, [categoria])


    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://newsapi.org/v2/top-headlines?country=us&page=${paginas}&category=${categoria}&pageSize=100&apikey=${import.meta.env.VITE_API_KEY}`

            const {data} = await axios(url)

            setNoticias(data.articles);
            setTotalNoticias(data.totalResults)
        }
        consultarAPI()
    }, [paginas])

    const handleChangeCategoria = e => {
        setCategoria(e.target.value)
    }


    const handleChangePagina = (e, valor) => {
        setPaginas(valor)
    }

    return(
        <NoticiasContext.Provider
            value={{
                categoria,
                handleChangeCategoria,
                noticias,
                totalNoticias,
                handleChangePagina,
                paginas
            }}
        >
            {children}
        </NoticiasContext.Provider>
    )
}

export{
    NotciasProvider
}

export default NoticiasContext