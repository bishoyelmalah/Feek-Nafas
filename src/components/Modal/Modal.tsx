import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: 'confirm' | 'alert';
}

export function Modal({ 
    isOpen, 
    title, 
    message, 
    onConfirm, 
    onCancel, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    type = 'confirm'
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h3 className={styles.modalTitle}>{title}</h3>
                <p className={styles.modalMessage}>{message}</p>
                <div className={styles.modalActions}>
                    {type === 'confirm' && (
                        <button className={styles.cancelBtn} onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}
                    <button className={styles.confirmBtn} onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
