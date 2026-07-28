import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import type { ModalProps } from '../../types/index.ts';
import { useFocusTrap, useScrollLock } from '../../hooks/useScrollAnimation.ts';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen);
  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-navy-900 opacity-60 backdrop-blur-sm" aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-bold text-navy-500">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-navy-500 hover:bg-navy-50"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
