import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

vi.mock('react-dom/client', () => {
  return {
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});

describe('main entry point', () => {
  test('renders <App /> inside <StrictMode> using createRoot', () => {
    // Clear module cache so that import runs the code fresh
    vi.resetModules();

    require('./main.jsx');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(createRoot().render).toHaveBeenCalledWith(
      expect.objectContaining({
        type: StrictMode,
        props: expect.objectContaining({
          children: expect.objectContaining({
            type: App,
          }),
        }),
      })
    );
  });
});
