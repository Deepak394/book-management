import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <p className="text-sm text-gray-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
