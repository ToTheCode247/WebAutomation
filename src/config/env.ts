const optionalUrl = (value: string | undefined, fallback: string): string => {
  const url = new URL(value || fallback);
  if (!['https:', 'http:'].includes(url.protocol)) {
    throw new Error('Only HTTP(S) base URLs are supported');
  }
  return url.toString();
};

export const env = Object.freeze({
  webBaseUrl: optionalUrl(process.env.WEB_BASE_URL, 'https://demo.playwright.dev/todomvc/'),
  apiBaseUrl: optionalUrl(process.env.API_BASE_URL, 'https://jsonplaceholder.typicode.com/')
});
