/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Import the component after mocks
import NotFound from '../app/[locale]/not-found';

describe('404 Not Found Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  describe('Page Content', () => {
    it('should render 404 error code', () => {
      render(<NotFound />);
      const errorCode = screen.getByLabelText('Error 404');
      expect(errorCode).toBeInTheDocument();
      expect(errorCode).toHaveTextContent('404');
    });

    it('should render heading', () => {
      render(<NotFound />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Page Not Found');
    });

    it('should render helpful message', () => {
      render(<NotFound />);
      expect(screen.getByText(/couldn't find the page/i)).toBeInTheDocument();
    });

    it('should render Lyyli.ai logo', () => {
      render(<NotFound />);
      const logo = screen.getByAltText('Lyyli.ai logo');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('should render search input', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      expect(searchInput).toBeInTheDocument();
    });

    it('should update search query on input', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      
      fireEvent.change(searchInput, { target: { value: 'test query' } });
      expect(searchInput).toHaveValue('test query');
    });

    it('should navigate to help page on search submit', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      const form = searchInput.closest('form')!;
      
      fireEvent.change(searchInput, { target: { value: 'getting started' } });
      fireEvent.submit(form);
      
      expect(mockPush).toHaveBeenCalledWith('/en/help?q=getting%20started');
    });

    it('should not navigate on empty search', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      const form = searchInput.closest('form')!;
      
      fireEvent.submit(form);
      
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should trim whitespace from search query', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      const form = searchInput.closest('form')!;
      
      fireEvent.change(searchInput, { target: { value: '  spaced query  ' } });
      fireEvent.submit(form);
      
      expect(mockPush).toHaveBeenCalledWith('/en/help?q=spaced%20query');
    });

    it('should encode special characters in search', () => {
      render(<NotFound />);
      const searchInput = screen.getByLabelText('Search our help center');
      const form = searchInput.closest('form')!;
      
      fireEvent.change(searchInput, { target: { value: 'test & query' } });
      fireEvent.submit(form);
      
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('test'));
      expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('query'));
    });
  });

  describe('Navigation Links', () => {
    it('should have Home link', () => {
      render(<NotFound />);
      const homeLink = screen.getByTestId('404-link-home');
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/en');
    });

    it('should have Features link', () => {
      render(<NotFound />);
      const featuresLink = screen.getByTestId('404-link-features');
      expect(featuresLink).toBeInTheDocument();
      expect(featuresLink).toHaveAttribute('href', '/en/features');
    });

    it('should have Security link', () => {
      render(<NotFound />);
      const securityLink = screen.getByTestId('404-link-security');
      expect(securityLink).toBeInTheDocument();
      expect(securityLink).toHaveAttribute('href', '/en/cybersecurity');
    });

    it('should have Blog link', () => {
      render(<NotFound />);
      const blogLink = screen.getByTestId('404-link-blog');
      expect(blogLink).toBeInTheDocument();
      expect(blogLink).toHaveAttribute('href', '/en/blog');
    });

    it('should have Help Center link', () => {
      render(<NotFound />);
      const helpLink = screen.getByTestId('404-link-help');
      expect(helpLink).toBeInTheDocument();
      expect(helpLink).toHaveAttribute('href', '/en/help');
    });

    it('should have Contact Support link', () => {
      render(<NotFound />);
      const contactLink = screen.getByTestId('404-link-contact');
      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/en/contact');
    });

    it('should have About Us link', () => {
      render(<NotFound />);
      const aboutLink = screen.getByTestId('404-link-about');
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/en/about');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible search form', () => {
      render(<NotFound />);
      
      const searchInput = screen.getByLabelText('Search our help center');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('id', 'search-404');
    });

    it('should have aria-label on search button', () => {
      render(<NotFound />);
      const searchButton = screen.getByLabelText('Submit search');
      expect(searchButton).toBeInTheDocument();
    });

    it('should have single h1 heading', () => {
      render(<NotFound />);
      const headings = screen.getAllByRole('heading', { level: 1 });
      expect(headings).toHaveLength(1);
    });

    it('should have aria-hidden on decorative elements', () => {
      const { container } = render(<NotFound />);
      const decorativeIcons = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Visual Elements', () => {
    it('should render all popular page cards', () => {
      render(<NotFound />);
      
      const cards = [
        screen.getByTestId('404-link-home'),
        screen.getByTestId('404-link-features'),
        screen.getByTestId('404-link-security'),
        screen.getByTestId('404-link-blog'),
      ];

      cards.forEach(card => {
        expect(card).toBeInTheDocument();
      });
    });

    it('should render page descriptions for cards', () => {
      render(<NotFound />);
      
      expect(screen.getByText('Return to our homepage')).toBeInTheDocument();
      expect(screen.getByText('Explore AI-powered features')).toBeInTheDocument();
      expect(screen.getByText('Learn about our security')).toBeInTheDocument();
      expect(screen.getByText('Read our latest insights')).toBeInTheDocument();
    });

    it('should render additional help section', () => {
      render(<NotFound />);
      expect(screen.getByText(/Need more help/i)).toBeInTheDocument();
    });
  });
});
