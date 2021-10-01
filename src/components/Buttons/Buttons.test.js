import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import ViewCommentsButton from './ViewCommentsButton';

const mockStore = configureMockStore({});

describe('<NextButton /> component', () => {
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
                <NextButton />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    describe('Next button', () => {
        it('calls dispatch when button is clicked', () => {
            renderer.act(() => {
                component.root.findByType('button').props.onClick();
            });
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

    });
});

describe('<PrevButton /> component', () => {
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
                <PrevButton />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    describe('Prev button', () => {
        it('calls dispatch when button is clicked', () => {
            renderer.act(() => {
                component.root.findByType('button').props.onClick();
            });
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

    });
});

describe('<ViewCommentsButton /> component', () => {
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
                <ViewCommentsButton />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    describe('View comments button', () => {
        it('calls dispatch when button is clicked', () => {
            renderer.act(() => {
                component.root.findByType('button').props.onClick();
            });
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });

    });
});