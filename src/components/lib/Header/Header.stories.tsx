import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';


import { Header, HeaderProps } from './Header';

export default {
  title: 'lib/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (props: HeaderProps) => (
  <Header {...props} />
);

export const Calculators = Template.bind({});
Calculators.args = {
  
  text: ['Calculators', 'Number Base Conversion'],
};
