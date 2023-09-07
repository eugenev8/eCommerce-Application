import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Buttons';

describe('Button', () => {
  it('renders with the correct text and styling', () => {
    render(
      <Button type="button" styling="primary" variant="default" innerText="Primary Button" addedClass="custom-class" />
    );

    const button = screen.getByText('Primary Button');
    expect(button).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClickMock = vi.fn();
    render(
      <Button
        addedClass=""
        type="button"
        styling="secondary"
        variant="default"
        innerText="Secondary Button"
        onClick={onClickMock}
      />
    );

    const button = screen.getByText('Secondary Button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('renders as a submit button when type="submit"', () => {
    render(<Button addedClass="" type="submit" styling="tertiary" variant="default" innerText="Submit Button" />);

    const button = screen.getByText('Submit Button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders with custom styles', () => {
    const customStyle = { backgroundColor: 'rgb(0, 0, 255)', color: 'rgb(255, 255, 255)' };
    render(
      <Button
        addedClass=""
        type="button"
        styling="secondary"
        variant="default"
        innerText="Custom Style Button"
        style={customStyle}
      />
    );

    const button = screen.getByText('Custom Style Button');
    expect(button).toHaveStyle('background-color: rgb(0, 0, 255)');
    expect(button).toHaveStyle('color: rgb(255, 255, 255)');
  });
});
