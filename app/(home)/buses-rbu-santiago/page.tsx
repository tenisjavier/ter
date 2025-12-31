import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";
import CarouselCTA from "@/components/Carousel/page";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/buses-rbu-santiago";
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function Home() {
  const components = await fetchPageComponents("/buses-rbu-santiago");
  return <BuilderComponent components={components}></BuilderComponent>;
}
