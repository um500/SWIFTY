// ============================================
// 📁 sanity/schemas/tour.ts
// ============================================

import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'tour',
  title: 'Tour',
  type: 'document',

  fields: [
    // ================= BASIC =================
    defineField({
      name: 'title',
      title: 'Tour Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'days',
      title: 'Days / Nights',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: 'shortDescription',
  title: 'Short Description',
  type: 'text',
  rows: 6,
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true;

      const words = value.trim().split(/\s+/).length;

      return words <= 200 || "Maximum 200 words allowed";
    }),
}),

    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),

    // ================= LOCATION =================
    defineField({
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'country'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'state',
      title: 'State / Destination',
      type: 'reference',
      to: [{type: 'state'}],
      options: {
        filter: ({document}) => {
          const countryId = (document as any)?.country?._ref

          if (!countryId) {
            return {filter: 'false'}
          }

          return {
            filter: 'country._ref == $countryId',
            params: {countryId},
          }
        },
      },
      hidden: ({document}) => !(document as any)?.country,
    }),

    defineField({
      name: 'areas',
      title: 'Select Areas',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'area'}],
          options: {
            filter: ({document}) => {
              const stateId = (document as any)?.state?._ref

              if (!stateId) {
                return {filter: 'false'}
              }

              return {
                filter: 'state._ref == $stateId',
                params: {stateId},
              }
            },
          },
        },
      ],
      hidden: ({document}) => !(document as any)?.state,
    }),

    // ================= CATEGORY =================
    defineField({
      name: 'categories',
      title: 'Special Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),

    defineField({
      name: 'customizedCategories',
      title: 'Customized Holiday Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'customizedCategory'}]}],
    }),

    // ================= IMAGES =================
    defineField({
      name: 'images',
      title: 'Tour Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.required().min(1),
    }),

    // ================= FLAGS =================
    defineField({
      name: 'featured',
      title: 'Featured Tour',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'sections',
      title: 'Show in Feature Sections',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Last Minute', value: 'last'},
              {title: 'Visa', value: 'visa'},
              {title: 'Customized', value: 'custom'},
            ],
          },
        },
      ],
    }),

    // ================= HIGHLIGHTS =================
    defineField({
      name: 'highlights',
      title: 'Tour Highlights',
      description:
        'Short bullet-style highlights shown at the top, e.g. Osaka Castle, Bullet Train ride',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // ================= ACCOMMODATIONS =================
    defineField({
      name: 'accommodations',
      title: 'Accommodation Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'city', title: 'City', type: 'string'}),
            defineField({name: 'country', title: 'Country', type: 'string'}),
            defineField({name: 'hotel', title: 'Hotel Name', type: 'string'}),
            defineField({
              name: 'checkIn',
              title: 'Check In Date',
              type: 'string',
              description: 'e.g. 04 Jun',
            }),
            defineField({
              name: 'checkOut',
              title: 'Check Out Date',
              type: 'string',
              description: 'e.g. 07 Jun',
            }),
          ],
          preview: {
            select: {
              city: 'city',
              hotel: 'hotel',
            },
            prepare({city, hotel}) {
              return {
                title: `${city || 'City'} — ${hotel || 'Hotel'}`,
              }
            },
          },
        },
      ],
    }),

    // ================= FLIGHTS =================
    defineField({
      name: 'flights',
      title: 'Flight Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'from', title: 'From', type: 'string'}),
            defineField({name: 'to', title: 'To', type: 'string'}),
            defineField({name: 'airline', title: 'Airline', type: 'string'}),
            defineField({name: 'flightNo', title: 'Flight No', type: 'string'}),
            defineField({name: 'departure', title: 'Departure', type: 'string'}),
            defineField({name: 'arrival', title: 'Arrival', type: 'string'}),
          ],
          preview: {
            select: {
              from: 'from',
              to: 'to',
            },
            prepare({from, to}) {
              return {
                title: `${from || 'From'} → ${to || 'To'}`,
              }
            },
          },
        },
      ],
    }),

    // ================= REPORTING =================
    defineField({
      name: 'reporting',
      title: 'Reporting & Dropping',
      type: 'object',
      fields: [
        defineField({
          name: 'guestType',
          title: 'Guest Type',
          type: 'string',
          initialValue: 'Scheduled Tour Guests',
        }),
        defineField({
          name: 'reportingPoint',
          title: 'Reporting Point',
          type: 'string',
        }),
        defineField({
          name: 'droppingPoint',
          title: 'Dropping Point',
          type: 'string',
        }),
      ],
    }),

    // ================= PDF =================
    defineField({
      name: 'pdf',
      title: 'Tour PDF',
      type: 'file',
      description: 'Upload the itinerary PDF for this tour',
      options: {
        accept: '.pdf',
      },
    }),

    // ================= ITINERARY =================
    defineField({
      name: 'itinerary',
      title: 'Itinerary',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'day',
              title: 'Day Number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),

            defineField({
              name: 'title',
              title: 'Day Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'description',
              title: 'Description',
              description:
                'Supports paragraphs, headings, bullet lists, numbered lists, bold and italic text.',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'Heading', value: 'h3'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Bold', value: 'strong'},
                      {title: 'Italic', value: 'em'},
                    ],
                    annotations: [],
                  },
                },
              ],
            }),

            defineField({
              name: 'highlights',
              title: 'Day Highlights',
              type: 'array',
              of: [{type: 'string'}],
            }),

            defineField({
              name: 'stay',
              title: 'Stay / Hotel / City',
              type: 'string',
            }),

            defineField({
              name: 'meals',
              title: 'Meals Included',
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Bed Tea', value: 'Bed Tea'},
                      {title: 'Breakfast', value: 'Breakfast'},
                      {title: 'Lunch', value: 'Lunch'},
                      {title: 'Evening Tea with Snacks', value: 'Evening Tea with Snacks'},
                      {title: 'Dinner', value: 'Dinner'},
                      {title: 'Welcome Dinner', value: 'Welcome Dinner'},
                    ],
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              day: 'day',
              title: 'title',
            },
            prepare({day, title}) {
              return {
                title: `Day ${day || ''}: ${title || 'Untitled'}`,
              }
            },
          },
        },
      ],
    }),

    // ================= INCLUSIONS / EXCLUSIONS =================
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'exclusions',
      title: 'Exclusions',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // ================= PREPARATION =================
    defineField({
      name: 'preparation',
      title: 'Preparation / Things to Carry',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // ================= CANCELLATION =================
    defineField({
      name: 'cancellation',
      title: 'Cancellation Policy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'days',
              title: 'Cancellation Period',
              type: 'string',
              description: 'e.g. 30 days or more before departure',
            }),
            defineField({
              name: 'amount',
              title: 'Charge / Deduction',
              type: 'string',
              description: 'e.g. 10% of tour cost or ₹5,000 per person',
            }),
          ],
          preview: {
            select: {
              days: 'days',
              amount: 'amount',
            },
            prepare({days, amount}) {
              return {
                title: days || 'Policy',
                subtitle: amount || '',
              }
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      state: 'state.name',
      country: 'country.name',
    },
    prepare({title, media, state, country}) {
      return {
        title,
        media,
        subtitle: `${state || 'No State'} • ${country || 'No Country'}`,
      }
    },
  },
})
