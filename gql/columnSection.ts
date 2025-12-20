export const GQL_COLUMN_SECTION_QUERY = () => {
  return `

  query ($id: String!) {
    columnSection(id:$id){
      name
      title
      desc
      bgColor
      textColor
      isCarousel
      gridCols
      columnsCollection {
        items {
          name
          title
          desc
          bgColor
          textColor
        icon {
            title
            url
            description
            width
            height
            sys {
              id
            }
          }
          image {
            title
            url
            description
            width
            height
            sys {
              id
            }
          }
          bgImage {
            title
            url
            description
            width
            height
            sys {
              id
            }
          }
          isImageFull
          imageRound
          btnBgColor
          btnTextColor
          btnText
          btnLink
          flipText
          customTextHeight
        }
      }
    }
  }`;
};
