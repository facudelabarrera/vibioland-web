import { defineField, defineType } from 'sanity'

export const pilar = defineType({
  name: 'pilar',
  title: 'Pilar del Decálogo',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Número',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(10).integer(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción breve',
      type: 'text',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Por número',
      name: 'numberAsc',
      by: [{ field: 'number', direction: 'asc' }],
    },
  ],
})
