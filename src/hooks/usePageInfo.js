import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export function usePageInfo(info) {
  const ctx = useOutletContext();
  useEffect(() => {
    if (ctx?.setPageInfo) ctx.setPageInfo(info);
  }, [info]);
}