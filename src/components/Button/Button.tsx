import { FC, ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { cn } from '@bem-react/classname';

import './Button.scss';

const cnButton = cn('Button');

export interface ButtonShema
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  circle?: boolean;
  tag?: boolean;
  secondary?: boolean;
  outline?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const Button: FC<ButtonShema> = ({
  circle,
  tag,
  outline,
  secondary,
  children,
  onClick,
  className,
  isDisabled,
}: ButtonShema) => {
  return (
    <>
      <button
        className={cnButton(
          {
            circle,
            tag,
            outline,
            secondary,
            disabled: isDisabled,
          },
          [className]
        )}
        onClick={() => {
          onClick && onClick();
        }}
        disabled={isDisabled}
      >
        {children}
      </button>
    </>
  );
};
