import React from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

type StyledButtonProps = {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
  $withIcon?: boolean;
};

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    props.$variant === 'primary' ? '#374151' : '#f3f4f6'};
  color: ${(props) => (props.$variant === 'primary' ? 'white' : '#374151')};
  border: none;
  border-radius: 6px;
  font-weight: ${(props) => (props.$size === 'large' ? 600 : 500)};
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: ${(props) => (props.$fullWidth ? '100%' : 'auto')};

  /* Size variations */
  ${(props) => {
    switch (props.$size) {
      case 'small':
        return `
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
        `;
      case 'medium':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.75rem 1rem;
          font-size: 1rem;
        `;
      default:
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
    }
  }}

  &:hover {
    background-color: ${(props) =>
      props.$variant === 'primary' ? '#4b5563' : '#e5e7eb'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: ${(props) =>
        props.$variant === 'primary' ? '#374151' : '#f3f4f6'};
    }
  }

  /* Icon support */
  ${(props) =>
    props.$withIcon &&
    `
    &:before {
      content: '+';
      margin-right: 0.5rem;
      font-weight: 700;
    }
  `}
`;

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  withIcon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  withIcon = false,
  disabled = false,
  onClick,
  children,
  type = 'button',
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $withIcon={withIcon}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </StyledButton>
  );
};
