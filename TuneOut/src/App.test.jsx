import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

//Test 1: SiteHeader is rendered
describe('App component', () => {
  it('renders SiteHeader and Home page content', () => {
    render(<App />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});

//Test 2: navigates to contact page
describe('Routing behavior', () => {
  it('renders Contact page when navigating to /contact', () => {
    window.history.pushState({}, '', '/contact'); // Simulates browser nav to /contact
    render(<App />);
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
  });
});