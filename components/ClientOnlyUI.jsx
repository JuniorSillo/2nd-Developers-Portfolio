"use client";

import dynamic from "next/dynamic";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientOnlyUI() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
    </>
  );
}