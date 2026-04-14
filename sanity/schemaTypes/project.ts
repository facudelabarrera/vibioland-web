import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Proyecto Vibio',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      description: 'Ej: "vibio.higuera"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'object',
      fields: [
        defineField({ name: 'town', title: 'Localidad', type: 'string' }),
        defineField({ name: 'province', title: 'Provincia', type: 'string' }),
        defineField({ name: 'region', title: 'Región', type: 'string' }),
      ],
    }),
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          { title: 'En marcha', value: 'en-marcha' },
          { title: 'Próximamente', value: 'proximamente' },
          { title: 'Completado', value: 'completado' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'object',
      fields: [
        defineField({ name: 'viviendas', title: 'Viviendas', type: 'number' }),
        defineField({ name: 'hectareas', title: 'Hectáreas', type: 'number' }),
        defineField({ name: 'familias', title: 'Familias', type: 'number' }),
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Pilares',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pilar' }] }],
      validation: (Rule) => Rule.unique().max(10),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
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
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [
        {
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
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
