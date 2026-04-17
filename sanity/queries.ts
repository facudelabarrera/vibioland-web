import { groq } from 'next-sanity'

export const projectsListQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    status,
    location,
    stats,
    featured,
    coverImage {
      ...,
      asset->
    }
  }
`

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    status,
    location,
    stats,
    featured,
    coverImage {
      ...,
      asset->
    },
    gallery[] {
      ...,
      asset->
    },
    pillars[]-> {
      _id,
      number,
      title,
      shortDescription,
      icon
    }
  }
`

export const featuredProjectQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(featured desc, _createdAt asc)[0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    status,
    location,
    coverImage {
      ...,
      asset->
    },
    gallery[] {
      ...,
      asset->
    }
  }
`

export const upcomingProjectsQuery = groq`
  *[_type == "project" && status == "proximamente" && defined(slug.current)] | order(name asc)[0...3] {
    _id,
    name,
    "slug": slug.current,
    location,
    coverImage {
      ...,
      asset->
    }
  }
`

export type FeaturedProject = ProjectDetail
export type UpcomingProject = Pick<
  ProjectListItem,
  '_id' | 'name' | 'slug' | 'location' | 'coverImage'
>

export const pilaresQuery = groq`
  *[_type == "pilar"] | order(number asc) {
    _id,
    number,
    title,
    shortDescription,
    icon,
    image {
      ...,
      asset->
    }
  }
`

export type ProjectListItem = {
  _id: string
  name: string
  slug: string
  tagline?: string
  description?: string
  status?: 'en-marcha' | 'proximamente' | 'completado'
  location?: { town?: string; province?: string; region?: string }
  stats?: { viviendas?: number; hectareas?: number; familias?: number }
  featured?: boolean
  coverImage?: { alt?: string; asset?: { url?: string } }
}

export type ProjectDetail = ProjectListItem & {
  gallery?: Array<{ alt?: string; asset?: { url?: string } }>
  pillars?: Array<{
    _id: string
    number: number
    title: string
    shortDescription?: string
    icon?: string
  }>
}

export type Pilar = {
  _id: string
  number: number
  title: string
  shortDescription?: string
  icon?: string
  image?: { alt?: string; asset?: { url?: string } }
}

export const STATUS_LABELS: Record<NonNullable<ProjectListItem['status']>, string> = {
  'en-marcha': 'En marcha',
  proximamente: 'Próximamente',
  completado: 'Completado',
}
