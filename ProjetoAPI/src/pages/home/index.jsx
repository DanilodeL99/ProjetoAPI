function Home() {
    return (
        <div className="container"> /* Professora me perdoe mas aqui eu tive que usar IA, não sabia o que colocar na pagina de Home e ficou meio Cringe Gomenasai sensei 🙏🙇‍♂️ */
            <h1>Bem-vindo ao Portal Otaku</h1>

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