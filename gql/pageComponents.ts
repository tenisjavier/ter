export const pageComponentsFragment = `
  fragment bannerFields on Banner {
    __typename
    sys {
      id
    }
  }
    fragment ctaFields on CtaSection {
      __typename
      sys {
        id
      }
    }
    fragment columnFields on ColumnSection {
      __typename
      sys {
        id
      }
    }
    fragment accordionFields on AccordionSection {
      __typename
      sys {
        id
      }
    }
    fragment carouselFields on Carousel {
      __typename
      sys {
        id
      }
    }
`;

export const GQL_PAGE_COMPONENTS_QUERY = () => {
  return `
  ${pageComponentsFragment}

  query ($pathname: String!) {
    terpageCollection(where: {pathname :$pathname}) {
      items {
        componentsCollection(limit:15) {
          items {
            ...ctaFields
            ...bannerFields
            ...columnFields
            ...accordionFields
            ...carouselFields
          }
        }
      }
    }
  }`;
};
