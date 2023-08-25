import React from 'react';
import styles from './Button.module.scss';

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
      className={`${styles.button} ${styles[`button_${styling}`]} ${addedClass}`}
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
  onClick: undefined,
};

export default Button;
