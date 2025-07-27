import { render, screen } from '@testing-library/react';
import About from './About';
import { describe, it, expect } from 'vitest';

describe('About Component', () => {
  it('renders the main welcome heading', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { name: /Welcome to TuneOut/i })
    ).toBeInTheDocument(); // uses jest-dom matcher
  });

  it('renders the tagline text', () => {
    render(<About />);
    expect(
      screen.getByText(/TuneOut the silence, share the sound/i)
    ).toBeInTheDocument();
  });

  it('renders all key feature list items', () => {
    render(<About />);
    const features = [
      /Build your own custom playlists/i,
      /Share your playlists with the world/i,
      /Collaborate with friends and fellow music lovers/i,
      /Discover essential song details/i,
    ];

    features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  it('renders all crew member names', () => {
    render(<About />);
    const crew = [
      'Leah Feldman',
      'Rivka Chana Flig',
      'Hailey Lazar',
      'Toby Meth',
    ];

    crew.forEach((member) => {
      expect(screen.getByText(member)).toBeInTheDocument();
    });
  });

  it("renders the 'Meet the Crew' heading", () => {
    render(<About />);
    expect(screen.getByText(/Meet the Crew/i)).toBeInTheDocument();
  });
});
