import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Post from './Post';

const mockStore = configureMockStore({});

describe('<Post /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {
                posts: [],
                postIndex: 0,
            }, 
            comment: {},
        });

        store.dispatch = jest.fn(() => Promise.resolve());

        component = renderer.create(
            <Provider store={store}>
                <Post />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });
});

