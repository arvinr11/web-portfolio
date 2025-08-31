// Project Queries
export const projectQueries = {
  // Get all projects
  all: `*[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    "technologies": technologies[] {
      iconUrl
    },
    category,
    "featured": coalesce(featured, pinned, false),
    _createdAt,
    "images": images[] {
      "url": image.asset->url,
      alt,
      isMain
    }
  }`,

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
  all: `*[_type == "certificate"] {
    _id,
    "imageUrl": image.asset->url
  }`,

  // Get certificates by order (if needed later)
  byOrder: `*[_type == "certificate"] | order(_createdAt desc) {
    _id,
    "imageUrl": image.asset->url
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

// CV & Portfolio Queries
export const cvQueries = {
  // Get CV file
  cv: `*[_type == "cv"][0] {
    _id,
    "fileUrl": cvFile.asset->url,
    "fileName": cvFile.originalFilename
  }`
}

export const portfolioQueries = {
  // Get Portfolio file
  portfolio: `*[_type == "portfolio"][0] {
    _id,
    "fileUrl": portfolioFile.asset->url,
    "fileName": portfolioFile.originalFilename
  }`
}
