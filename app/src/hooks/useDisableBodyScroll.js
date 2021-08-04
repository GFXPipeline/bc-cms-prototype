import { useEffect } from "react";

// Prevent the body of the page from scrolling, such as when a modal is open
export const useDisableBodyScroll = ({ isScrollDisabled }) => {
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Clean-up on un-mount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isScrollDisabled]);
};
