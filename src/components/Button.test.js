import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

it('renders correct button label', () => {
  let wrapper = shallow(<Button label='text' />);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper.find('button').text()).toEqual('text');
});

it('renders correct class name', () => {
  let wrapper = shallow(<Button label='text' type='test' />);
  expect(wrapper.find('button').hasClass('btn--test')).toBeTruthy();
});