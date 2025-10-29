import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileMenuButton from '@/components/Header/MobileMenuButton';

describe('MobileMenuButton Component', () => {
  it('renders closed menu button by default', () => {
    render(<MobileMenuButton isOpen={false} onClick={jest.fn()} />);

    const button = screen.getByRole('button', { name: /open mobile navigation menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders open menu button when isOpen is true', () => {
    render(<MobileMenuButton isOpen={true} onClick={jest.fn()} />);

    const button = screen.getByRole('button', { name: /close mobile navigation menu/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onClick when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<MobileMenuButton isOpen={false} onClick={onClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct ARIA attributes for accessibility', () => {
    render(<MobileMenuButton isOpen={false} onClick={jest.fn()} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('toggles between open and closed states', () => {
    const { rerender } = render(<MobileMenuButton isOpen={false} onClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();

    rerender(<MobileMenuButton isOpen={true} onClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });
});

