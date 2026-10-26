import MediaConverter from "./MediaConverter";

// This page is self-contained and should be included in the deployed route manifest.
export const dynamic = "force-static";
export const revalidate = 3600;

export default function ConvertidorMediaPage() {
  return <MediaConverter />;
}
