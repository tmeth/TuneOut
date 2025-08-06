import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { afterEach, test, vi } from 'vitest';
import ReadPlaylist from './readPlaylist';

const mockData = {
  ok: true,
  json: () =>
    Promise.resolve([
      {
        pk: '123',
        name: 'Oldies',
        author: 'Leah Feldman',
        songs: [
          { title: '"Pray and Sing"', duration: '2:30', artist: 'MBD' },
        ],
      },
      {
        pk: '456',
        name: 'Fast Songs',
        author: 'TuneOut',
        songs: [
          { title: 'Hinei Ma Tov', duration: '3:30', artist: 'Mordechai Ben David' },
        ],
      },
    ]),
};

global.fetch = vi.fn(() => mockData);

afterEach(() => {
  vi.clearAllMocks();
});

test('renders playlist details when fetch succeeds', async () => {
  render(
    <MemoryRouter initialEntries={['/read/123']}>
      <Routes>
        <Route path="/read/:id" element={<ReadPlaylist />} />
      </Routes>
    </MemoryRouter>
  );

  // Look for the h1 heading (playlist title)
  const heading = await screen.findByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(/Oldies/i);

  expect(screen.getByText(/Leah Feldman/i)).toBeInTheDocument();
  expect(screen.getByText(/Pray and Sing/i)).toBeInTheDocument();
  expect(screen.getByText(/MBD/i)).toBeInTheDocument();
  expect(screen.getByText(/2:30/)).toBeInTheDocument();
});

// Shows error when playlist not found
test('displays error when playlist is missing', async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([{ pk: 'not-a-match', name: 'Wrong One', songs: [] }]),
    })
  );

  render(
    <MemoryRouter initialEntries={['/read/999']}>
      <Routes>
        <Route path="/read/:id" element={<ReadPlaylist />} />
      </Routes>
    </MemoryRouter>
  );

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Something went wrong fetching the playlist.'
  );
});
