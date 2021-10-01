import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import store from '../store/store';
import App from './App';
import CommentsPanel from '../components/CommentsPanel/CommentsPanel';

describe('<App /> component', () => {
  it('renders without crashing', () => {
    shallow(<Provider store={store}>
            <App />
          </Provider>)
  });

  describe('Properly displays CommentsPanel', () => {
    it('shows CommentsPanel when isCommentsShowing is true', () => {
      const mockStore = configureMockStore([]);
      const wrapper = shallow(<Provider store={mockStore({ isCommentsShowing: true })}>
              <App />
            </Provider>);
      expect(wrapper.contains(<CommentsPanel />));
    });

    it('does not show CommentsPanel when isCommentsShowing is false', () => {
      const mockStore = configureMockStore({ isCommentsShowing: false });
      const wrapper = shallow(<Provider store={mockStore()}>
              <App />
            </Provider>);
      expect(wrapper.not(<CommentsPanel />))
    });
  });
});
