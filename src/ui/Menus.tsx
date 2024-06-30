import {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import styled from "styled-components";
import { useHandleClick } from "../hooks/useHandleClick";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProp {
  position: {
    x: number | undefined;
    y: number | undefined;
  };
}
const StyledList = styled.ul<StyledListProp>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  list-style-type: none;
  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusChildren {
  children: ReactNode;
}
interface MenusContextProp {
  isOpenedId: number | undefined;
  open: React.Dispatch<React.SetStateAction<number | undefined>>;
  close(): void;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number | undefined;

      y: number | undefined;
    }>
  >;
  position: {
    x: number | undefined;
    y: number | undefined;
  };
}
interface positionProp {
  x: number | undefined;
  y: number | undefined;
}

const MenusContext = createContext<MenusContextProp | undefined>(undefined);

const Menus = ({ children }: MenusChildren) => {
  const [isOpenedId, setIsOpenId] = useState<number | undefined>(undefined);
  const [position, setPosition] = useState<positionProp>({
    x: undefined,
    y: undefined,
  });

  const open = setIsOpenId;
  const close = () => setIsOpenId(undefined);

  return (
    <MenusContext.Provider
      value={{ position, setPosition, isOpenedId, open, close }}
    >
      {" "}
      {children}{" "}
    </MenusContext.Provider>
  );
};

function Toggle({ id }: { id: number }) {
  const { open, isOpenedId, close, setPosition } = useMenuContext();

  function handleClick(e: MouseEvent) {
    let rect: DOMRect | undefined;
    if (e.target instanceof Element)
      rect = e.target.closest("button")?.getBoundingClientRect();
    setPosition({
      x: rect && window.innerWidth - rect?.width - rect?.x,
      y: rect && rect?.height + rect?.y + 8,
    });

    isOpenedId === undefined || isOpenedId !== id ? open(id) : close();
  }

  return cloneElement(
    <StyledToggle>
      <HiEllipsisVertical />
    </StyledToggle>,
    {
      onClick: handleClick,
    }
  );
}
function List({ id, children }: MenusChildren & { id: number }) {
  const { isOpenedId, close } = useMenuContext();
  const { ref } = useHandleClick(close);
  const { position } = useMenuContext();
  if (isOpenedId !== id) return null;
  return createPortal(
    <StyledList ref={ref} as="div" position={position}>
      {children}
    </StyledList>,
    document.body
  );
}
function Button({
  children,
  icon,
  loading,
  click,
}: MenusChildren & { icon: ReactNode; click?: () => void; loading?: boolean }) {
  const { close } = useMenuContext();
  function handleClick() {
    click?.();
    close();
  }
  return (
    <StyledButton disabled={loading && loading} onClick={handleClick}>
      {icon} {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

function useMenuContext() {
  const context = useContext(MenusContext);

  if (context === undefined)
    throw new Error("Context cannot be used outside of a provider");

  return context;
}

useMenuContext;
export default Menus;
