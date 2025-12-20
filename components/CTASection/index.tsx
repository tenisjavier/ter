import React from "react";
import { CTASectionT } from "@/typings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageComponent from "@/components/ImageComponent";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";

// this is a cta section component
const CTASection = (props: CTASectionT) => {
  const bgImageStyle = props.mobileBgImage
    ? `hidden !absolute z-0 h-full w-full lg:block object-cover ${props.brightness}`
    : `!absolute z-0 h-full w-full lg:block object-cover ${props.brightness}`;
  const mobileBgImageStyle = `!absolute z-0 h-full w-full lg:!hidden object-cover ${props.brightness}`;
  const imageStyle = `z-10 max-h-96 h-auto lg:max-h-110  'lg:w-96' mx-4  ${
    props.imageRounded && props.imageRounded
  } ${!props.isHero && (props.mobileReverse ? "mb-12" : "mt-12")} `;
  return (
    <section
      id={props.name}
      className={`relative py-8 px-4 flex flex-col lg:flex-row ${
        props.isHero ? "justify-center pt-20" : "min-h-[44rem] justify-center"
      } min-h-[44rem] w-full items-center overflow-hidden ${
        props.bgColor && props.bgColor
      }  `}
    >
      <div
        className={`container mx-auto  flex   w-full lg:flex-nowrap items-center justify-center ${
          props.isHero && "lg:pb-12 lg:items-start"
        } 
        ${props.image ? "lg:justify-between" : "lg:justify-start"} text-${
          props.textColor
        } ${
          props.reverse ? "lg:justify-end lg: items-end" : "lg:flex-row-reverse"
        } ${props.mobileReverse ? "flex-col" : "flex-col-reverse"} `}
      >
        {props.isHero
          ? props.image && (
              <ImageComponent
                src={props.image.url}
                alt={props.image.description}
                className={imageStyle}
                width={450}
                height={450}
                loading="eager"
                priority={true}
              />
            )
          : props.image && (
              <ImageComponent
                src={props.image.url}
                alt={props.image.description}
                className={imageStyle}
                width={450}
                height={450}
              />
            )}

        <div
          className={`${props.isHero ? "lg:w-5/6" : "lg:w-1/2"} text-${
            props.textColor
          } z-10`}
        >
          <RenderIf condition={props.title && props.isHero}>
            <h1
              className={`text-5xl  lg:text-7xl text-center lg:text-left mb-6 font-light leading-[1.2]`}
            >
              {textHighlighter(props.title || "")}
            </h1>
          </RenderIf>
          <RenderIf condition={props.title && !props.isHero}>
            <h2
              className={`text-4xl font-light lg:text-5xl mb-6 leading-[1.2] text-left ${
                props.reverse ? "lg:text-right" : "lg:text-left"
              }`}
            >
              {textHighlighter(props.title || "")}
            </h2>
          </RenderIf>
          <div
            className={`mb-10 text-lg ${
              props.isHero ? ` text-center` : `text-left`
            }`}
          >
            <RenderIf condition={props.desc}>
              <p className={`mb-10 text-lg text-justify `}>
                {textHighlighter(props.desc || "")}
              </p>
            </RenderIf>
          </div>

          <div className={`text-center lg:text-left`}>
            <RenderIf condition={props.btnLink && props.btnText}>
              <Button
                showArrow={true}
                size="lg"
                className={`text-lg ${props.btnBgColor && props.btnBgColor} ${
                  props.btnTextColor && "text-" + props.btnTextColor
                } p-0 my-2 btn-light text-lg lg:text-base py-6 pl-8 pr-0 rounded-full font-bold hover:text-white cursor-pointer w-fit`}
              >
                <Link href={props.btnLink || ""}>{props.btnText}</Link>
              </Button>
            </RenderIf>
          </div>
        </div>
      </div>

      {props.bgImage && (
        <ImageComponent
          src={props.bgImage?.url}
          alt={props.bgImage?.description}
          className={bgImageStyle}
          fill
          sizes="100vw"
        />
      )}

      {props.mobileBgImage && (
        <ImageComponent
          src={props.mobileBgImage?.url}
          alt={props.mobileBgImage?.description}
          className={mobileBgImageStyle}
          fill
        />
      )}

      {/* {(props.bgVideo || props.video) && (
        <video
          autoPlay
          muted
          loop
          id="myVideo"
          className="!absolute z-0  h-140 overflow-hidden lg:block"
        >
          <source
            src={props.bgVideo?.url || props.video?.url}
            type="video/mp4"
          ></source>
        </video>
      )} */}
    </section>
  );
};

export default CTASection;
