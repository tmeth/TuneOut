import React from 'react';
import { StrictMode } from 'react';
import App from './App.jsx';
import { vi, describe, expect, test, beforeEach, afterEach } from 'vitest';

// 🧪 Create a mock render method
const mockRender = vi.fn();

// ✅ Stub a fake DOM root for mounting
beforeEach(() => {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.resetModules();
});

// 🔧 Mock react-dom/client before dynamic import
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: mockRender,
  })),
}));

// 🧪 Test the main entry point behavior
describe('main entry point', () => {
  test('renders <App /> inside <StrictMode> using createRoot', async () => {
    // ⏬ Dynamically import to trigger JSX-aware transform
    const { createRoot } = await import('react-dom/client');
    await import('./main.jsx');

    expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));

    expect(mockRender).toHaveBeenCalledWith(
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