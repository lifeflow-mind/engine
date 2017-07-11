export default {
  title: 'document',
  description: 'represent a single document',
  type: 'object',
  version: 0,
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    title: {
      type: 'string',
    },
    tags: {
      type: 'array',
      uniqueItems: true,
      item: {
        type: 'string',
      },
    },
    content: {
      type: 'string',
    },
    modules: {
      type: 'array',
      item: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          content: {
            type: 'string',
          }
        }
      }
    },
  },
};
