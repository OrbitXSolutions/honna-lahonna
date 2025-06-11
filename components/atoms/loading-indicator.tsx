"use client";

import { useLinkStatus } from "next/link";
import { Spinner } from "../ui/spinner";
import { useEffect, useState } from "react";
interface Props {
  // call back on finished loading
  callback?: () => void;
  loaderClassName?: string;
}

export default function LoadingIndicator({ callback, loaderClassName }: Props) {
  const { pending } = useLinkStatus();
  const [isStartLoading, setStartLoading] = useState(false);
  // If a callback is provided, call it when the link status changes
  useEffect(() => {
    if (callback && !pending && isStartLoading) {
      callback();
      setStartLoading(false);
    }
    if (pending) {
      setStartLoading(true);
    } else {
      setStartLoading(false);
    }
  }, [pending, callback]);
  return pending ? (
    <Spinner size="small" className={loaderClassName ?? ""} />
  ) : null;
}
