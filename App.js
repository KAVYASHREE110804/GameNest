import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import TournamentPage from './components/TournamentPage';
import LeaderboardPage from './components/LeaderboardPage';
import InviteFriendsPage from './components/InviteFriendsPage';
import Mugwumps from './components/Mugwumps';
import MemoryMagic from './components/MemoryMagic/MemoryMagic';
import TicTacToe from './components/TicTacToe'; 
import TypingSpeedTest from './components/TypingSpeedTest';
import BallBounceGame from './components/BallBounceGame';
import SignInSignUp from './components/Auth/SignInSignUp';

function App() {
  const isSignedIn = !!localStorage.getItem('userToken'); // Check if the user is signed in

  return (
    <Router>
      <Routes>
        {/* Route for SignIn/SignUp page */}
        <Route
          path="/signin"
          element={isSignedIn ? <Navigate to="/home" /> : <SignInSignUp />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={isSignedIn ? <MainLayout /> : <Navigate to="/signin" />}
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/invite-friends" element={<InviteFriendsPage />} />
          <Route path="/mugwumps" element={<Mugwumps />} />
          <Route path="/memory-magic" element={<MemoryMagic />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/typing-speed-test" element={<TypingSpeedTest />} />
          <Route path="/ballbouncegame" element={<BallBounceGame />} />
        </Route>

        {/* Redirect all other routes to home if signed in, else to sign-in */}
        <Route path="*" element={<Navigate to={isSignedIn ? "/home" : "/signin"} />} />
      </Routes>
    </Router>
  );
}

export default App;
