import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

interface IAlertDialogProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const SharedAlertDialog = ({
  title,
  description,
  cancelText,
  confirmText,
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: IAlertDialogProps) => {
  return (
    <Dialog.Root lazyMount open={open} onOpenChange={() => onOpenChange(!open)} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{description}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={'red'} onClick={onConfirm} loading={isLoading}>
                {confirmText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SharedAlertDialog;
