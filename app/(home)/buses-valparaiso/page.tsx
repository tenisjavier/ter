import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";
import CarouselCTA from "@/components/Carousel/page";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/buses-valparaiso";
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function Home() {
  const components = await fetchPageComponents("/buses-valparaiso");
  return <BuilderComponent components={components}></BuilderComponent>;
}
