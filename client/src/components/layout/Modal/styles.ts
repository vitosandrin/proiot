import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.525);
  z-index: 1000;
`;

export const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  z-index: 1000;
  background-color: ${({ theme }) => theme?.colors?.light?.pure};
  font-size: 1rem;
  border-radius: 2rem;
`;

export const CloseModal = styled(FaTimes)`
  color: ${({ theme }) => theme?.font?.colors?.dark};
  cursor: pointer;
  height: 24px;
  width: 24px;
`;
