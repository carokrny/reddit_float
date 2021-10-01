import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import SearchBar from './SearchBar';

const mockStore = configureMockStore({});

describe('<SearchBar /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {}, 
            comment: {},
        });

        store.dispatch = jest.fn(() => Promise.resolve());

        component = renderer.create(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    it('renders logo img', () => {
        expect(component.root.findByType('img')).toBeDefined();
    });

    describe('Search button', () => {
        it('renders logo img', () => {
            expect(component.root.findByType('button')).toBeDefined();
        });

        it('calls dispatch when button is clicked', () => {
            renderer.act(() => {
                component.root.findByType('button').props.onClick();
            });
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

    });

    describe('Key events', () => {
        it('calls dispatch when enter key is pressed', () => {
            renderer.act(() => {
                component.root.findByType('input').props.onKeyDown({ 'keyCode': 13 });
            });
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

        it('does not call dispatch when key other than enter key is pressed', () => {
            renderer.act(() => {
                component.root.findByType('input').props.onKeyDown({ 'keyCode': 39 });
            });
            expect(store.dispatch).toHaveBeenCalledTimes(0);
        });
    });    
});

