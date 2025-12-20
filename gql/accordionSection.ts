export const GQL_ACCORDION_SECTION_QUERY = () => {
  return `

  query ($id: String!) {
    accordionSection(id:$id){
      name
      title
      desc
      textColor
      bgColor
      itemsCollection {
        items {
          name
          title
          content
          bgColor
          textColor
        }
      }
    }
  }`;
};
