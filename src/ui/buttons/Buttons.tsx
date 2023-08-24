import React from 'react';
import './Button.scss';

type ButtonStyling = 'primary' | 'secondary' | 'tertiary';
type ButtonType = 'button' | 'submit';
type ButtonVariant = 'default' | 'leftIcon' | 'rightIcon';

interface ButtonProps extends React.ComponentProps<'button'> {
  type: ButtonType;
  styling: ButtonStyling;
  variant: ButtonVariant;
  innerText: string;
  addedClass: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ type, styling, variant, innerText, addedClass, onClick }: ButtonProps) {
  return (
    <button
      className={`button button_${styling} ${addedClass}`}
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
    >
      {variant === 'leftIcon' ? '<-' : ''}
      {innerText}
      {variant === 'rightIcon' ? '->' : ''}
    </button>
  );
}

Button.defaultProps = {
  onClick: undefined, // Set a default value for the onClick prop
};

export default Button;
