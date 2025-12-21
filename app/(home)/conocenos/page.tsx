import { Metadata } from "next";
import { fetchMetaTagsFromContentful, fetchPageComponents } from "@/config/db";
import BuilderComponent from "@/components/BuilderComponent";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = "/conocenos";
  return await fetchMetaTagsFromContentful(pathname);
}

export default async function Home() {
  const components = await fetchPageComponents("/conocenos");
  return <BuilderComponent components={components}></BuilderComponent>;
}
