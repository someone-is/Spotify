export default {
    name: 'artists',
    title: 'Artists',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
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
        name: 'profile',
        title: 'Profile Photo',
        type: 'image',
        options: {
          hotspot: true,
        }
      },
    ]
  }