import { toast, ToastOptions, ToastPosition } from 'react-toastify';
import React from 'react';
import cn from 'classnames';

import {
  AttentionToastrIcon,
  CloseToastrIcon,
  ErrorToastrIcon,
  InfoToastrIcon,
  SuccessToastrIcon,
} from '@components/Toast/constants/icons.constants';
import {
  TOAST_ERROR, TOAST_INFO, TOAST_POSITIONS, TOAST_SUCCESS, TOAST_WARNING,
} from '@components/Toast/constants/toast.constants';
import styles from './toast.module.scss';

export const showToast = (
  message: string,
  type: 'info' | 'success' | 'warning' | 'error' | 'default' | undefined,
  description?: string,
  position?: string,
  handleAction?: () => void,
  handleClose?: () => void,
): void => {

  let bool = false;
  const options: ToastOptions = {
    position: position as ToastPosition || TOAST_POSITIONS.BOTTOM_RIGHT as ToastPosition,
    autoClose: 13500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    bodyClassName: styles.toastBody,
    className: styles[`toast-container-${type}`],
    progressClassName: styles.progressClassName,
    type,
    onClose: () => {
      if (!bool) {
        if (handleAction) {
          handleAction();
        }
      }
    },
    closeButton: !handleClose ? false : (
      <button
        onClick={() => {
          handleClose();
          bool = true;
        }}
      >CLOSE
      </button>
    ),
  };

  const renderBlock = (icon: JSX.Element, style: string, close: JSX.Element) => (
    <div className={cn(styles.wrapBody, { [styles.wrapBodyWithoutDescription]: description })}>{icon}
      <div className={cn(styles.messageBlock, style)}>
        <div>{message}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <span className={styles.close}>{close}</span>
    </div>
  );

  const renderMessageWithIcon = () => {
    switch (type) {
      case TOAST_INFO:
        return renderBlock(InfoToastrIcon, styles.info, CloseToastrIcon);
      case TOAST_SUCCESS:
        return renderBlock(SuccessToastrIcon, styles.success, CloseToastrIcon);
      case TOAST_WARNING:
        return renderBlock(AttentionToastrIcon, styles.warning, CloseToastrIcon);
      case TOAST_ERROR:
        return renderBlock(ErrorToastrIcon, styles.error, CloseToastrIcon);
      default:
        return renderBlock(InfoToastrIcon, styles.info, CloseToastrIcon);
    }
  };
  toast(renderMessageWithIcon(), options);
};
