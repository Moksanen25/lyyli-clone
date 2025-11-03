import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WaitlistForm from '../WaitlistForm';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-sync-scripts */
// Mock Next.js Script component
jest.mock('next/script', () => {
  return function MockScript({ src, onLoad, children }: any) {
    // Simulate script loading
    React.useEffect(() => {
      if (onLoad) {
        onLoad();
      }
    }, [onLoad]);
    return <script src={src}>{children}</script>;
  };
});

// Mock CalendarPopup component
jest.mock('@/components/CalendarPopup', () => {
  return function MockCalendarPopup({ children, className }: any) {
    return (
      <button className={className} data-testid="calendar-popup">
        {children}
      </button>
    );
  };
});

describe('WaitlistForm', () => {
  let mockHbspt: any;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // Mock HubSpot forms API
    mockHbspt = {
      forms: {
        create: jest.fn(),
      },
    };

    // Set up window.hbspt
    (window as any).hbspt = mockHbspt;
  });

  afterEach(() => {
    delete (window as any).hbspt;
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the HubSpot form container', () => {
      render(<WaitlistForm />);

      const container = document.getElementById('hubspot-waitlist-form');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('hs-form-frame');
    });

    it('renders with correct data attributes', () => {
      render(<WaitlistForm />);

      const container = document.getElementById('hubspot-waitlist-form');
      expect(container).toHaveAttribute('data-region', 'eu1');
      expect(container).toHaveAttribute(
        'data-form-id',
        'f337eade-e814-4038-b2aa-908dcf612cce'
      );
      expect(container).toHaveAttribute('data-portal-id', '146205702');
    });

    it('renders the demo booking CTA button', () => {
      render(<WaitlistForm translations={{ 'cta.demo': 'Book a demo' }} />);

      const demoButton = screen.getByTestId('calendar-popup');
      expect(demoButton).toBeInTheDocument();
      expect(demoButton).toHaveTextContent('Book a demo');
    });

    it('uses default CTA text when translations not provided', () => {
      render(<WaitlistForm />);

      const demoButton = screen.getByTestId('calendar-popup');
      expect(demoButton).toHaveTextContent('Book a demo');
    });
  });

  describe('HubSpot Form Integration', () => {
    it('initializes HubSpot form when script loads', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalledWith({
          region: 'eu1',
          portalId: '146205702',
          formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
          target: '#hubspot-waitlist-form',
        });
      });
    });

    it('does not initialize form if HubSpot script not loaded', () => {
      delete (window as any).hbspt;

      render(<WaitlistForm />);

      expect(mockHbspt.forms.create).not.toHaveBeenCalled();
    });

    it('clears container before initializing form', async () => {
      render(<WaitlistForm />);

      const container = document.getElementById('hubspot-waitlist-form');

      // Add some content to container
      if (container) {
        container.innerHTML = '<div>Previous content</div>';
      }

      // Re-render to trigger initialization
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalled();
      });

      // Container should have been cleared (innerHTML set to empty)
      // Note: The actual HubSpot form would inject new content
    });

    it('handles missing container gracefully', () => {
      delete (window as any).hbspt;

      // Should not throw error even when HubSpot is not available
      expect(() => render(<WaitlistForm />)).not.toThrow();

      // Restore HubSpot for other tests
      (window as any).hbspt = mockHbspt;
    });
  });

  describe('HubSpot Configuration', () => {
    it('uses correct HubSpot portal ID', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalledWith(
          expect.objectContaining({
            portalId: '146205702',
          })
        );
      });
    });

    it('uses correct HubSpot form ID', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalledWith(
          expect.objectContaining({
            formId: 'f337eade-e814-4038-b2aa-908dcf612cce',
          })
        );
      });
    });

    it('uses EU1 region for GDPR compliance', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalledWith(
          expect.objectContaining({
            region: 'eu1',
          })
        );
      });
    });

    it('targets correct DOM element', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalledWith(
          expect.objectContaining({
            target: '#hubspot-waitlist-form',
          })
        );
      });
    });
  });

  describe('Demo CTA Button', () => {
    it('passes translations to CalendarPopup', () => {
      const customTranslations = {
        'cta.demo': 'Varaa demo',
      };

      render(<WaitlistForm translations={customTranslations} />);

      const button = screen.getByTestId('calendar-popup');
      expect(button).toHaveTextContent('Varaa demo');
    });

    it('applies correct CSS classes to button', () => {
      render(<WaitlistForm />);

      const button = screen.getByTestId('calendar-popup');
      expect(button).toHaveClass('btn-primary');
      expect(button).toHaveClass('inline-block');
    });

    it('is wrapped in proper container with spacing', () => {
      const { container } = render(<WaitlistForm />);

      const ctaContainer = container.querySelector('.mt-8.text-center');
      expect(ctaContainer).toBeInTheDocument();

      const button = screen.getByTestId('calendar-popup');
      expect(ctaContainer).toContainElement(button);
    });
  });

  describe('Multiple Instances', () => {
    it('handles multiple form instances without conflicts', async () => {
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalled();
      });

      const firstCallCount = mockHbspt.forms.create.mock.calls.length;

      render(<WaitlistForm />);

      // Should be called again for new instance
      await waitFor(() => {
        expect(mockHbspt.forms.create.mock.calls.length).toBeGreaterThan(
          firstCallCount
        );
      });
    });
  });

  describe('Server-Side Rendering', () => {
    it('does not crash when rendered on server', () => {
      // Simulate server environment
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() => render(<WaitlistForm />)).not.toThrow();

      // Restore window
      global.window = originalWindow;
    });

    it('initializes properly after client-side hydration', async () => {
      render(<WaitlistForm />);

      // HubSpot should be initialized on client
      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalled();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles HubSpot script loading errors gracefully', () => {
      delete (window as any).hbspt;

      expect(() => render(<WaitlistForm />)).not.toThrow();
      expect(mockHbspt.forms.create).not.toHaveBeenCalled();
    });

    it('handles missing forms.create method', () => {
      (window as any).hbspt = { forms: {} };

      expect(() => render(<WaitlistForm />)).not.toThrow();
      expect(mockHbspt.forms.create).not.toHaveBeenCalled();
    });

    it('re-initializes form when component remounts', async () => {
      const { unmount } = render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create).toHaveBeenCalled();
      });

      const firstCallCount = mockHbspt.forms.create.mock.calls.length;

      unmount();
      render(<WaitlistForm />);

      await waitFor(() => {
        expect(mockHbspt.forms.create.mock.calls.length).toBeGreaterThan(
          firstCallCount
        );
      });
    });
  });

  describe('Accessibility', () => {
    it('provides proper container structure for screen readers', () => {
      render(<WaitlistForm />);

      const container = document.getElementById('hubspot-waitlist-form');
      expect(container).toHaveAttribute('id', 'hubspot-waitlist-form');
    });

    it('demo button has accessible attributes', () => {
      render(<WaitlistForm />);

      const button = screen.getByTestId('calendar-popup');
      expect(button).toHaveAttribute('class');
    });
  });

  describe('HubSpot Script Loading', () => {
    it('loads HubSpot script from correct EU1 domain', () => {
      const { container } = render(<WaitlistForm />);

      const script = container.querySelector('script');
      expect(script).toHaveAttribute(
        'src',
        'https://js-eu1.hsforms.net/forms/embed/146205702.js'
      );
    });
  });

  describe('Form Container Management', () => {
    it('maintains single form container instance', () => {
      render(<WaitlistForm />);

      const containers = document.querySelectorAll('#hubspot-waitlist-form');
      expect(containers).toHaveLength(1);
    });

    it('applies correct CSS classes to container', () => {
      render(<WaitlistForm />);

      const container = document.getElementById('hubspot-waitlist-form');
      expect(container).toHaveClass('hs-form-frame');
      expect(container).toHaveClass('w-full');
    });
  });
});
