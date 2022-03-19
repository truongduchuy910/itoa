const { Select, Relationship } = require('@itoa/fields');
const { atTracking, byTracking } = require('@itoa/list-plugins');

const reaction = {
  active: true,
  fields: {
    emoji: {
      options: [
        { label: 'Thích', value: 'like' },
        { label: 'Tim', value: 'heart' },
        { label: 'Giận', value: 'angry' },
        { label: 'Ngạc nhiên', value: 'wow' },
        { label: 'Buồn', value: 'sad' },
      ],
      type: Select,
      isRequired: true,
    },
    interaction: {
      type: Relationship,
      ref: 'Interaction.reactions',
      many: false,
    },
  },
  labelField: '',
  access: true,
  hooks: {},
  cacheHint: {
    scope: 'PUBLIC',
    maxAge: 60 * 60, // 1 hour
  },
  plugins: [atTracking(), byTracking()],
};

module.exports = reaction;
