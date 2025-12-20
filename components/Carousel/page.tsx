"use client";
import React from "react";
import CTASection from "../CTASection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselCTASchemaT } from "@/typings";
import Autoplay from "embla-carousel-autoplay";

const CarouselCTA = (props: CarouselCTASchemaT) => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  return (
    <Carousel
      className="w-full relative"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {props.itemsCollection.items.map((item) => (
          <CarouselItem key={item.name} className="w-fit">
            <CTASection {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bg-destacado text-white  top-11/12  lg:inline-flex left-4 cursor-pointer" />
      <CarouselNext className="bg-destacado text-white top-11/12  lg:inline-flex right-4 cursor-pointer" />
    </Carousel>
  );
};

export default CarouselCTA;
