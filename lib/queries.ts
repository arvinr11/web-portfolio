// Project Queries
export const projectQueries = {
  // Get all projects
  all: `*[_type == "project"][0...5]`,

  // Get featured projects only
  featured: `*[_type == "project" && featured == true] | order(order asc, dateCreated desc) {
    _id,
    title,
    slug,
    description,
    technologies,
    "mainImage": images[isMain == true][0].image.asset->url,
    category
  }`,

  // Get project by slug
  bySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    technologies,
    "images": images[] {
      "url": image.asset->url,
      alt,
      isMain
    },
    githubUrl,
    featured,
    dateCreated,
    category,
    order
  }`,

  // Get projects by category
  byCategory: `*[_type == "project" && category == $category] | order(order asc, dateCreated desc) {
    _id,
    title,
    slug,
    description,
    technologies,
    "mainImage": images[isMain == true][0].image.asset->url,
    category
  }`
}

// Certificate Queries
export const certificateQueries = {
  // Get all certificates
  all: `*[_type == "certificate"]`,

  // Get certificates by year
  byYear: `*[_type == "certificate" && dateTime(dateIssued) >= dateTime($startDate) && dateTime(dateIssued) <= dateTime($endDate)] | order(dateIssued desc) {
    _id,
    title,
    issuer,
    dateIssued,
    "imageUrl": image.asset->url,
    credentialId
  }`
}

// Skill Queries
export const skillQueries = {
  // Get all skills
  all: `*[_type == "skill"]`,

  // Get skills by category
  byCategory: `*[_type == "skill" && category == $category] | order(order asc, name asc) {
    _id,
    name,
    iconUrl,
    level,
    order
  }`,

  // Get skills by level
  byLevel: `*[_type == "skill" && level == $level] | order(category asc, name asc) {
    _id,
    name,
    iconUrl,
    category,
    order
  }`
}
