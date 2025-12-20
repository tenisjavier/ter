import { fetchContentful } from "@/utils/fetchContentful";
import { GQL_CTA_SECTION_QUERY } from "@/gql/ctaSection";
import { GQL_BANNER_QUERY } from "@/gql/banner";
import { GQL_METATAGS_QUERY } from "@/gql/metaTags";
import { GQL_PAGE_COMPONENTS_QUERY } from "@/gql/pageComponents";
import { GQL_COLUMN_SECTION_QUERY } from "@/gql/columnSection";
import { GQL_ACCORDION_SECTION_QUERY } from "@/gql/accordionSection";
import { GQL_CAROUSEL_CTA_QUERY } from "@/gql/carousel";
import {
  GQL_PROPERTIES_QUERY,
  GQL_PROPERTIES_QUERY_BY_FILTERS,
  GQL_PROPERTIES_QUERY_BY_PROPERTY_ID,
} from "@/gql/properties";
import { PropertyT } from "@/typings";

const fetchPageComponents = async (pathname: string) => {
  const query = GQL_PAGE_COMPONENTS_QUERY();

  const variables = {
    pathname: pathname,
  };
  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch page components");
  }
  const terPageComponents = await res.json();

  const componentsToFetch =
    terPageComponents.data.terpageCollection.items[0].componentsCollection.items.map(
      (item: { sys: { id: string }; __typename: string }) => {
        return {
          id: item.sys?.id,
          __typename: item.__typename,
        };
      }
    );

  return componentsToFetch;
};

const fetchMetaTagsFromContentful = async (pathname: string) => {
  const query = GQL_METATAGS_QUERY(pathname);

  const variables = {
    pathname: pathname,
  };

  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    throw new Error("Failed to fetch page components");
  }

  const { data } = await res.json();

  const metaTags = data?.terpageCollection?.items?.[0];

  return {
    title: metaTags?.seoTitle || "",
    description: metaTags?.seoDescription || "",
    alternates: {
      canonical: `${process.env.BASE_URL}${pathname}` || "",
    },
  };
};

const fetchCTASectionById = async (id: string) => {
  const query = GQL_CTA_SECTION_QUERY();
  const variables = {
    id: id,
  };

  try {
    const res = await fetchContentful(query, variables);

    const { data } = await res.json();
    const ctaSection = data.ctaSection;
    return ctaSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchBannerById = async (id: string) => {
  const query = GQL_BANNER_QUERY();
  const variables = {
    id: id,
  };

  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    throw new Error("Failed to fetch banner");
  }

  const { data } = await res.json();

  const banner = data.banner;
  return banner;
};

const fetchColumnSectionById = async (id: string) => {
  const query = GQL_COLUMN_SECTION_QUERY();
  const variables = { id };

  try {
    const res = await fetchContentful(query, variables);
    const { data } = await res.json();
    let columnSection = data.columnSection;
    columnSection.columns = columnSection.columnsCollection.items;
    return columnSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchAccordionSectionById = async (id: string) => {
  const query = GQL_ACCORDION_SECTION_QUERY();
  const variables = { id };

  try {
    const res = await fetchContentful(query, variables);
    const { data } = await res.json();
    let accordionSection = data.accordionSection;
    accordionSection.items = accordionSection.itemsCollection.items;
    return accordionSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchCarouselCTAById = async (id: string) => {
  const query = GQL_CAROUSEL_CTA_QUERY();
  const variables = { id };

  const res = await fetchContentful(query, variables);
  if (!res.ok) {
    throw new Error("Failed to fetch carousel");
  }

  const { data } = await res.json();
  const carousel = data.carousel;
  return carousel;
};

const buildOrderBy = (sortBy?: string, order?: string) => {
  // Default order: destacado first, then by published date
  const defaultOrder = ["destacado_DESC", "sys_publishedAt_DESC"];

  // If sorting by price using priceSort field
  if (sortBy === "priceSort" && (order === "asc" || order === "desc")) {
    const orderDirection = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
    // Sort by priceSort first - prioritize price sorting over destacado when sorting by price
    // Use published date as secondary sort only for properties with same priceSort value
    return [`priceSort_${orderDirection}`, "sys_publishedAt_DESC"];
  }

  // Return default order if no valid sort specified
  return defaultOrder;
};

const fetchProperties = async (
  page?: number,
  sortBy?: string,
  order?: string
) => {
  const query = GQL_PROPERTIES_QUERY();
  const currentPage = page || 1;
  const limit = 21;
  const skip = (currentPage - 1) * limit;
  const orderBy = buildOrderBy(sortBy, order);

  const variables = {
    limit,
    skip,
    orderBy,
  };

  const res = await fetchContentful(query, variables);
  const { data } = await res.json();
  const properties = data.propertyCollection.items;
  const total = data.propertyCollection.total;
  return { properties, total };
};

const fetchPropertiesByFilters = async (
  transactionType: string,
  propertyType: string,
  comuna?: string,
  page?: number,
  sortBy?: string,
  order?: string
) => {
  const query = GQL_PROPERTIES_QUERY_BY_FILTERS();
  const currentPage = page || 1;
  const limit = 21;
  const skip = (currentPage - 1) * limit;
  const orderBy = buildOrderBy(sortBy, order);

  const variables: any = {
    transactionType: transactionType,
    propertyType: propertyType,
    limit,
    skip,
    orderBy,
  };

  if (comuna) {
    variables.comuna = comuna;
  }

  const res = await fetchContentful(query, variables);
  const { data } = await res.json();
  const properties = data.propertyCollection.items;
  const total = data.propertyCollection.total;
  return { properties, total };
};

const fetchPropertyByPropertyId = async (propertyId: string) => {
  const query = GQL_PROPERTIES_QUERY_BY_PROPERTY_ID();
  const variables = {
    propertyId: propertyId,
  };

  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    throw new Error("Failed to fetch property");
  }

  const { data } = await res.json();
  console.log(data);
  const property = data.propertyCollection.items[0];
  return property;
};
export {
  fetchCTASectionById,
  fetchBannerById,
  fetchMetaTagsFromContentful,
  fetchPageComponents,
  fetchColumnSectionById,
  fetchAccordionSectionById,
  fetchCarouselCTAById,
  fetchProperties,
  fetchPropertiesByFilters,
  fetchPropertyByPropertyId,
};
