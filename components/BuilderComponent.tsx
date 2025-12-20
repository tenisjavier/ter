import React from "react";
import {
  CTASectionT,
  BannerT,
  PageComponent,
  ColumnSectionT,
  AccordionSectionT,
  CarouselCTASchemaT,
  PropertyT,
} from "@/typings";
import {
  fetchCTASectionById,
  fetchBannerById,
  fetchColumnSectionById,
  fetchAccordionSectionById,
  fetchCarouselCTAById,
  fetchProperties,
} from "@/config/db";
import CTASection from "@/components/CTASection";
import Banner from "@/components/Banner";
import ColumnSection from "@/components/ColumnSection";
import AccordionSection from "./AccordionSection";
import CarouselCTA from "./Carousel/page";
import PropertyGrid from "./PropertyGrid";

type BuilderComponentProps = {
  components: PageComponent[];
  pathname?: string;
};

//? return the JSX array of components to show on the opage
const BuilderComponent = async ({
  components,
  pathname,
}: BuilderComponentProps) => {
  const JSXComponents: (React.JSX.Element | null)[] = [];
  for (const c of components) {
    const component = await fetchComponent(c.__typename, c.id, pathname);
    JSXComponents.push(component);
  }
  return JSXComponents.map((component, index) =>
    component
      ? React.cloneElement(component, { key: components[index].id })
      : null
  );
};

//? function that return the correct component from db fetch depending on type
const fetchComponent = async (type: string, id: string, pathname?: string) => {
  switch (type) {
    case "CtaSection":
      let ctaSectionProps: CTASectionT = await fetchCTASectionById(id);
      return <CTASection {...ctaSectionProps}></CTASection>;

    case "Banner":
      let bannerProps: BannerT = await fetchBannerById(id);
      return <Banner {...bannerProps}></Banner>;

    case "ColumnSection":
      let columnSectionProps: ColumnSectionT = await fetchColumnSectionById(id);
      return <ColumnSection {...columnSectionProps}></ColumnSection>;

    case "AccordionSection":
      let accordionSectionProps: AccordionSectionT =
        await fetchAccordionSectionById(id);
      return <AccordionSection {...accordionSectionProps}></AccordionSection>;

    case "Carousel":
      let carouselCTAProps: CarouselCTASchemaT = await fetchCarouselCTAById(id);
      return <CarouselCTA {...carouselCTAProps}></CarouselCTA>;

    case "PropertyGrid":
      let { properties, total } = await fetchProperties();
      let PropertyGridTotalPages = Math.ceil(total / 21);
      return <PropertyGrid properties={properties} currentPage={1} totalPages={PropertyGridTotalPages}></PropertyGrid>;
    default:
      return null;
  }
};

export default BuilderComponent;
