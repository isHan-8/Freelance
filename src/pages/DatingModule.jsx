import React, { useState } from 'react';
import './DatingModule.css';

const profiles = [
  {
    name: 'Emma Johnson',
    age: 26,
    location: 'New York, USA',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Dog lover, foodie, and always down for a hike.',
  },
  {
    name: 'Liam Smith',
    age: 29,
    location: 'Los Angeles, USA',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    bio: 'Music producer who loves coffee and road trips.',
  },
  {
    name: 'Sophia Lee',
    age: 24,
    location: 'San Francisco, USA',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Tech geek, reader, and sushi enthusiast.',
  },
];

const DatingModule = () => {
  const [current, setCurrent] = useState(0);

  const nextProfile = () => {
    setCurrent((prev) => (prev + 1) % profiles.length);
  };

  const likeProfile = () => {
    alert(`You liked ${profiles[current].name}`);
    nextProfile();
  };

  const skipProfile = () => {
    alert(`You skipped ${profiles[current].name}`);
    nextProfile();
  };

  const { name, age, location, image, bio } = profiles[current];

  return (
    <div className="dating-container">
      <h2>💘 Find Your Match</h2>
      <div className="profile-card">
        <img src={image} alt={name} className="profile-img" />
        <h3>{name}, {age}</h3>
        <p className="location">{location}</p>
        <p className="bio">{bio}</p>
        <div className="btn-group">
          <button onClick={skipProfile} className="btn skip">Skip</button>
          <button onClick={likeProfile} className="btn like">Like</button>
        </div>
      </div>
    </div>
  );
};

export default DatingModule;
