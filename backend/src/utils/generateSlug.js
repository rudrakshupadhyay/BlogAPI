import { prisma } from "../../lib/prisma.js";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(title) {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 2;

  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export default generateUniqueSlug;
