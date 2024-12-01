import React from 'react';
import './TournamentPage.css'; // Ensure this CSS file is properly linked

const TournamentPage = () => {
  const tournaments = [
    { name: 'Summer Showdown', date: 'August 25, 2024', location: 'Los Angeles, CA' },
    { name: 'Winter Clash', date: 'December 14, 2024', location: 'New York, NY' },
    { name: 'Autumn Arena', date: 'October 10, 2024', location: 'Chicago, IL' },
    { name: 'Spring Fling', date: 'April 2, 2024', location: 'Miami, FL' },
    { name: 'Championship Brawl', date: 'November 18, 2024', location: 'Houston, TX' },
  ];

  return (
    <div className="tournament-container">
      <h1>Upcoming Tournaments</h1>
      <ul className="tournament-list">
        {tournaments.map((tournament, index) => (
          <li key={index} className="tournament-item">
            <div className="tournament-details">
              <h2>{tournament.name}</h2>
              <p>Date: {tournament.date}</p>
              <p>Location: {tournament.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentPage;
