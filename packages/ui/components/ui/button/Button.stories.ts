import type { Meta, Story } from '@storybook-vue/nuxt';
import Button from './Button.vue';

// TODO: Update the stories for this component, this is a mock.

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story = args => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Hello Button',
};
