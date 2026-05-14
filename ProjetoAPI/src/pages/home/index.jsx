function Home() {
    return (
        <div className="container"> 
            <h1>Bem-vindo ao Moe Kyuuun</h1>

            <p>
                Este projeto consome duas APIs incríveis para testar seus
                conhecimentos e ajudar nas suas pesquisas de animes.
            </p>

            <div style={{ marginTop: '40px', textAlign: 'left' }}>
                <h3>Buscar Cena</h3>

                <p>
                    Viu uma imagem legal de anime no Twitter ou Pinterest e não
                    sabe o nome? Cole a URL da imagem lá e nós acharemos o
                    episódio exato e o vídeo da cena para você!
                </p>

                <h3>Quiz</h3>

                <p>
                    Testaremos seu conhecimento! A API do MyAnimeList traz uma
                    imagem borrada. Você tem alternativas para adivinhar.
                    Se errar, a imagem vai ficando mais nítida.
                    Tente acertar com a imagem o mais borrada possível!
                </p>
            </div>
        </div>
    );
}

export default Home;