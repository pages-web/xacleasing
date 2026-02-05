import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DownloadLogo() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/logo");
  }, []);

  return null;
}
