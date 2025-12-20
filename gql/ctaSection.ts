export const GQL_CTA_SECTION_QUERY = () => {
  return `
    fragment assetFields on Asset {
    title
    description
    url
    width
    height
  }
  query($id: String!) {
    ctaSection(id:$id){
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
}`;
};
