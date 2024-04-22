import { Link, useLocation } from "react-router-dom";
import { AppLayoutProps } from "./interface";
import cn from "classnames";

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <>
      <div className="h-[60px] bg-primary px-[20px] gap-x-[10px] flex items-center">
        <Link to="/" className="font-bold text-secondary">
          Hook
        </Link>
        <Link
          to="/use-state"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-state",
          })}
        >
          useState
        </Link>
        <Link
          to="/use-effect"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-effect",
          })}
        >
          useEffect
        </Link>
        <Link
          to="/use-ref"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-ref",
          })}
        >
          useRef
        </Link>
        <Link
          to="/use-memo"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-memo",
          })}
        >
          useMemo
        </Link>
        <Link
          to="/use-callback"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-callback",
          })}
        >
          useCallback
        </Link>
        <Link
          to="/use-context"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-context",
          })}
        >
          useContext
        </Link>
        <Link
          to="/use-reducer"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/use-reducer",
          })}
        >
          useReducer
        </Link>
      </div>
      <div className="w-screen h-[calc(100vh-60px)] overflow-y-auto  bg-black">
        {children}
      </div>
    </>
  );
}
