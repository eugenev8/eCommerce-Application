import React from 'react';
import { render, screen } from '@testing-library/react';
import ColoredContainer from './ColoredContainer';

describe('ColoredContainer', () => {
  it('renders children', () => {
    render(<ColoredContainer>Test Content</ColoredContainer>);
    const childElement = screen.getByText('Test Content');
    expect(childElement).toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const customStyles = {
      backgroundColor: 'rgb(0, 0, 0)',
      color: 'rgb(255, 255, 255)',
    };
    render(<ColoredContainer style={customStyles}>Styled Content</ColoredContainer>);
    const coloredDiv = screen.getByText('Styled Content');

    expect(coloredDiv).toHaveStyle('background-color: rgb(0, 0, 0)');
    expect(coloredDiv).toHaveStyle('color: rgb(255, 255, 255)');
  });
});
