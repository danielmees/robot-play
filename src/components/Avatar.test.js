import React from 'react';
import { shallow } from 'enzyme';
import Avatar from './Avatar';

it('renders correct type of icons', () => {
  const wrapper = shallow(<Avatar type='test' />);
  expect(wrapper.find('.avatar').hasClass('avatar--test')).toBeTruthy();
});

it('renders correct hidden class', () => {
  let wrapper = shallow(<Avatar type='test' hidden />);
  expect(wrapper.find('.avatar').hasClass('hidden')).toBeTruthy();
  wrapper = shallow(<Avatar type='test' />);
  expect(wrapper.find('.avatar').hasClass('hidden')).toBeFalsy();
});

it('renders correct responses', () => {
  let wrapper = shallow(<Avatar type='test' />);
  expect(wrapper.find('.avatar__response--sad')).toHaveLength(0);
  expect(wrapper.find('.avatar__response--happy')).toHaveLength(0);
  wrapper = shallow(<Avatar type='test' sadResponse='' happyResponse='' />);
  expect(wrapper.find('.avatar__response--sad')).toHaveLength(0);
  expect(wrapper.find('.avatar__response--happy')).toHaveLength(0);
  wrapper = shallow(<Avatar type='test' sadResponse='sad' />);
  expect(wrapper.find('.avatar__response--sad')).toHaveLength(1);
  expect(wrapper.find('.avatar__response--sad').text()).toEqual('sad');
  expect(wrapper.find('.avatar__response--happy')).toHaveLength(0);
  wrapper = shallow(<Avatar type='test' happyResponse='happy' />);
  expect(wrapper.find('.avatar__response--sad')).toHaveLength(0);
  expect(wrapper.find('.avatar__response--happy')).toHaveLength(1);
  expect(wrapper.find('.avatar__response--happy').text()).toEqual('happy');
  wrapper = shallow(<Avatar type='test' sadResponse='sad' happyResponse='happy' />);
  expect(wrapper.find('.avatar__response--sad')).toHaveLength(1);
  expect(wrapper.find('.avatar__response--happy')).toHaveLength(1);
  expect(wrapper.find('.avatar__response--sad').text()).toEqual('sad');
  expect(wrapper.find('.avatar__response--happy').text()).toEqual('happy');
});



