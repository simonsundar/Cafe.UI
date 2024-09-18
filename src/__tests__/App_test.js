import React from 'react';
import { shallow, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import App from '../components/App';
import responseObject from '../responseObject';
import { mapObjectToArray }from '../api';
 
/**
 * Restore fetchMock after each test. Cleanup duty.
 */
afterEach(()=>{
  fetchMock.restore();
  fetchMock.reset();
})

 
it('should have CAFE template', () =>{
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('CAFE EMPLOYEE');
})

it.skip('should match snapshot', () => {
  const cafe = mapObjectToArray(responseObject.cafe);
  const wrapper = render(<App cafe={cafe} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
})