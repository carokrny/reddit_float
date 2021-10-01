import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import CommentsPanel from './CommentsPanel';

const mockStore = configureMockStore({});

describe('<CommentsPanel /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {}, 
            comment: {
                comments: [],
            },
        });

        store.dispatch = jest.fn(() => Promise.resolve());

        component = renderer.create(
            <Provider store={store}>
                <CommentsPanel />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });
});

