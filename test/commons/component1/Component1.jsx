import React from 'react';
import { shallow } from 'enzyme';
import Component1 from 'commonComponents/component1/Component1';

/**
 * Test Demo
 */
test('Component1 changes the text after click', () => {
    
    const checkbox = shallow(<Component1 labelOn="On" labelOff="Off" />);

    expect(checkbox.text()).toEqual('Off');
    // trigger event
    checkbox.find('input').simulate('change');

    expect(checkbox.text()).toEqual('On');
});