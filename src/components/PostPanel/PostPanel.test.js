import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import PostPanel from './PostPanel';

const mockStore = configureMockStore({});

describe('<PostPanel /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {
                posts: null,
                isSubredditLoading: false,
            }, 
            comment: {
                comments: [],
            },
        });

        component = renderer.create(
            <Provider store={store}>
                <PostPanel />
            </Provider>
        );
    })
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    describe('renders post or loading page', () => {
        it('renders a post', () => {
            expect(component.root.findByProps({className: "postContainer"})).toBeDefined();
            expect(component.root.findByProps({className: "buttonsContainer"})).toBeDefined();
        });
        
        it('renders loading page', () => {
            store = mockStore({
                subreddit: {
                    posts: null,
                    isSubredditLoading: true,
                }, 
                comment: {
                    comments: [],
                },
            });
            
            component = renderer.create(
                <Provider store={store}>
                    <PostPanel />
                </Provider>
            );
            const expectedPage = 'loading...';
            const actualPage = component.root.findByType('h2').children[0];
            expect(actualPage).toBe(expectedPage);
        })
    })
});