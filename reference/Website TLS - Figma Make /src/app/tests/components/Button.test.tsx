/**
 * Tests unitaires pour le composant Button
 * Design System TLS - The Learning Society
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/ui/button';

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('should handle onClick events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply variant styles correctly', () => {
    const { rerender } = render(<Button variant="default">Default</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
    
    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('border');
  });

  it('should apply size styles correctly', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-10');
    
    rerender(<Button size="sm">Small</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');
    
    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
  });

  it('should render children correctly', () => {
    render(
      <Button>
        <span>Icon</span>
        <span>Text</span>
      </Button>
    );
    
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should support asChild prop with Slot', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('Link Button');
  });
});
