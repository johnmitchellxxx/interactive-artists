import { defineField, defineType } from 'sanity';

export const pressItem = defineType({
  name: 'pressItem',
  title: 'Press Item',
  type: 'document',
  fields: [
    defineField({
      name: 'publication',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quote',
      type: 'text',
    }),
    defineField({
      name: 'url',
      type: 'url',
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
  ],
});
