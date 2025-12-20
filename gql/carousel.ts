export const GQL_CAROUSEL_CTA_QUERY = () => {
  return `
    fragment assetFields on Asset {
    title
    description
    url
    width
    height
  }
  query ($id: String!) {
    carousel(id:$id){
      name
      itemsCollection {
        items {
          name
      isHero
      title
      desc
      btnText
      btnLink
      bgColor
      textColor
      btnBgColor
      btnTextColor
      image {
        ...assetFields
      }
      mobileBgImage {
        ...assetFields
      }
      bgImage {
        ...assetFields
      }
      reverse
      mobileReverse
      brightness
      imageRounded
        }
      }
    }
  }`;
};
