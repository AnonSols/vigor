import React, {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useHandleClick } from "../hooks/useHandleClick";
// import toast from "react-hot-toast";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  /* cursor: pointer; */
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

interface ModalChildren {
  children: ReactNode;
}
type ModalProp = ModalChildren;
type ModalContextProp = {
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string>>;
  openName: string;
};

const ModalContext = createContext<ModalContextProp | undefined>(undefined);

const Modal = ({ children }: ModalProp) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

function Open({
  children,
  opens: openWindowsName,
}: ModalChildren & { opens: string }) {
  const { open } = useModal();
  return cloneElement(children as React.ReactElement, {
    onClick: () => open(openWindowsName),
  });
}

function Window({
  children,
  name: WindowName,
}: ModalChildren & { name: string }) {
  const { close, openName } = useModal();

  const { ref } = useHandleClick(close);
  if (WindowName !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close()}>
          <HiXMark />
        </Button>
        {cloneElement(children as React.ReactElement, {
          onCloseModal: () => close(),
        })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

function useModal() {
  const modalContext = useContext(ModalContext);

  if (modalContext === undefined)
    throw new Error("Context cannot be used outside of a provider");

  return modalContext;
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
