import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">About Our App</h1>
        <p className="lead">
          Welcome to our music playlist manager! This app allows you to:
        </p>
        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">🎵 View all your favorite songs in one place</li>
          <li className="list-group-item">➕ Add and remove songs from playlists</li>
          <li className="list-group-item">📁 Create and delete playlists</li>
          <li className="list-group-item">🎤 Track song details like Artist and Release Date</li>
        </ul>

        <h4 className="mt-4">Meet the Team</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">👩‍💻 Leah Feldman</li>
          <li className="list-group-item">👩‍💻 Rivka Chana Flig</li>
          <li className="list-group-item">👩‍💻 Hailey Lazar</li>
          <li className="list-group-item">👩‍💻 Toby Meth</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
