import React from "react";
import ImageComponent from "../ImageComponent";
import RenderIf from "@/utils/RenderIf";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PropertyT } from "@/typings";
import { comunas } from "@/config/comunas";

interface PropertyGridProps {
  properties: PropertyT[];
  title?: string;
  currentPage?: number;
  totalPages?: number;
  basePath?: string;
  sortBy?: string;
  order?: string;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  title,
  currentPage,
  totalPages,
  basePath,
  sortBy,
  order,
}) => {
  const getPageUrl = (page: number) => {
    if (!basePath) return "#";

    const params = new URLSearchParams();

    // Add page if not page 1
    if (page !== 1) {
      params.set("page", page.toString());
    }

    // Preserve sort parameters if they exist
    if (sortBy && order) {
      params.set("sortBy", sortBy);
      params.set("order", order);
    }

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const renderPageNumbers = () => {
    if (!currentPage || !totalPages) return null;

    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 7;
    const sideItems = 2;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > sideItems + 2) {
        pages.push("ellipsis");
      }

      for (
        let i = Math.max(2, currentPage - sideItems);
        i <= Math.min(totalPages - 1, currentPage + sideItems);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - sideItems - 1) {
        pages.push("ellipsis");
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === "ellipsis") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      return (
        <PaginationItem key={page}>
          <PaginationLink
            href={getPageUrl(page)}
            isActive={page === currentPage}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {title && (
        <h2 className="text-3xl font-bold text-center mb-8 text-primario">
          {title}
        </h2>
      )}
      {properties.length === 0 ? (
        <h3 className="text-center text-primario">
          No se encontraron propiedades en esta comuna
        </h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.propertyId}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden group">
                <RenderIf
                  condition={property.imagesCollection.items.length > 1}
                >
                  <Carousel
                    className="w-full h-full"
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                  >
                    <CarouselContent className="-ml-0">
                      {property.imagesCollection.items.map((image, index) => (
                        <CarouselItem key={index} className="pl-0 w-full h-64">
                          <Link
                            href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}/${
                              comunas.comunas.find(
                                (comuna) =>
                                  comuna.name.toLowerCase() ===
                                  property.comuna.toLowerCase()
                              )?.slug || property.comuna.toLowerCase()
                            }/${property.propertyId}`}
                          >
                            <ImageComponent
                              src={image.url}
                              alt={`${property.address} - Imagen ${index + 1}`}
                              className="w-full h-full object-cover"
                              width={400}
                              height={300}
                            />
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-200  flex items-center justify-center place-items-center cursor-pointer" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-destacado/50 text-white border-0 lg:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-200  flex items-center justify-center place-items-center cursor-pointer" />
                  </Carousel>
                </RenderIf>

                <RenderIf
                  condition={property.imagesCollection.items.length === 1}
                >
                  <Link
                    href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}/${
                      comunas.comunas.find(
                        (comuna) =>
                          comuna.name.toLowerCase() ===
                          property.comuna.toLowerCase()
                      )?.slug || property.comuna.toLowerCase()
                    }/${property.propertyId}`}
                  >
                    <ImageComponent
                      src={property.imagesCollection.items[0].url}
                      alt={property.address}
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </Link>
                </RenderIf>

                {/* Image Count Badge */}
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {property.imagesCollection.items.length}
                </div>
              </div>

              {/* Property Content */}
              <Link
                href={`/administracion-de-activos/${property.transactionType.toLowerCase()}/${property.propertyType.toLowerCase()}/${
                  comunas.comunas.find(
                    (comuna) =>
                      comuna.name.toLowerCase() ===
                      property.comuna.toLowerCase()
                  )?.slug || property.comuna.toLowerCase()
                }/${property.propertyId}`}
                className="block p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 h-full"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <RenderIf condition={property.destacado}>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full bg-destacado text-white`}
                    >
                      Destacado
                    </span>
                  </RenderIf>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-suave text-primario capitalize">
                    {property.propertyType}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-suave text-primario capitalize">
                    {property.transactionType}
                  </span>
                </div>
                <p className="font-light ">
                  <span className="text-primario capitalize">
                    {property.propertyType}
                  </span>{" "}
                  en{" "}
                  <span className="text-primario capitalize">
                    {property.transactionType}
                  </span>
                </p>
                {/* Name */}
                <h3 className="text-xl font-extrabold text-primario mb-2 h-18">
                  {property.name},{" "}
                  <span className="text-primario capitalize">
                    {property.comuna}
                  </span>
                </h3>

                {/* Price */}
                <p className="text-2xl font-black text-destacado mb-2">
                  {property.priceCurrency}
                  {property.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </p>
                <p className="font-normal my-4">
                  {" "}
                  {property.bedrooms > 0 && property.bedrooms + " dormitorio"}
                  {property.bedrooms > 1 && "s"}
                  {property.bathrooms > 0 &&
                    " | " + property.bathrooms + " baño"}
                  {property.bathrooms > 1 && "s"}
                  {property.parking > 0 &&
                    " | " + property.parking + " estacionamiento"}
                  {property.storeroom > 0 &&
                    " | " + property.storeroom + " bodega"}
                </p>
                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-secundario mt-6 mb-0  mx-auto">
                  {/* Total Area */}
                  <div className="flex items-center gap-1">
                    <img
                      src="/logo-total-area.svg"
                      alt="Total Area"
                      className="w-10 h-10"
                    />
                    <span>{property.totalArea} m² totales</span>
                  </div>
                  {/* Usable Area */}
                  <div className="flex items-center gap-1">
                    <img
                      src="/logo-util-area.svg"
                      alt="Usable Area"
                      className="w-10 h-10"
                    />
                    <span>{property.usableArea} m² útiles</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {currentPage && totalPages && totalPages > 1 ? (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={getPageUrl(currentPage - 1)} />
              </PaginationItem>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={getPageUrl(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  );
};

export default PropertyGrid;
