"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { comunas } from "@/config/comunas";

const PropertySearchFormHorizontal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [transactionType, setTransactionType] = useState("venta");
  const [propertyType, setPropertyType] = useState("departamento");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedComuna, setSelectedComuna] = useState<{
    slug: string;
    name: string;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<
    { slug: string; name: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const transactionTypes = [
    { value: "venta", label: "Venta" },
    { value: "arriendo", label: "Arriendo" },
  ];

  // Function to extract transaction type from URL path
  const getTransactionTypeFromPath = (path: string): string => {
    // URL pattern: /administracion-de-activos/{transactionType}/{propertyType}/...
    const pathSegments = path.split("/").filter((segment) => segment);

    // Check if we're in the administracion-de-activos section
    if (pathSegments[0] === "administracion-de-activos" && pathSegments[1]) {
      const extractedType = pathSegments[1];
      // Validate that it's a valid transaction type
      if (transactionTypes.some((type) => type.value === extractedType)) {
        return extractedType;
      }
    }

    return "venta"; // Default fallback
  };

  // Function to extract property type from URL path
  const getPropertyTypeFromPath = (path: string): string => {
    // URL pattern: /administracion-de-activos/{transactionType}/{propertyType}/...
    const pathSegments = path.split("/").filter((segment) => segment);

    // Check if we're in the administracion-de-activos section
    if (pathSegments[0] === "administracion-de-activos" && pathSegments[2]) {
      const extractedType = pathSegments[2];
      // Validate that it's a valid property type
      if (propertyTypes.some((type) => type.value === extractedType)) {
        return extractedType;
      }
    }

    return "departamento"; // Default fallback
  };

  const propertyTypes = [
    { value: "departamento", label: "Departamento" },
    { value: "casa", label: "Casa" },
    { value: "local", label: "Local" },
    { value: "terreno", label: "Terreno" },
    { value: "estacionamiento", label: "Estacionamiento" },
    { value: "oficina", label: "Oficina" },
  ];

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching with:", {
      transactionType,
      propertyType,
      searchLocation,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use the selected comuna slug if available, otherwise format the input
    let redirectPath;
    if (selectedComuna) {
      redirectPath = `/administracion-de-activos/${transactionType}/${propertyType}/${selectedComuna.slug}`;
    } else if (searchLocation.trim()) {
      // Fallback: format the input manually if no comuna was selected from suggestions
      const formattedComuna = searchLocation
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      redirectPath = `/administracion-de-activos/${transactionType}/${propertyType}/${formattedComuna}`;
    } else {
      redirectPath = `/administracion-de-activos/${transactionType}/${propertyType}`;
    }

    router.push(redirectPath);
  };

  // Filter suggestions based on input
  const filterSuggestions = (input: string) => {
    if (!input.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = comunas.comunas.filter((comuna) =>
      comuna.name.toLowerCase().startsWith(input.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
    setShowSuggestions(filtered.length > 0);
    setSelectedIndex(-1);
  };

  // Handle input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchLocation(value);
    filterSuggestions(value);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: {
    slug: string;
    name: string;
  }) => {
    setSearchLocation(suggestion.name);
    setSelectedComuna(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set transaction type based on current URL path
  useEffect(() => {
    const extractedTransactionType = getTransactionTypeFromPath(pathname);
    setTransactionType(extractedTransactionType);
  }, [pathname]);

  // Set property type based on current URL path
  useEffect(() => {
    const extractedPropertyType = getPropertyTypeFromPath(pathname);
    setPropertyType(extractedPropertyType);
  }, [pathname]);

  return (
    <section
      className={`relative py-8 px-4 flex flex-col items-center justify-center pt-20justify-center
      min-h-[44rem] w-full  overflow-hidden bg-primario bg-cover bg-center bg-no-repeat bg-[url('/hero-activos.jpg')]`}
    >
      <div>
        <h1 className="text-white text-5xl font-light mb-12">
          Buscar propiedades en{" "}
          <span className="font-bold underline decoration-destacado">
            arriendo
          </span>{" "}
          o{" "}
          <span className="font-bold underline decoration-destacado">
            venta
          </span>
        </h1>
      </div>
      <form
        action=""
        id="property-search-form"
        onSubmit={handleFormSubmit}
        className="w-full max-w-6xl mx-auto px-4"
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* Main form container */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col lg:flex-row items-starti lg:tems-center gap-4">
              {/* Transaction Type Dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  value={transactionType}
                  name="transactionType"
                  id="transactionType"
                  onChange={(e) => setTransactionType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {transactionTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-blue-600"
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

              {/* Property Type Dropdown */}
              <div className="relative flex-1 min-w-0">
                <select
                  value={propertyType}
                  name="propertyType"
                  id="propertyType"
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-blue-600"
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

              {/* Location Search Input */}
              <div className="relative flex-2 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  name="comuna"
                  id="comuna"
                  value={searchLocation}
                  onChange={handleLocationChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Ingresa comuna o ciudad"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                {/* Autocomplete Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.slug}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-3 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                          index === selectedIndex ? "bg-blue-100" : ""
                        }`}
                      >
                        {suggestion.name.charAt(0).toUpperCase() +
                          suggestion.name.slice(1)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Buttons */}
              <div className="flex gap-3 flex-shrink-0 items-center justify-center">
                <Button
                  type="submit"
                  className="text-lg bg-destacado hover:bg-destacado/90 text-white py-5 px-8 rounded-full whitespace-nowrap cursor-pointer"
                >
                  Buscar Propiedades
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PropertySearchFormHorizontal;
