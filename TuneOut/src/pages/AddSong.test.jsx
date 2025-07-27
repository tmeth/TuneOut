import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AddSong from './AddSong';
import * as router from 'react-router-dom';

// Mock fetch globally
global.fetch = vi.fn();

// Mock useParams once, avoid "Cannot redefine property" error
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

describe('AddSong Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('fetches and displays playlist name', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ pk: '123', name: 'My Playlist' }],
    });

    render(<AddSong />);

    expect(await screen.findByText('My Playlist')).toBeInTheDocument();
  });

  test('shows "Untitled Playlist" if fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('fail'));

    render(<AddSong />);

    expect(await screen.findByText('Untitled Playlist')).toBeInTheDocument();
  });

  test('submits the form and shows success message', async () => {
    // Mock playlist fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ pk: '123', name: 'My Playlist' }],
    });

    // Mock POST fetch for song add
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<AddSong />);

    await screen.findByText('My Playlist');

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Song 1' },
    });
    fireEvent.change(screen.getByLabelText(/Artist/i), {
      target: { value: 'Artist 1' },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: '3:45' },
    });

    // Submit by clicking the button (fixes your issue)
    fireEvent.click(screen.getByRole('button', { name: /add song/i }));

    await waitFor(() =>
      expect(screen.getByText(/✅ Song added successfully!/i)).toBeInTheDocument()
    );
  });

  test('shows error message if server returns error', async () => {
    // Mock playlist fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ pk: '123', name: 'My Playlist' }],
    });

    // Mock POST fetch returning error
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Server error' }),
    });

    render(<AddSong />);

    await screen.findByText('My Playlist');

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Song 2' },
    });
    fireEvent.change(screen.getByLabelText(/Artist/i), {
      target: { value: 'Artist 2' },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: '4:00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add song/i }));

    await waitFor(() =>
      expect(screen.getByText(/❌ Error: Server error/i)).toBeInTheDocument()
    );
  });

  test('shows network error message if fetch throws', async () => {
    // Mock playlist fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ pk: '123', name: 'My Playlist' }],
    });

    // Mock POST fetch throws error
    fetch.mockRejectedValueOnce(new Error('Network failure'));

    render(<AddSong />);

    await screen.findByText('My Playlist');

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'Song 3' },
    });
    fireEvent.change(screen.getByLabelText(/Artist/i), {
      target: { value: 'Artist 3' },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: '2:50' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add song/i }));

    await waitFor(() =>
      expect(screen.getByText(/❌ Network error: Network failure/i)).toBeInTheDocument()
    );
  });
});
