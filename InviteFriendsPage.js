import React, { useState } from 'react';
import './InviteFriendsPage.css';

const InviteFriendsPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Invite sent successfully!');
        setEmail('');
        setMessage('');
      } else {
        setStatus(`Failed to send invite: ${data.error}`);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="invite-friends-container">
      <h1>Invite Friends</h1>
      <form className="invite-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Friend's Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Personal Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="send-invite-button">Send Invite</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
};

export default InviteFriendsPage;
