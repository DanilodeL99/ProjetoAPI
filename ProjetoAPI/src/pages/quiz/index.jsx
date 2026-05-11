import { useState, useEffect } from "react";
import './style.css';

function Quiz() {
    const [opcoes, setOpcoes] = useState([]);
    const [animeCorreto, setAnimeCorreto] = useState(null); 
    const [desfoque, setDesfoque] = useState(25); 
    const [mensagem, setMensagem] = useState("Carregando desafio...");


    const iniciarJogo = () => {
        setMensagem("Buscando animes...");
        setDesfoque(25); 

        const pagina = Math.floor(Math.random() * 5) + 1;
        const uri = `https://api.jikan.moe/v4/top/anime?limit=5&page=${pagina}`;

        fetch(uri)
            .then(res => res.json())
            .then(json => {
                const animes = json.data;
                setOpcoes(animes);
                
       
                const sorteado = animes[Math.floor(Math.random() * animes.length)];
                setAnimeCorreto(sorteado);
                setMensagem("Qual é o anime desta imagem?");
            })
            .catch(() => alert('Erro ao carregar a Jikan API.'));
    };

   
    useEffect(() => {
        iniciarJogo();
    }, []);


    const responder = (idEscolhido) => {
        if (idEscolhido === animeCorreto.mal_id) {
            setMensagem("ACERTOU MIZERAVI, este é o " + animeCorreto.title);
            setDesfoque(0); 
        } else {
            setMensagem("ERROU VACILÃO, a imagem ficou mais nítida...");
            if (desfoque > 0) {
                setDesfoque(desfoque - 8); 
            }
        }
    };

    return (
        <div className="container">
            <h1>Quiz: Adivinhe o Anime</h1>
            <h3>{mensagem}</h3>

            {animeCorreto && (
                <div style={{ margin: '20px 0' }}>
                    <img 
                        src={animeCorreto.images.jpg.large_image_url} 
                        alt="Adivinhe o anime" 
                    
                        style={{ filter: `blur(${desfoque}px)`, width: '300px', height: '400px', objectFit: 'cover', borderRadius: '10px' }} 
                    />
                </div>
            )}

            <div className="botoes-quiz">
                {opcoes.map((anime) => (
                    <button 
                        key={anime.mal_id} 
                        onClick={() => responder(anime.mal_id)}
                        style={{ margin: '5px', padding: '10px', cursor: 'pointer' }}
                    >
                        {anime.title}
                    </button>
                ))}
            </div>

            <button 
                onClick={iniciarJogo} 
                style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                Pular / Jogar Novamente
            </button>
        </div>
    );
}

export default Quiz;