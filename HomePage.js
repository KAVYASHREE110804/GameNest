import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const imageUrls = [
    'https://www.google.com/imgres?q=subway%20surfers&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMzllN2IwYzEtODZhNC00ODRkLWE2ZmUtODdiOTU2YjZlZTk0XkEyXkFqcGdeQXVyNTgyNTA4MjM%40.V1_FMjpg_UX1000.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt6281082%2F&docid=YW5IzD6K_K3qhM&tbnid=H8HTZgFOgOdMDM&vet=12ahUKEwiU553g_v2HAxXT1jgGHZYlB4YQM3oECFMQAA..i&w=1000&h=1500&hcb=2&ved=2ahUKEwiU553g_v2HAxXT1jgGHZYlB4YQM3oECFMQAA', // External image 1
    'https://tinyurl.com/nhfm26zm', // External image 2
    'https://tinyurl.com/2tk9pjn5', // External image 3
  ];

  const games = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Game ${index + 1}`,
    image: imageUrls[index % imageUrls.length],
    link: index === 0 ? null : index === 1 ? null : index === 2 ? null : index === 3 ? null : index === 4 ? null : `https://www.crazygames.com/${index + 1}`, // Use null for Game 1, 2, 3, 4, and 5 to navigate to respective games
  }));

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (gameId) => {
    if (gameId === 1) {
      navigate('/mugwumps');
    } else if (gameId === 2) {
      navigate('/memory-magic');
    } else if (gameId === 3) {
      navigate('/tictactoe');
    } else if (gameId === 4) {
      navigate('/typing-speed-test');
    } else if (gameId === 5) {
      navigate('/ballbouncegame'); // Navigate to Bounce Ball Game for Game 5
    }
  };

  return (
    <div className="homepage-container">
      <div className="top-frame">
        <input
          type="text"
          placeholder="Search games..."
          className="search-bar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="game-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => (
            <div className="game-button" key={game.id}>
              {game.link ? (
                <a href={game.link} target="_blank" rel="noopener noreferrer">
                  <img src={game.image} alt={game.name} className="game-image" />
                </a>
              ) : (
                <button
                  onClick={() => handleGameClick(game.id)}
                  className="game-image-button"
                >
                  <img src={game.image} alt={game.name} className="game-image" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No games found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
