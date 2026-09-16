import type { Metadata } from "next";
import { StudioApp } from "./StudioApp";

export const metadata: Metadata = {
  title: "Checktrail Studio",
  description: "Visual UI editor for Checktrail",
};

export default function StudioPage() {
  return <StudioApp />;
}
