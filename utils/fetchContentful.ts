export const fetchContentful = async (
  query: string,
  variables?: Record<string, unknown>
) => {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;

  const apiUrl = `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/master`;
  const headerConfig = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return await fetch(apiUrl, {
    method: "POST",
    headers: headerConfig,
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
  });
};
