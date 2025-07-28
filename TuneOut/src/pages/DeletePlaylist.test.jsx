/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import DeletePlaylist from './DeletePlaylist';
import { MemoryRouter } from 'react-router-dom';

// Mock useParams and useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn(),
  };
});

// Mock global fetch
global.fetch = vi.fn();

describe('DeletePlaylist Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays playlist name', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [{ pk: '123', name: 'Chill Vibes' }],
      ok: true,
    });

    render(
      <MemoryRouter>
        <DeletePlaylist />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Delete Playlist: Chill Vibes/i)).toBeInTheDocument();
  });

  it('deletes playlist and shows success message', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => [{ pk: '123', name: 'Workout Mix' }],
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ message: 'Deleted' }),
        ok: true,
      });

    render(
      <MemoryRouter>
        <DeletePlaylist />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(await screen.findByText(/✅ Playlist deleted successfully!/i)).toBeInTheDocument();
  });

  it('shows error message on failed delete', async () => {
    fetch
      .mockResolvedValueOnce({
        json: async () => [{ pk: '123', name: 'Error Playlist' }],
        ok: true,
      })
      .mockResolvedValueOnce({
        json: async () => ({ message: 'Delete failed' }),
        ok: false,
      });

    render(
      <MemoryRouter>
        <DeletePlaylist />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(await screen.findByText(/❌ Error: Delete failed/i)).toBeInTheDocument();
  });
});
