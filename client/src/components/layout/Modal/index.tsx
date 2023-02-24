import { useEffect, FC, KeyboardEvent } from "react";
import Portal from "../../utils/Portal";
import { CloseModal, Content, Overlay } from "./styles";
interface IModalProps {
  open: any;
  children: any;
  onClose: any;
}
export const Modal: FC<IModalProps> = ({ open, children, onClose }) => {
  function onDialogClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
  }

  function onOverlayClick() {
    onClose();
  }

  useEffect(() => {
    function onEsc(e: any) {
      if (e.keyCode === 27) onClose();
    }
    window.addEventListener("keydown", onEsc);

    return () => {
      window.addEventListener("keydown", onEsc);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <Portal>
      <Overlay onClick={onOverlayClick}>
        <Content onClick={onDialogClick}>
          <CloseModal onClick={onClose} />
          {children}
        </Content>
      </Overlay>
    </Portal>
  );
};
