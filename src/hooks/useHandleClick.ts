import { useEffect, useRef } from "react";

// type handleType = {
//     close:() => void
// }
export function useHandleClick(handlers:()=>void,listenCapturing=true) {
      const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLDivElement | null;

      if (ref.current && !ref.current.contains(target)) handlers();
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => document.removeEventListener("click", handleClick, listenCapturing);
  }, [handlers,listenCapturing]);

  return {ref}
}


//this is a minor comment to see where I stopped.