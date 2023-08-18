import React from 'react';

import './Button.css';

type ButtonStyling = 'primary' | 'secondary' | 'tertiary';
type ButtonType = 'button' | 'submit';
type ButtonVariant = 'default' | 'leftIcon' | 'rightIcon';

interface ButtonProps extends React.ComponentProps<'button'> {
  type: ButtonType;
  styling: ButtonStyling;
  variant: ButtonVariant;
  innerText: string;
  addedClass: string;
}

export default function Button({ type, styling, variant, innerText, addedClass }: ButtonProps) {
  return (
    <button className={`button button_${styling} ${addedClass}`} type={type === 'button' ? 'button' : 'submit'}>
      {variant === 'leftIcon' ? '<-' : ''}
      {innerText}
      {variant === 'rightIcon' ? '->' : ''}
    </button>
  );
}
