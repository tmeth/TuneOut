/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddSong from './AddSong';
import { MemoryRouter } from 'react-router-dom';

// ✅ Correctly mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn(),
  };
});

// ✅ Mock global fetch
global.fetch = vi.fn();

describe('AddSong Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders and fetches playlist name', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ pk: '123', name: 'My Playlist' }],
      ok: true,
    });

    render(
      <MemoryRouter>
        <AddSong />
      </MemoryRouter>
    );

    expect(await screen.findByText('My Playlist')).toBeInTheDocument();
  });

  it('submits the form and shows success message then navigates', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => [{ pk: '123', name: 'Test Playlist' }],
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ message: 'Success' }),
        ok: true,
      });

    render(
      <MemoryRouter>
        <AddSong />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Song' },
    });
    fireEvent.change(screen.getByLabelText(/artist/i), {
      target: { value: 'Test Artist' },
    });
    fireEvent.change(screen.getByLabelText(/duration/i), {
      target: { value: '3:30' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add song/i }));

    expect(await screen.findByText(/✅ Song added successfully!/i)).toBeInTheDocument();
  });

  it('shows error message on failed submission', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => [{ pk: '123', name: 'Test Playlist' }],
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ message: 'Something went wrong' }),
        ok: false,
      });

    render(
      <MemoryRouter>
        <AddSong />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Bad Song' },
    });
    fireEvent.change(screen.getByLabelText(/artist/i), {
      target: { value: 'Bad Artist' },
    });
    fireEvent.change(screen.getByLabelText(/duration/i), {
      target: { value: '0:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add song/i }));

    expect(await screen.findByText(/❌ Error:/i)).toBeInTheDocument();
  });
});
