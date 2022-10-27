export default {
  name: 'songs',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
     {
      name: 'song',
      title: 'Song',
      type: 'array',
      of: [{ type: 'reference',to:[{type: 'music'}] }],
    },
    {
      name: 'album',
      title: 'Album',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'album',
        maxLength: 90,
      }
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'artists',
      title: 'Artists',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }

  ]
}