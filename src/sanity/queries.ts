/**
 * Centralized GROQ queries for all content types.
 * Import these in page frontmatter rather than writing inline GROQ strings.
 */

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  category,
  description,
  mainImage { asset->, hotspot, crop, alt }
}`;

export const teamQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  photo { asset->, hotspot, crop, alt }
}`;

export const pressQuery = `*[_type == "pressItem"] | order(date desc) {
  _id,
  publication,
  quote,
  url,
  date
}`;

export const logosQuery = `*[_type == "clientLogo"] | order(order asc) {
  _id,
  name,
  logo { asset->, alt }
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  description,
  videoUrl,
  mainImage { asset->, hotspot, crop, alt },
  gallery[] { asset->, hotspot, crop, alt }
}`;
