import queryString from "query-string";

export const getLang = (context) => {
  let lang = getParam("lang") || "";
  if (typeof window === "undefined" && context) {
    lang = context.query?.lang || "";
  }

  return lang;
};

export const getParam = (name) => {
  if (typeof window !== "undefined") {
    const parsed = queryString.parse(location.search);

    return parsed[name];
  }

  return null;
};

export const generateLink = (url) => {
  return `${url}`;
};
