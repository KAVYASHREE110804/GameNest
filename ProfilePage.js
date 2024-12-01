import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    profilePicture: 'path/to/default-profile.jpg', // Update with a default or existing profile picture
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newData, setNewData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleProfileUpdate = () => {
    setProfileData(newData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profileData.profilePicture} alt="Profile" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="name"
                value={newData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <textarea
                name="bio"
                value={newData.bio}
                onChange={handleInputChange}
                placeholder="Bio"
              />
              <button onClick={handleProfileUpdate}>Save</button>
            </div>
          ) : (
            <>
              <h1>{profileData.name}</h1>
              <p>{profileData.bio}</p>
              <button onClick={handleEditToggle}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
      {/* Add additional profile sections here, e.g., posts, followers, etc. */}
    </div>
  );
};

export default ProfilePage;
