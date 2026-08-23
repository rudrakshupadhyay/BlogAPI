if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

if (!import.meta.env.VITE_PAGE_LIMIT) {
  throw new Error("VITE_PAGE_LIMIT is not defined");
}

const configuration = {
  API_URL: import.meta.env.VITE_API_URL,
  PAGE_LIMIT: parseInt(import.meta.env.VITE_PAGE_LIMIT, 10),
};

export default configuration;