import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="card shadow-sm border-0 rounded-4" style={{ maxWidth: '825px', width: '100%' }}>
        <div className="card-body px-5 py-4 text-center">
          <h1
            className="card-title mb-4 fw-bold text-dark"
          >
            Welcome to TuneOut<br />
            <span style={{ fontWeight: 'normal', fontSize: '1.25rem', display: 'block' }}>
              TuneOut the silence, share the sound
            </span>
          </h1>
          <p className="card-text lead text-dark mb-5">
            Ever wanted a place where your favorite jams live, breathe, and grow? TuneOut is that spot — a fresh, vibrant community-driven music space where creating, sharing, and discovering playlists is not just easy, but downright fun.
          </p>

          <ul
            className="list-group list-group-flush mx-auto mb-5"
            style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <li className="list-group-item border-0 px-0 d-flex align-items-start">
              <span role="img" aria-label="Headphones" className="me-3 fs-4">🎧</span>
              <span>
                Build your own custom playlists with tracks that speak to your soul.<br />
                From underground gems to chart-topping hits.
              </span>
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-start">
              <span role="img" aria-label="Globe" className="me-3 fs-4">🌐</span>
              <span>
                Share your playlists with the world or dive into playlists made by others.<br />
                Explore fresh vibes anytime, anywhere.
              </span>
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-start">
              <span role="img" aria-label="Handshake" className="me-3 fs-4">🤝</span>
              <span>
                Collaborate with friends and fellow music lovers.<br />
                Everyone can add, tweak, or remix your playlists to keep the good vibes flowing.
              </span>
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-start">
              <span role="img" aria-label="Magnifying glass" className="me-3 fs-4">🔍</span>
              <span>
                Discover essential song details like Artist and Duration — every track tells a story.
              </span>
            </li>
          </ul>

          <h2 className="fw-semibold mb-4 text-dark">Meet the Crew</h2>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {[
              { name: 'Leah Feldman', emoji: '👩‍💻', label: 'Woman Technologist' },
              { name: 'Rivka Chana Flig', emoji: '👩‍💻', label: 'Woman Technologist' },
              { name: 'Hailey Lazar', emoji: '👩‍💻', label: 'Woman Technologist' },
              { name: 'Toby Meth', emoji: '👩‍💻', label: 'Woman Technologist' },
            ].map(({ name, emoji, label }) => (
              <div key={name} className="text-center" style={{ minWidth: '140px' }}>
                <div className="fs-1" role="img" aria-label={label}>{emoji}</div>
                <div className="fs-5 mt-2 text-dark">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
