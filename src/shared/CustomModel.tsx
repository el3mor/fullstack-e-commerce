import { Button, Dialog, Portal } from '@chakra-ui/react';
import { useRef, ReactNode } from 'react';

interface ISharedCustomModelProps {
  title: string;
  children: ReactNode;
  cancelText?: string;
  confirmText?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SharedCustomModel = ({
  title,
  children,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: ISharedCustomModelProps) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      open={open}
      onOpenChange={() => {
        onOpenChange(!open);
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette={'teal'} onClick={onSubmit} loading={isLoading}>
                {confirmText}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SharedCustomModel;
