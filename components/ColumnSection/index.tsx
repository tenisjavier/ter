import React from "react";
import Card from "@/components/Card";
import { ColumnSectionT } from "@/typings";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";
import ImageComponent from "@/components/ImageComponent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ColumnSection = (props: ColumnSectionT) => {
  const hasTerImage = props.terImage?.url;

  const contentSection = (
    <>
      <RenderIf condition={props.title}>
        <h2 className="text-left text-4xl w-full">
          {textHighlighter(props.title || "")}
        </h2>
      </RenderIf>
      <RenderIf condition={props.desc}>
        <p className="text-left text-lg w-full mt-6">{props.desc}</p>
      </RenderIf>
      <RenderIf condition={props.columns}>
        <RenderIf condition={props.isCarousel}>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full p-0 mb-8 relative justify-center items-center mt-12 lg:mt-0"
          >
            <div className={`w-full`}>
              <CarouselContent className="m-0 p-0 lg:px-2 lg:mt-24 ">
                {props.columns.map((col, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className={`p-0 m-0 ${
                        index !== 0 && "lg:ml-1"
                      } md:basis-1/2 ${
                        props.gridCols === "grid-cols-3" && "lg:basis-1/3"
                      } ${
                        props.gridCols === "grid-cols-4" && "lg:basis-1/4"
                      } place-items-center`}
                    >
                      <Card {...col} key={index}></Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </div>
            <CarouselPrevious className="bg-destacado active:bg-destacado active:text-white text-white mt-8 lg:mt-0  top-full lg:top-0 left-1/3 lg:left-9/10 w-10 h-10 rounded-full cursor-pointer" />
            <CarouselNext className="bg-destacado active:bg-destacado active:text-white text-white  mt-8  lg:mt-0 top-full  lg:top-0 right-1/3 lg:right-2 w-10 h-10 rounded-full cursor-pointer" />
          </Carousel>
        </RenderIf>
        <RenderIf condition={!props.isCarousel}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:${props.gridCols} gap-2 mt-12 w-full place-items-center`}
          >
            {props.columns.map((col, index) => {
              return <Card {...col} key={index}></Card>;
            })}
          </div>
        </RenderIf>
      </RenderIf>
    </>
  );

  return (
    <section
      className={`${props.bgColor} text-${props.textColor} py-12 px-4  flex  justify-center items-center`}
      id={props.name}
    >
      <div className=" flex flex-col flex-wrap justify-center items-center w-full">
        <RenderIf condition={hasTerImage}>
          {/* Layout with terImage: image on left, content on right (desktop) */}
          <div className="w-full container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Image on left (desktop) / top (mobile) */}
              <div className="w-full lg:w-2/5 flex-shrink-0">
                <ImageComponent
                  src={props.terImage?.url || ""}
                  alt={
                    props.terImage?.description || props.terImage?.title || ""
                  }
                  className="w-full h-auto object-cover rounded-lg"
                  width={props.terImage?.width || 800}
                  height={props.terImage?.height || 600}
                />
              </div>
              {/* Content on right (desktop) / bottom (mobile) */}
              <div className="w-full lg:w-3/5 flex flex-col">
                {contentSection}
              </div>
            </div>
          </div>
        </RenderIf>
        <RenderIf condition={!hasTerImage}>
          {/* Original layout without terImage */}
          <div className="w-full container mx-auto">{contentSection}</div>
        </RenderIf>

        {/* {
          <Pagination
            page={Number(pagination?.page)}
            limit={Number(pagination?.limit)}
            total={Number(pagination?.total)}
            anchorId={name}
          />
        } */}
      </div>
    </section>
  );
};

export default ColumnSection;
