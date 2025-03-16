import { FC, ReactNode, MouseEvent } from 'react';
import { cn } from '@bem-react/classname';

import './Modal.scss';
import { Button } from '../Button';
import Transition from 'react-transition-group/Transition';
import React from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type TitlePositionType = 'center' | 'right' | 'left';
type ButtonPositionType = 'center' | 'right' | 'left';

const cnModal = cn('modal');

export interface ModalSchema {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  isInform?: boolean;
  children?: ReactNode;
  confirmBtnText?: string;
  titlePosition?: TitlePositionType;
  buttonPosition?: ButtonPositionType;
  onClose?: () => void;
  onConfirm?: () => void;
  isCloseIcon?: boolean;
  classNameOverlay?: string;
  overlayTransparent?: boolean;
}

export const Modal: FC<ModalSchema> = ({
  children,
  title,
  subtitle,
  isOpen,
  isInform,
  isCloseIcon = true,
  confirmBtnText,
  onClose,
  classNameOverlay,
  overlayTransparent,
}: ModalSchema) => {
  const nodeRef = React.useRef(null);

  const closeModal = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };
  return (
    <Transition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      unmountOnExit
      mountOnEnter
    >
      <div
        className={cnModal('overlay', { transparent: !overlayTransparent }, [
          classNameOverlay,
        ])}
        onClick={(e) => closeModal(e)}
      >
        <div className={cnModal()}>
          {isCloseIcon && (
            <button
              onClick={() => onClose && onClose()}
              className={cnModal('close')}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
          {title && <div className={cnModal('title')}>{title}</div>}
          {subtitle && <div className={cnModal('subtitle')}>{subtitle}</div>}
          {children}

          {isInform && (
            <Button
              secondary
              className={cnModal('btn')}
              onClick={() => onClose && onClose()}
            >
              {confirmBtnText}
            </Button>
          )}
        </div>
      </div>
    </Transition>
  );
};
