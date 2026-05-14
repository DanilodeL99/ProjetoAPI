import { useState, useEffect } from "react";
import './style.css';

function Quiz() {
    const [opcoes, setOpcoes] = useState([]);
    const [animeCorreto, setAnimeCorreto] = useState(null); 
    const [desfoque, setDesfoque] = useState(15); 
    const [mensagem, setMensagem] = useState("Carregando...");

    function buscarNovosAnimes() {
        setMensagem("Sorteando animes...");
        setDesfoque(15);
        
       
        const pag = Math.floor(Math.random() * 10) + 1;
        const url = `https://api.jikan.moe/v4/top/anime?limit=20&page=${pag}`;

        fetch(url)
            .then(resposta => resposta.json())
            .then(dados => {
                const lista = dados.data;
              
                const embaralhados = lista.sort(() => 0.5 - Math.random()).slice(0, 4);
                
                setOpcoes(embaralhados);
                
                const escolhido = embaralhados[Math.floor(Math.random() * embaralhados.length)];
                setAnimeCorreto(escolhido);
                setMensagem("Quem é esse neguinho?");
            })
            .catch(() => setMensagem("Erro ao conectar com a API. Tente novamente."));
    }

    useEffect(() => {
        buscarNovosAnimes();
    }, []);

    function conferirResposta(id) {
        if (id === animeCorreto.mal_id) {
            setMensagem("NICE TRY MY BESTO FRIENDO");
            setDesfoque(0);
          
            setTimeout(() => {
                buscarNovosAnimes();
            }, 2000);
        } else {
            setMensagem("Errou, desista dos seu sonhos e morra");
            if (desfoque > 0) setDesfoque(desfoque - 4);
        }
    }

    return (
        <div className="container">
            <h1 style={{color: '#61dafb'}}>Desafio</h1>
            <p className="status-msg">{mensagem}</p>

            {animeCorreto && (
                <div className="moldura-imagem">
                    <img 
                        src={animeCorreto.images.jpg.large_image_url} 
                        style={{ filter: `blur(${desfoque}px)` }}
                        alt="Desafio"
                    />
                </div>
            )}

            <div className="grade-respostas">
                {opcoes.map(anime => (
                    <button key={anime.mal_id} onClick={() => conferirResposta(anime.mal_id)}>
                        {anime.title}
                    </button>
                ))}
            </div>

            <button className="btn-pular" onClick={buscarNovosAnimes}>
                Pular Desafio
            </button>
        </div>
    );
}

export default Quiz;