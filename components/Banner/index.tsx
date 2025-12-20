import React from "react";
import { Button } from "@/components/ui/button";
import { BannerT } from "@/typings";
import Link from "next/link";
import RenderIf from "@/utils/RenderIf";
import ImageComponent from "@/components/ImageComponent";
import { textHighlighter } from "@/utils/TextHighlighter";

const Banner = (props: BannerT) => {
  return (
    <section
      className={`${props.bgColor && props.bgColor} text-${
        props.textColor
      } py-8 relative min-h-64`}
      id={props.name}
    >
      {props.bgImage && (
        <ImageComponent
          src={props.bgImage?.url}
          alt={props.bgImage?.description}
          className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0"
          fill
          sizes="100vw"
        />
      )}
      <div
        className={`container py-8 px-4 mx-auto w-full relative z-10 text-${props.textColor} `}
      >
        <div
          className={`flex lg:${props.textAlign} items-center justify-center flex-col w-full min-h-48`}
        >
          <RenderIf condition={props.title}>
            <h2 className={` text-3xl lg:text-4xl  font-light   mb-4`}>
              {textHighlighter(props.title || "")}
            </h2>
          </RenderIf>

          {props.desc && (
            <p className="text-lg lg:text-center ">{props.desc}</p>
          )}

          <RenderIf condition={props.btnLink && props.btnText}>
            <Button
              size="lg"
              className={`text-lg ${props.btnBgColor && props.btnBgColor} ${
                props.btnTextColor && props.btnTextColor
              }  p-0 my-8 btn-light text-lg lg:text-base py-6 px-8  cursor-pointer rounded-full font-bold hover:text-white hover:bg-destacado w-fit `}
            >
              <Link href={props.btnLink || ""}>{props.btnText}</Link>
            </Button>
          </RenderIf>
        </div>
      </div>
    </section>
  );
};

export default Banner;
