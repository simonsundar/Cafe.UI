import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import App from '../components/App';
import responseObject from '../responseObject';
import { mapObjectToArray }from '../api';

/**
 * Helper function to force all the promises to resolve.
 * Needed when we must wait for a component to load
 * data on mount. Lifecycle methods will only run
 * when we use mount, not when we use shallow or render
 */
function flushAllPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

/**
 * Restore fetchMock after each test. Cleanup duty.
 */
afterEach(()=>{
  fetchMock.restore();
  fetchMock.reset();
})

/**
 * I am using a mocked copy of the response object instead of calling
 * the API. These test are only checking if the components renders as it
 * should, not checking if the API is being called. For this purpose
 * we do not need to call the API because that would require much more work
 */

it('populate list with cafe', () => {
  /* Mounts the whole app */
  const cafe = mapObjectToArray(responseObject.cafe);
  const wrapper = shallow(<App cafe={cafe} />);
  const list = wrapper.find('[data-test="list"]');
  expect(list.children()).toHaveLength(31);
})

it('first rate should be AUD', () => {
  const cafe = mapObjectToArray(responseObject.cafe);
  const wrapper = shallow(<App cafe={cafe} />);
  const list = wrapper.find('[data-test="list"]');
  const firstParagraph = list.find("p").first();
  expect(firstParagraph.text()).toContain("AUD");
})

it('should populate list with cafe from api', () => {
  fetchMock.get('https://api.fixer.io/latest?base=EUR', responseObject);
  const wrapper = mount(<App />);
  return flushAllPromises().
    then(() => {
      expect(wrapper.find('[data-test="list"]').text()).toContain("AUD");
    })
});

it('should be base EUR', () =>{
  const wrapper = shallow(<App />);
  expect(wrapper.find('h1').text()).toContain('EUR');
})

it.skip('should match snapshot', () => {
  const cafe = mapObjectToArray(responseObject.cafe);
  const wrapper = render(<App cafe={cafe} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
})