import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '../../__tests__/utils/test-utils'
import userEvent from '@testing-library/user-event'
import Header from '../Header'
import type { TranslationKeys } from '@/lib/i18n'

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
} as unknown as TranslationKeys

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

    // Check top-level desktop navigation button and links
    const mainNav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(within(mainNav).getByRole('button', { name: /features/i })).toBeInTheDocument()
    expect(within(mainNav).getAllByText('Pricing')[0]).toBeInTheDocument()
    expect(within(mainNav).getAllByText('Contact')[0]).toBeInTheDocument()

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

    // Within mobile nav, ensure link exists uniquely
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(within(mobileNav).getAllByRole('link', { name: /features/i })[0]).toBeInTheDocument()

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
    expect(screen.queryAllByText('Security')[0]).not.toBeVisible()

    // Hover over features button
    fireEvent.mouseEnter(featuresButton)

    // Dropdown should appear
    await waitFor(() => {
      const dropdownLinks = screen.getAllByText('Security')
      expect(dropdownLinks[0]).toBeVisible()
    })

    // Move mouse away
    fireEvent.mouseLeave(featuresButton)

    // Dropdown should disappear after timeout
    await waitFor(() => {
      const dropdownLinks = screen.getAllByText('Security')
      expect(dropdownLinks[0]).not.toBeVisible()
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
      } as unknown as TranslationKeys
    }

    render(<Header {...fiProps} />)

    // Ensure Finnish CTAs appear; pick the first instance if multiple
    expect(screen.getAllByText('Liity odotuslistalle')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Apu')[0]).toBeInTheDocument()
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
