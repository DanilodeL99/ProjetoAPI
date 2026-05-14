import { useState } from "react";
import './style.css';

function AnimeSearch() {
    const [urlDigitada, setUrlDigitada] = useState("");
    const [resultado, setResultado] = useState(null);
    const [carregando, setCarregando] = useState(false);

    function buscarAnime() {
        if (!urlDigitada) {
            alert("Por favor, cole o link de uma imagem!");
            return;
        }

        setCarregando(true);
        setResultado(null);

        // O segredo está no encodeURIComponent para a API não se perder
        const urlFinal = `https://api.trace.moe/search?url=${encodeURIComponent(urlDigitada)}`;

        fetch(urlFinal)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro na resposta da API");
                }
                return res.json();
            })
            .then(json => {
                // Verificamos se veio algum resultado na lista
                if (json.result && json.result.length > 0) {
                    const primeiraCena = json.result[0];

                    const dadosCena = {
                        nome: primeiraCena.filename, // Nome do arquivo/anime
                        episodio: primeiraCena.episode,
                        video: primeiraCena.video,
                        precisao: (primeiraCena.similarity * 100).toFixed(2) // Mostra a % de certeza
                    };
                    setResultado(dadosCena);
                } else {
                    alert("Cena não encontrada. Tente outra imagem!");
                }
                setCarregando(false);
            })
            .catch(erro => {
                console.error(erro);
                alert("Erro ao buscar a cena. Verifique se o link da imagem é válido!");
                setCarregando(false);
            });
    }

    return (
        <div className="container">
            <h1 style={{ color: '#61dafb' }}>Descobrir Anime pela Cena</h1>
            <p>Cole o link direto de uma imagem (ex: do Twitter ou Pinterest)</p>

            <div className="busca">
                <input 
                    type="text" 
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={urlDigitada}
                    onChange={(e) => setUrlDigitada(e.target.value)} 
                    style={{ padding: '12px', width: '60%', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }}
                />
                <button 
                    onClick={buscarAnime}
                    style={{ padding: '12px 20px', marginLeft: '10px', backgroundColor: '#61dafb', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    {carregando ? "Buscando..." : "Pesquisar"}
                </button>
            </div>

            {resultado && (
                <div className="anime-info" style={{ marginTop: '30px', padding: '20px', backgroundColor: '#252525', borderRadius: '10px', border: '1px solid #61dafb' }}>
                    <h2 style={{ color: '#61dafb' }}>Anime: {resultado.nome}</h2>
                    <p><strong>Episódio:</strong> {resultado.episodio}</p>
                    <p><strong>Precisão:</strong> {resultado.precisao}%</p>
                    
                    <p>Preview em vídeo:</p>
                    <video 
                        src={resultado.video} 
                        controls 
                        autoPlay 
                        loop
                        width="100%" 
                        style={{ borderRadius: '10px', border: '2px solid #444' }}
                    />
                </div>
            )}
        </div>
    );
}

export default AnimeSearch;