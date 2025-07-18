import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="card shadow-sm border-0 rounded-4" style={{ maxWidth: '825px', width: '100%' }}>
        <div className="card-body px-5 py-4 text-center">
          <h1
            className="card-title mb-4 fw-bold"
            style={{ color: '#212529' }}
          >
            Welcome to TuneOut<br />
            <span style={{ fontWeight: 'normal', fontSize: '1.25rem', display: 'block' }}>
              TuneOut the silence, share the sound
            </span>
          </h1>
          <p className="card-text lead text-secondary mb-5">
            Ever wanted a place where your favorite jams live, breathe, and grow? TuneOut is that spot — a fresh, vibrant community-driven music space where creating, sharing, and discovering playlists is not just easy, but downright fun.
          </p>

          <ul
            className="list-group list-group-flush mx-auto mb-5"
            style={{ maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <li className="list-group-item border-0 px-0 d-flex align-items-center justify-content-start">
              <span className="me-3 fs-4">🎧</span>
              Build your own custom playlists with tracks that speak to your soul<br/>From underground gems to chart-topping hits.
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-center justify-content-start">
              <span className="me-3 fs-4">🌐</span>
              Share your playlists with the world or dive into playlists made by others<br/>Explore fresh vibes anytime, anywhere.
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-center justify-content-start">
              <span className="me-3 fs-4">🤝</span>
              Collaborate with friends and fellow music lovers<br/>Everyone can add, tweak, or remix your playlists to keep the good vibes flowing.
            </li>
            <li className="list-group-item border-0 px-0 d-flex align-items-center justify-content-start">
              <span className="me-3 fs-4">🔍</span>
              Discover essential song details like Artist and Duration, because every track tells a story.
            </li>
          </ul>

          <h4 className="fw-semibold mb-4 text-secondary">Meet the Crew</h4>
          <div className="d-flex justify-content-center gap-5">
            {[
              { name: 'Leah Feldman', emoji: '👩‍💻' },
              { name: 'Rivka Chana Flig', emoji: '👩‍💻' },
              { name: 'Hailey Lazar', emoji: '👩‍💻' },
              { name: 'Toby Meth', emoji: '👩‍💻' },
            ].map(({ name, emoji }) => (
              <div key={name} className="text-center" style={{ minWidth: '140px' }}>
                <div className="fs-1">{emoji}</div>
                <div className="fs-5 mt-2">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
