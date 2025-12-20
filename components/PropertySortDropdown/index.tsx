"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PropertySortDropdownProps {
  sortBy?: string;
  order?: string;
}

const PropertySortDropdown: React.FC<PropertySortDropdownProps> = ({
  sortBy,
  order,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine the current selected value
  const getCurrentValue = () => {
    if (sortBy === "priceSort" && order === "asc") {
      return "asc";
    }
    if (sortBy === "priceSort" && order === "desc") {
      return "desc";
    }
    return "";
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value === "") {
      // Remove sort parameters if "default" is selected
      params.delete("sortBy");
      params.delete("order");
    } else {
      // Set sort parameters
      params.set("sortBy", "priceSort");
      params.set("order", value);
    }

    // Reset to page 1 when sorting changes
    params.delete("page");

    // Update URL
    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newUrl);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 flex justify-end items-center gap-3">
      <span className="text-gray-700 font-medium">Ordenar por</span>
      <div className="relative">
        <select
          value={getCurrentValue()}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 cursor-pointer"
        >
          <option value="">Seleccionar</option>
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PropertySortDropdown;



