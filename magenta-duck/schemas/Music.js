export default {
    name: 'music',
    title: 'Music',
    type: 'document',
    fields: [
    //   {
    //     name: 'cover',
    //     title: 'Cover',
    //     type: 'image',
    //     options: {
    //       hotspot: true,
    //     }
    //   },
      {
        name: 'track',
        title: 'Track',
        type: 'file',
      },
       {
        name: 'thumbnail',
        title: 'Thumbnail',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
      {
        name: 'album',
        title: 'Album',
        type: 'string',
      },
      {
        name: 'albumslug',
        title: 'Album Slug',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
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
        name: 'artist',
        title: 'Artist',
        type: 'array',
        of: [{ type: 'reference',to:[{type: 'artists'}] }],
      },
      {
        name: 'duration',
        title: 'Duration',
        type: 'string',
      }
    ]
  }