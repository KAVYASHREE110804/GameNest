import React from 'react';
import './LeaderboardPage.css';

const LeaderboardPage = () => {
  const user = {
    id: 1,
    rank: 3,
    username: 'YourProfile',
    country: 'USA',
    tournamentsWon: 15,
    score: 8950,
    isUser: true,
  };

  // Generate 50 players
  const players = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    rank: index + 1,
    username: `Player${index + 1}`,
    country: ['USA', 'Japan', 'Germany', 'France', 'Brazil'][index % 5],
    tournamentsWon: Math.floor(Math.random() * 20) + 1,
    score: Math.floor(Math.random() * 5000) + 5000,
    isUser: false,
  }));

  // Insert the user's data at the correct rank
  players[user.rank - 1] = user;

  return (
    <div className="leaderboard-container">
      <h1>Global Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Country</th>
            <th>Tournaments Won</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} className={player.isUser ? 'highlighted-row' : ''}>
              <td>{player.rank}</td>
              <td className="username">{player.username}</td>
              <td>{player.country}</td>
              <td>{player.tournamentsWon}</td>
              <td className="score">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="user-profile-highlight">
        <h2>Your Position</h2>
        <p>Rank: {user.rank}</p>
        <p>Username: {user.username}</p>
        <p>Country: {user.country}</p>
        <p>Tournaments Won: {user.tournamentsWon}</p>
        <p>Score: {user.score}</p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
