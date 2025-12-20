"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ImageComponent from "../ImageComponent";
import { PropertyT } from "@/typings";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import RenderIf from "@/utils/RenderIf/";
import { comunas } from "@/config/comunas";
import { Button } from "@/components/ui/button";
import { textHighlighter } from "@/utils/TextHighlighter";

import dynamic from "next/dynamic";
const OwloChat = dynamic(() => import("@/components/OwloChat"), { ssr: false });

interface PropertyDetailProps {
  property: PropertyT;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if device is desktop
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isTheaterMode) return;

      switch (event.key) {
        case "Escape":
          setIsTheaterMode(false);
          break;
        case "ArrowLeft":
          event.preventDefault();
          setCurrentImageIndex((prev) =>
            prev === 0 ? property.imagesCollection.items.length - 1 : prev - 1
          );
          break;
        case "ArrowRight":
          event.preventDefault();
          setCurrentImageIndex((prev) =>
            prev === property.imagesCollection.items.length - 1 ? 0 : prev + 1
          );
          break;
      }
    };

    if (isTheaterMode) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isTheaterMode, property.imagesCollection.items.length]);

  const openTheaterMode = (imageIndex: number, event?: React.MouseEvent) => {
    if (isDesktop) {
      // Check if the click was on a carousel arrow button
      if (event) {
        const target = event.target as HTMLElement;
        const isCarouselArrow =
          target.closest('[data-slot="carousel-previous"]') ||
          target.closest('[data-slot="carousel-next"]');
        if (isCarouselArrow) {
          return; // Don't open theater mode if clicking on carousel arrows
        }
      }
      setCurrentImageIndex(imageIndex);
      setIsTheaterMode(true);
    }
  };

  const closeTheaterMode = () => {
    setIsTheaterMode(false);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.imagesCollection.items.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === property.imagesCollection.items.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="min-h-screen bg-white mt-12">
      <div className="fixed top-0 left-0 w-full h-18 bg-primario z-40" />
      <div className="max-w-7xl container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="my-6 z-40">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/administracion-de-activos"
                className="hover:text-destacado"
              >
                Activos
              </Link>
            </li>
            <li>/</li>
            <li>
              {property.transactionType.charAt(0).toUpperCase() +
                property.transactionType.slice(1)}
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}`}
                className="hover:text-destacado"
              >
                {property.propertyType.charAt(0).toUpperCase() +
                  property.propertyType.slice(1)}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}/${
                  comunas.comunas.find(
                    (comuna) =>
                      comuna.name.toLowerCase() ===
                      property.comuna.toLowerCase()
                  )?.slug || property.comuna.toLowerCase()
                }`}
                className="hover:text-destacado"
              >
                {property.comuna}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Images */}
          <div className="space-y-4">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <RenderIf condition={property.imagesCollection.items.length > 1}>
                <Carousel
                  className="w-full h-full"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-0">
                    {property.imagesCollection.items.map((image, index) => (
                      <CarouselItem key={index} className="pl-0 w-full h-96">
                        <div
                          className="w-full h-full cursor-pointer"
                          onClick={(e) => openTheaterMode(index, e)}
                        >
                          <ImageComponent
                            src={image.url}
                            alt={`${property.address} - Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                            width={1200}
                            height={800}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 opacity-100 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center place-items-center cursor-pointer z-10" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 opacity-100 hover:opacity-80 transition-opacity duration-200 flex items-center justify-center place-items-center cursor-pointer z-10" />
                </Carousel>
              </RenderIf>
              <RenderIf
                condition={property.imagesCollection.items.length === 1}
              >
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={(e) => openTheaterMode(0, e)}
                >
                  <ImageComponent
                    src={property.imagesCollection.items[0].url}
                    alt={`${property.address} - Imagen principal`}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
                  />
                </div>
              </RenderIf>
            </div>

            {/* Thumbnail Gallery */}
            <RenderIf condition={property.imagesCollection.items.length > 1}>
              <div className="grid grid-cols-4 gap-2">
                {property.imagesCollection.items
                  .slice(0, 16)
                  .map((image, index) => (
                    <div
                      key={index}
                      className="relative h-20 overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      onClick={() => openTheaterMode(index)}
                    >
                      <ImageComponent
                        src={image.url}
                        alt={`${property.address} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        width={100}
                        height={80}
                      />
                    </div>
                  ))}
                {property.imagesCollection.items.length > 16 && (
                  <div className="relative h-20 overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      +{property.imagesCollection.items.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </RenderIf>
          </div>

          {/* Property Information */}
          <div className="space-y-6 lg:ml-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              <RenderIf condition={property.destacado}>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-destacado text-white">
                  Destacado
                </span>
              </RenderIf>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario capitalize">
                {property.propertyType}
              </span>
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-suave text-primario capitalize">
                {property.transactionType}
              </span>
            </div>

            {/* Location */}
            <div>
              <p className="font-light text-xl my-2">
                {property.propertyType} en {property.transactionType}
              </p>
              <h1 className="text-3xl font-extrabold text-primario mb-2">
                {property.name},{" "}
                <span className="text-primario capitalize">
                  {property.comuna}
                </span>
              </h1>
            </div>

            {/* Price */}
            <div className=" ">
              <p className="text-5xl font-black text-destacado">
                {property.priceCurrency}{" "}
                {property.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                <span className="text-lg text-destacado  font-light">
                  {property.transactionType === "arriendo"
                    ? "*Mensual"
                    : "*Precio de venta"}
                </span>
              </p>
            </div>

            {/* Property Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-primario mb-4">
                Características
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <RenderIf condition={property.bedrooms}>
                  {/* Bedrooms */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <img
                        src="/logo-dormitorio.svg"
                        alt="Bedrooms"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex text-primario font-normal">
                      <p className=" mr-1">{property.bedrooms}</p>
                      <p>dormitorios</p>
                    </div>
                  </div>
                </RenderIf>

                {/* Bathrooms */}
                <RenderIf condition={property.bathrooms}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <img
                        src="/logo-bano.svg"
                        alt="Bathrooms"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex text-primario font-normal">
                      <p className=" mr-1">{property.bathrooms}</p>
                      <p>baños</p>
                    </div>
                  </div>
                </RenderIf>
                {/* Parking */}
                <RenderIf condition={property.parking}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <img
                        src="/logo-estacionamiento.svg"
                        alt="Parking"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex text-primario font-normal">
                      <p className=" mr-1">{property.parking}</p>
                      <p>estacionamiento</p>
                    </div>
                  </div>
                </RenderIf>
                {/* Storeroom */}
                <RenderIf condition={property.storeroom}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <img
                        src="/logo-bodega.svg"
                        alt="Storeroom"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex text-primario font-normal">
                      <p className=" mr-1">{property.storeroom}</p>

                      <p>bodega</p>
                    </div>
                  </div>
                </RenderIf>
                {/* Orientation */}
                <RenderIf condition={property.orientation}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8  rounded-full flex items-center justify-center">
                      <img
                        src="/logo-orientacion.svg"
                        alt="Orientation"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex text-primario font-normal">
                      <p>orientación {property.orientation}</p>
                    </div>
                  </div>
                </RenderIf>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 ">
                {/* Total Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center">
                    <img
                      src="/logo-total-area.svg"
                      alt="Total Area"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Área Total</p>
                    <p className="font-semibold text-primario">
                      {property.totalArea} m²
                    </p>
                  </div>
                </div>

                {/* Usable Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8  rounded-full flex items-center justify-center">
                    <img
                      src="/logo-util-area.svg"
                      alt="Usable Area"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Área Útil</p>
                    <p className="font-semibold text-primario">
                      {property.usableArea} m²
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact CTA */}
            <div className="bg-primario p-6 rounded-lg text-white text-center">
              <h3 className="text-2xl font-semibold mb-2 ">
                ¿Te interesa esta propiedad?
              </h3>
              <p className="mb-4">
                Contáctanos para más información o agendar una visita.
              </p>
              <Button
                size="lg"
                showArrow={true}
                className={`text-lg bg-destacado text-white  mt-8 mb-4 btn-light cursor-pointer lg:text-base py-6 pl-8 pr-2 rounded-full font-bold hover:text-white hover:bg-destacado w-fit `}
              >
                <Link
                  href={
                    "/administracion-de-activos/cotizar?propertyId=" +
                    property.propertyId +
                    "&propertyAddress=" +
                    property.address +
                    "&propertyComuna=" +
                    property.comuna +
                    "&propertyType=" +
                    property.propertyType +
                    "&transactionType=" +
                    property.transactionType
                  }
                >
                  Cotizar
                </Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Requirements */}
        <RenderIf
          condition={
            property.requirements &&
            property.requirements.length > 0 &&
            property.transactionType !== "venta"
          }
        >
          <div className="bg-white py-6 border-t-2 border-0 w-full mt-12 text-primario">
            <h2 className="text-2xl font-semibold mb-6">Requisitos</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {property.requirements?.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0">
                    <img
                      src="/bullet-point.svg"
                      alt="Bullet point"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-primario font-normal">
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RenderIf>
        {/* Description */}
        <RenderIf condition={property.description}>
          <div className="bg-white py-6   border-t-2 border-0 w-full mt-12">
            <h3 className="text-2xl font-semibold text-primario mb-4">
              Descripción
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {textHighlighter(property.description || "")}
            </p>
          </div>
        </RenderIf>

        {/* Comodidades y equipamientos */}
        <RenderIf
          condition={property.highlights && property.highlights.length > 0}
        >
          <div className="bg-white py-6 border-t-2 border-0 w-full mt-12 text-primario">
            <h2 className="text-2xl font-semibold mb-6">
              Comodidades y equipamientos
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {property.highlights?.map((highlight, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0">
                    <img
                      src="/bullet-point.svg"
                      alt="Bullet point"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-primario font-normal">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </RenderIf>
        {/* Ubicación */}
        <RenderIf condition={property.mapa}>
          <div className="bg-white py-6 border-t-2 border-0 w-full mt-12  text-primario">
            <h3 className="text-2xl font-semibold mb-4">Ubicación</h3>
            <p className=" leading-relaxed mb-4">{property.address}</p>
            <ImageComponent
              src={property?.mapa?.url || ""}
              alt={property?.mapa?.description || ""}
              className="w-full lg:w-4/5   h-full object-cover text-center mx-auto"
              width={1200}
              height={800}
            />
          </div>
        </RenderIf>
        {/* Requirements */}
        <RenderIf
          condition={
            property.requirements &&
            property.requirements.length > 0 &&
            property.transactionType === "venta"
          }
        >
          <div className="bg-white py-6 border-t-2 border-0 w-full mt-12 text-primario">
            <h2 className="text-2xl font-semibold mb-6">Requisitos</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {property.requirements?.map((requirement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 flex-shrink-0">
                    <img
                      src="/bullet-point.svg"
                      alt="Bullet point"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-primario font-normal">
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RenderIf>
      </div>

      {/* Theater Mode Overlay */}
      {isTheaterMode && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeTheaterMode}
            className="cursor-pointer absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
            aria-label="Cerrar vista de teatro"
          >
            ✕
          </button>

          {/* Navigation Arrows */}
          {property.imagesCollection.items.length > 1 && (
            <>
              <button
                onClick={() => navigateImage("prev")}
                className="bg-destacado flex place-items-center justify-center pb-2 m-0  rounded-full cursor-pointer w-10 h-10 absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button
                onClick={() => navigateImage("next")}
                className="bg-destacado flex place-items-center justify-center pb-2 m-0 rounded-full cursor-pointer w-10 h-10 absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8">
            <ImageComponent
              src={property.imagesCollection.items[currentImageIndex].url}
              alt={`${property.address} - Imagen ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              width={1200}
              height={800}
            />
          </div>

          {/* Image Counter */}
          {property.imagesCollection.items.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {property.imagesCollection.items.length}
            </div>
          )}

          {/* Thumbnail Strip */}
          {property.imagesCollection.items.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-4xl overflow-x-auto px-4">
              {property.imagesCollection.items.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-12 overflow-hidden rounded-lg flex-shrink-0 transition-opacity duration-200 ${
                    index === currentImageIndex
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-60 hover:opacity-80"
                  }`}
                >
                  <ImageComponent
                    src={image.url}
                    alt={`${property.address} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={64}
                    height={48}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <OwloChat
        partnerId=" jx770bhcea7qnh1fq61edx652h79sxfq"
        spaceId="k57a7w5bbqac8fgk905ycpsds979sr5r"
        title="Chat FR Group"
      />
    </div>
  );
};

export default PropertyDetail;
