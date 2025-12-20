import { ReactNode } from "react";

interface RenderIfProps {
  condition: any;
  children: ReactNode;
}

const RenderIf = ({ children, condition }: RenderIfProps) => {
  return !!condition && children
};

export default RenderIf