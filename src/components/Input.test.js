import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

it('renders correct input value', () => {
  let wrapper = shallow(<Input value={false} />);
  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').props().value).toEqual('');
  wrapper = shallow(<Input value={8} />);
  expect(wrapper.find('input').props().value).toEqual('8');
});
