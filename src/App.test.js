import React from 'react';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
    const wrapper = mount(<App />);
});

it('renders correct html components', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find('h1').text()).toEqual('Robot Play');
    expect(wrapper.find('.status')).toHaveLength(1);
    expect(wrapper.find('.status strong').at(0).text()).toEqual('0');
    expect(wrapper.find('.status strong').at(1).text()).toEqual('0');
    expect(wrapper.find('.tabletop__item')).toHaveLength(25);
    expect(wrapper.find('.avatar--robot')).toHaveLength(1);
    expect(wrapper.find('.avatar--crown')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(5);
    expect(wrapper.find('input')).toHaveLength(2);
});

it('calls correct functions after renders', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'calculateMovingDistance'); 
    jest.spyOn(instance, 'placeCrown'); 
    jest.spyOn(instance, 'generateRandomNumber');
    instance.componentDidMount();
    expect(instance.calculateMovingDistance).toHaveBeenCalled();
    expect(instance.placeCrown).toHaveBeenCalled();
    expect(instance.generateRandomNumber).toHaveBeenCalled();
});

it('moves robot after buttons click', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'handleMoveClick'); 
    jest.spyOn(instance, 'calculateNewPositions');
    expect(wrapper.state('currentPositionX')).toBe(0);
    expect(wrapper.state('currentPositionY')).toBe(0);
    expect(wrapper.state('moving')).toEqual(false);
    wrapper.find('.btn--down').simulate('click');
    expect(instance.handleMoveClick).toHaveBeenCalled();
    expect(instance.calculateNewPositions).toHaveBeenCalled();
    expect(wrapper.state('moving')).toEqual(true);
});

it('prevents robot from fallover when it is at the edge after button clicking', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state('currentPositionX')).toBe(0);
    expect(wrapper.state('currentPositionY')).toBe(0);
    expect(wrapper.state('moving')).toEqual(false);
    wrapper.find('.btn--up').simulate('click');
    expect(wrapper.state('moving')).toEqual(false);
    expect(wrapper.state('commandInvalidMessage')).toEqual("I am at the edge, can't move further!");
    wrapper.find('.btn--left').simulate('click');
    expect(wrapper.state('moving')).toEqual(false);
    expect(wrapper.state('commandInvalidMessage')).toEqual("I am at the edge, can't move further!");
});

it('resets robot position correctly', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state('currentPositionX')).toBe(0);
    expect(wrapper.state('currentPositionY')).toBe(0);
    wrapper.find('input').at(0).simulate('change', { target: { value: '3' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '4' }});
    expect(wrapper.state('resetPositionX')).toBe(3);
    expect(wrapper.state('resetPositionY')).toBe(4);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('currentPositionX')).toBe(3);
    expect(wrapper.state('currentPositionY')).toBe(4);
    wrapper.find('input').at(0).simulate('change', { target: { value: '0' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '0' }});
    expect(wrapper.state('resetPositionX')).toBe(0);
    expect(wrapper.state('resetPositionY')).toBe(0);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('currentPositionX')).toBe(0);
    expect(wrapper.state('currentPositionY')).toBe(0);
    wrapper.find('input').at(0).simulate('change', { target: { value: '4' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '4' }});
    expect(wrapper.state('resetPositionX')).toBe(4);
    expect(wrapper.state('resetPositionY')).toBe(4);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('currentPositionX')).toBe(4);
    expect(wrapper.state('currentPositionY')).toBe(4);
});

it('shows warnings to wrong position settings', () => {
    const wrapper = mount(<App />);
    wrapper.find('input').at(0).simulate('change', { target: { value: null }});
    wrapper.find('input').at(1).simulate('change', { target: { value: null }});
    expect(wrapper.state('resetPositionX')).toBe(false);
    expect(wrapper.state('resetPositionY')).toBe(false);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('commandInvalidMessage')).toEqual('Please enter position number(s).');
    wrapper.find('input').at(0).simulate('change', { target: { value: '0' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '0' }});
    expect(wrapper.state('resetPositionX')).toBe(0);
    expect(wrapper.state('resetPositionY')).toBe(0);
    wrapper.find('.btn--big').simulate('click'); 
    expect(wrapper.state('commandInvalidMessage')).toEqual('Same location!');
    wrapper.find('input').at(0).simulate('change', { target: { value: '8' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '0' }});
    expect(wrapper.state('resetPositionX')).toBe(8);
    expect(wrapper.state('resetPositionY')).toBe(0);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('commandInvalidMessage')).toEqual('Invalid command!');
    wrapper.find('input').at(0).simulate('change', { target: { value: '-1' }});
    wrapper.find('input').at(1).simulate('change', { target: { value: '6' }});
    expect(wrapper.state('resetPositionX')).toBe(-1);
    expect(wrapper.state('resetPositionY')).toBe(6);
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('commandInvalidMessage')).toEqual('Invalid command!');
});

it('shows happy message when robot is at the same location of crown', () => {
    const wrapper = mount(<App />);
    const crownPostionX = wrapper.state('crownPositionX');
    const crownPostionY = wrapper.state('crownPositionY');
    wrapper.find('input').at(0).simulate('change', { target: { value: crownPostionX }});
    wrapper.find('input').at(1).simulate('change', { target: { value: crownPostionY }});
    wrapper.find('.btn--big').simulate('click');
    expect(wrapper.state('happyMessage')).toEqual('Oh, there is a crown!');
});

