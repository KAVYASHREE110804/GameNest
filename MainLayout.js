import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './MainLayout.css'; // Ensure your styles are included

const MainLayout = () => {
  return (
    <div className="main-layout">
      <nav className="sidebar">
        <ul>
          <li><Link to="/home"><button>Home</button></Link></li>
          <li><Link to="/tournament"><button>Tournament</button></Link></li>
          <li><Link to="/leaderboard"><button>Leaderboard</button></Link></li>
          <li><Link to="/invite-friends"><button>Invite Friends</button></Link></li>
          <li><Link to="/profile"><button>Profile</button></Link></li>
        </ul>
      </nav>
      <div className="content">
        <main className="page-content">
          {/* Content area is currently empty, you can add more elements here if needed */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
