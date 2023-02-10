import React, { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const eventHandler = (event) => {
      if (!domNode.current?.contains(event.target)) handler();
    };
    document.addEventListener("mousedown", eventHandler);
    return () => {
      document.removeEventListener("mousedown", eventHandler);
    };
  });
  return domNode;
};

export default useClickOutside;
