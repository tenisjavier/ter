import React from "react";
import { AccordionSectionT } from "@/typings";
import RenderIf from "@/utils/RenderIf";
import { textHighlighter } from "@/utils/TextHighlighter";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const AccordionSection = (props: AccordionSectionT) => {
  return (
    <section
      className={`${props.bgColor} text-${props.textColor} py-12 px-4 `}
      id={props.name}
    >
      <div className=" flex flex-col flex-wrap justify-center items-center  w-full">
        <div className="w-full container">
          <RenderIf condition={props.title}>
            <h2 className="text-left text-4xl w-full">
              {textHighlighter(props.title || "")}
            </h2>
          </RenderIf>
          <RenderIf condition={props.desc}>
            <p className="text-justify text-lg w-full my-6">{props.desc}</p>
          </RenderIf>

          <RenderIf condition={props.items}>
            <Accordion type="single" collapsible className="w-full my-12">
              {props.items.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={item.name}
                    className={`py-4 px-8 text-${props.textColor} ${
                      item.bgColor && item.bgColor
                    } rounded-3xl mt-4 border-0 cursor-pointer `}
                  >
                    <AccordionTrigger className="text-left text-xl lg:text-2xl w-full font-bold hover:no-underline cursor-pointer">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-left text-lg font-light w-full">
                      {textHighlighter(item.content || "")}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </RenderIf>
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
