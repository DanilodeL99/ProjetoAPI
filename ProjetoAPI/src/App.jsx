import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import AnimeSearch from './pages/Moe'; 
import Quiz from './pages/quiz';
import './App.css';

function App() {
  return (
    <div>
      {/* O menu fora do <Routes> aparece em TODAS as páginas */}
      <nav className="navbar">
        <h2>Moe Moe Kyuuun</h2>
        <div className="links">
          <Link to="/">Início</Link>
          <Link to="/busca">Buscar Cena</Link>
          <Link to="/quiz">Quiz: Adivinhe o Anime</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busca" element={<AnimeSearch />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
