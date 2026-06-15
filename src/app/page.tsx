import { Suspense } from "react";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <Suspense>
      <Portfolio />
    </Suspense>
  );
}
