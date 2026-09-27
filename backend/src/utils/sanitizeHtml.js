import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

const window = new JSDOM("").window;
const purify = DOMPurify(window);

export const sanitizeHtml = (html) => {
  return purify.sanitize(html);
};
