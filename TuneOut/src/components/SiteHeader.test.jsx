import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // needed for NavLink
import SiteHeader from './SiteHeader';

// Mock bootstrap Collapse to avoid errors
const mockHide = vi.fn();
vi.mock('bootstrap/dist/js/bootstrap.bundle.min.js', () => ({
  Collapse: {
    getInstance: vi.fn(() => ({
      hide: mockHide,
    })),
  },
}));

describe('SiteHeader Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders all nav links with correct text', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    expect(screen.getByText('TuneOut')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('calls bootstrap Collapse hide when nav link is clicked and navbar is shown', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    // Manually add "show" class to navbarNav div to simulate open navbar
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.add('show');

    const homeLink = screen.getByText('Home');

    fireEvent.click(homeLink);

    expect(mockHide).toHaveBeenCalled();
  });

  test('does not call hide if navbarNav does not have show class', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const navbarNav = document.getElementById('navbarNav');
    // Make sure "show" class is NOT there
    navbarNav.classList.remove('show');

    const aboutLink = screen.getByText('About');

    fireEvent.click(aboutLink);

    expect(mockHide).not.toHaveBeenCalled();
  });
});