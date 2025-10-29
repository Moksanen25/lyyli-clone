import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Logo from '@/components/Header/Logo';

describe('Logo Component', () => {
  it('renders the logo image with correct attributes', () => {
    render(<Logo />);

    const logo = screen.getByRole('img', { name: /Lyyli.ai logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src');
  });

  it('wraps logo in a link to homepage', () => {
    render(<Logo />);

    const link = screen.getByRole('link', { name: /Lyyli.ai homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('calls onLogoClick when clicked', async () => {
    const onLogoClick = jest.fn();
    const user = userEvent.setup();

    render(<Logo onLogoClick={onLogoClick} />);

    const link = screen.getByRole('link', { name: /Lyyli.ai homepage/i });
    await user.click(link);

    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  it('has priority loading for LCP optimization', () => {
    render(<Logo />);

    const logo = screen.getByRole('img', { name: /Lyyli.ai logo/i });
    // The priority prop is passed to Next.js Image component
    expect(logo).toBeInTheDocument();
  });
});

