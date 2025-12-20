export const GQL_BANNER_QUERY = () => {
  return `
  fragment assetFields on Asset {
    title
    description
    url
    width
    height
  }
  query($id: String!) {
    banner(id:$id){
      name
      title
      desc
      btnText
      btnLink
      bgColor
      textColor
      btnBgColor
      btnTextColor
      bgImage {
        ...assetFields
      }
      mobileBgImage {
        ...assetFields
      }
      textAlign
}
}`;
};
