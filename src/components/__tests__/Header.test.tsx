import React from 'react'
import { render, screen, fireEvent, waitFor } from '../../__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'
import Header from '../Header'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Mock ClientLocaleSwitcher
jest.mock('../ClientLocaleSwitcher', () => {
  return function MockClientLocaleSwitcher({ currentLocale }: { currentLocale: string }) {
    return <div data-testid="locale-switcher">{currentLocale}</div>
  }
})

const mockTranslations = {
  "nav.features": "Features",
  "nav.pricing": "Pricing",
  "nav.contact": "Contact",
  "nav.security": "Security"
}

const defaultProps = {
  locale: 'en',
  translations: mockTranslations
}

describe('Header', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })

    // Mock ResizeObserver
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))
  })

  it('renders header with logo and navigation', () => {
    render(<Header {...defaultProps} />)

    // Check logo
    const logo = screen.getByAltText('Lyyli.ai logo - AI Communication Assistant for Professional Service Organizations')
    expect(logo).toBeInTheDocument()

    // Check navigation links
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()

    // Check locale switcher
    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const mobileMenuButton = screen.getByRole('button', {
      name: /open mobile navigation menu/i
    })

    // Initially menu should be closed
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')

    // Click to open menu
    await user.click(mobileMenuButton)

    // Menu should be open
    await waitFor(() => {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    })

    // Click to close menu
    await user.click(mobileMenuButton)

    // Menu should be closed
    await waitFor(() => {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('opens and closes features dropdown on hover', async () => {
    render(<Header {...defaultProps} />)

    const featuresButton = screen.getByRole('button', { name: /features/i })

    // Initially dropdown should be hidden
    expect(screen.queryByText('Security')).not.toBeVisible()

    // Hover over features button
    fireEvent.mouseEnter(featuresButton)

    // Dropdown should appear
    await waitFor(() => {
      expect(screen.getByText('Security')).toBeVisible()
    })

    // Move mouse away
    fireEvent.mouseLeave(featuresButton)

    // Dropdown should disappear after timeout
    await waitFor(() => {
      expect(screen.queryByText('Security')).not.toBeVisible()
    }, { timeout: 200 })
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<Header {...defaultProps} />)

    const mobileMenuButton = screen.getByRole('button', {
      name: /open mobile navigation menu/i
    })

    // Open mobile menu
    await user.click(mobileMenuButton)

    // Click on a navigation link in mobile menu
    const featuresLink = screen.getByRole('link', { name: /features/i })
    await user.click(featuresLink)

    // Menu should be closed
    await waitFor(() => {
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('displays correct locale-specific text', () => {
    const fiProps = {
      ...defaultProps,
      locale: 'fi',
      translations: {
        "nav.features": "Ominaisuudet",
        "nav.pricing": "Hinnoittelu",
        "nav.contact": "Yhteys"
      }
    }

    render(<Header {...fiProps} />)

    // Check for Finnish text in mobile menu where it appears uniquely
    expect(screen.getByText('Liity odotuslistalle')).toBeInTheDocument()
    expect(screen.getByText('Apu')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Header {...defaultProps} />)

    // Main navigation has proper role and label
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()

    // Logo link has proper aria-label
    const logoLink = screen.getByRole('link', { name: /lyyli\.ai homepage/i })
    expect(logoLink).toBeInTheDocument()

    // Mobile menu button has proper attributes
    const mobileMenuButton = screen.getByRole('button', {
      name: /open mobile navigation menu/i
    })
    expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false')
    expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu')
  })

  it('changes header appearance on scroll', () => {
    render(<Header {...defaultProps} />)

    // Initially should have default styling
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toHaveClass('bg-white/80')

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 30
    })

    // Trigger scroll event
    fireEvent.scroll(window)

    // Should have scrolled styling
    expect(nav).toHaveClass('bg-white/95')
  })
})
