export const GQL_PROPERTIES_QUERY = () => {
  return `
query Properties(
  $limit: Int
  $skip: Int
) {
  propertyCollection(
    limit: $limit
    skip: $skip
    order: [destacado_DESC, sys_publishedAt_DESC]
  ){
    total
    items{
      propertyId
      name
      imagesCollection{
        items{
          description
          height
          width
          title
          url
        }
      }
      destacado
      propertyType
      transactionType
      comuna
      address
      price
      priceCurrency
      totalArea
      usableArea
      bedrooms
      bathrooms
      parking
      storeroom
      orientation
      description
    }
  }
}`;
};

export const GQL_PROPERTIES_QUERY_BY_FILTERS = () => {
  return `
query Properties(
  $transactionType: String!
  $propertyType: String
  $comuna: String
  $limit: Int
  $skip: Int
  $orderBy: [PropertyOrder]
) {
  propertyCollection(
    where: {
      transactionType: $transactionType
      propertyType: $propertyType
      comuna: $comuna
    }
    limit: $limit
    skip: $skip
    order: $orderBy
  ) {
    total
    items {
      propertyId
      name
      imagesCollection {
        items {
          description
          height
          width
          title
          url
        }
      }
      destacado
      propertyType
      transactionType
      comuna
      address
      price
      priceCurrency
      priceSort
      totalArea
      usableArea
      bedrooms
      bathrooms
      parking
      storeroom
      orientation
      description
    }
  }
}`;
};

export const GQL_PROPERTIES_QUERY_BY_PROPERTY_ID = () => {
  return `
query PropertiesByPropertyId(
  $propertyId: String!
) {
  propertyCollection(
    where: {
      propertyId: $propertyId
    }
  ) {
    items {
      propertyId
      name
      imagesCollection {
        items {
          description
          height
          width
          title
          url
        }
      }
      destacado
      propertyType
      transactionType
      comuna
      address
      price
      priceCurrency
      priceSort
      totalArea
      usableArea
      bedrooms
      bathrooms
      parking
      storeroom
      orientation
      description
      mapa {
        description
        height
        width
        title
        url
      }
      highlights
      requirements
    }
  }
}`;
};
