import { FC } from "react";
import ReactDOM from "react-dom";

interface IPortal {
  children: any;
}

const Portal: FC<IPortal> = ({ children }) => {
  const portalDiv = document.getElementById("portal")!;
  return ReactDOM.createPortal(<>{children}</>, portalDiv);
};

export default Portal;