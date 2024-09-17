import React from "react";

interface OnClickBoundaryProps {
  children: React.ReactNode;
}

const OnClickBoundary: React.FC<OnClickBoundaryProps> = ({ children }) => {
  const handleEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleEvent} onMouseOver={handleEvent}>
      {children}
    </div>
  );
};

export default OnClickBoundary;
