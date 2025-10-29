import { renderHook, act } from '@testing-library/react';
import { useScrollEffect } from '@/components/Header/useScrollEffect';

describe('useScrollEffect Hook', () => {
  beforeEach(() => {
    // Reset scroll position
    window.scrollY = 0;
  });

  it('returns false initially when not scrolled', () => {
    const { result } = renderHook(() => useScrollEffect());

    expect(result.current).toBe(false);
  });

  it('returns true when scrolled past threshold', () => {
    const { result } = renderHook(() => useScrollEffect(20));

    act(() => {
      window.scrollY = 30;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('returns false when scrolled below threshold', () => {
    const { result } = renderHook(() => useScrollEffect(20));

    act(() => {
      window.scrollY = 10;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('uses custom threshold', () => {
    const { result } = renderHook(() => useScrollEffect(50));

    act(() => {
      window.scrollY = 40;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);

    act(() => {
      window.scrollY = 60;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollEffect());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});

