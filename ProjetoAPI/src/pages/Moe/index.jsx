import { useState } from "react"
import './style.css'

function AnimeSearch() {

    const [urlDigitada, setUrlDigitada] = useState("")
    const [resultado, setResultado] = useState(null)

    const buscarAnime = () => {
        const uri = `https://api.trace.moe/search?url=${encodeURIComponent(urlDigitada)}`

        fetch(uri)
            .then(res => res.json())
            .then(json => {
                const dadosCena = {
                    nome: json.result[0].filename,
                    episodio: json.result[0].episode,
                    video: json.result[0].video
                }
                setResultado(dadosCena)
            })
            .catch(() => alert('Não foi possível encontrar esse anime. Verifique o link da imagem'))
    }

    return (
        <div className="container">
            <div className="header">
                <h1>Descubra o Anime</h1>
            </div>

            <div className="busca">
                <input 
                    type="text" 
                    placeholder="Cole a URL de uma imagem aqui"
                    onChange={(e) => setUrlDigitada(e.target.value)} 
                />
                <button onClick={buscarAnime}>Pesquisar Cena</button>
            </div>

     
            {resultado && (
                <div className="anime-info">
                    <h2>Anime: {resultado.nome}</h2>
                    <p>Episódio: {resultado.episodio}</p>
                    
                    <p>Preview da cena:</p>
                    <video 
                        src={resultado.video} 
                        controls 
                        autoPlay 
                        width="100%" 
                        style={{ borderRadius: '10px' }}
                    />
                </div>
            )}
        </div>
    )
}

export default AnimeSearch