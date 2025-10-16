import { render, screen } from '@testing-library/react';
import Breadcrumbs from '../components/Breadcrumbs';

const renderBreadcrumbs = (items: any[]) => {
  return render(<Breadcrumbs items={items} />);
};

describe('Breadcrumbs Component', () => {
  it('renders breadcrumb navigation with correct aria-label', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Post Title', isCurrentPage: true }
    ];

    renderBreadcrumbs(items);
    
    const nav = screen.getByLabelText('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');
  });

  it('renders all breadcrumb items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Post Title', isCurrentPage: true }
    ];

    renderBreadcrumbs(items);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Post Title')).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' }
    ];

    renderBreadcrumbs(items);
    
    const homeLink = screen.getByText('Home');
    const blogLink = screen.getByText('Blog');
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    expect(blogLink.closest('a')).toHaveAttribute('href', '/blog');
  });

  it('renders current page item without link', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current Page', isCurrentPage: true }
    ];

    renderBreadcrumbs(items);
    
    const currentPageItem = screen.getByText('Current Page');
    expect(currentPageItem.closest('a')).toBeNull();
    expect(currentPageItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Post', isCurrentPage: true }
    ];

    const { container } = renderBreadcrumbs(items);
    
    // Should have 2 separators for 3 items - check for SVG elements
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(2);
  });

  it('applies correct styling classes', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current Page', isCurrentPage: true }
    ];

    renderBreadcrumbs(items);
    
    const nav = screen.getByLabelText('navigation');
    expect(nav).toHaveClass('flex', 'items-center', 'space-x-1', 'text-sm', 'text-gray-600');
  });

  it('applies correct styling to current page', () => {
    const items = [
      { label: 'Current Page', isCurrentPage: true }
    ];

    renderBreadcrumbs(items);
    
    const currentPageItem = screen.getByText('Current Page');
    expect(currentPageItem).toHaveClass('text-gray-900', 'font-medium');
  });

  it('applies correct styling to links', () => {
    const items = [
      { label: 'Home', href: '/' }
    ];

    renderBreadcrumbs(items);
    
    const link = screen.getByText('Home').closest('a');
    expect(link).toHaveClass('text-forest', 'hover:text-forest-dark', 'transition-colors', 'duration-200', 'hover:underline');
  });

  it('handles empty items array', () => {
    renderBreadcrumbs([]);
    
    const nav = screen.getByLabelText('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav.children).toHaveLength(0);
  });

  it('handles single item', () => {
    const items = [
      { label: 'Home', isCurrentPage: true }
    ];

    const { container } = renderBreadcrumbs(items);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    // Should not have any separators for single item
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(0);
  });
});
