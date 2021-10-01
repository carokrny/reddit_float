import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Comment from './Comment';

const mockStore = configureMockStore({});

describe('<Comment /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {}, 
            comment: {},
        });

        store.dispatch = jest.fn(() => Promise.resolve());

        const testComment = {
            author: 'test author',
            body_html: '&lt;div class=\"md\"&gt;&lt;p&gt;Test html body&lt;/p&gt;&lt;/div&gt;', 
            ups: 123, 
            replies: {
                data: {
                    children: [
                        {kind: 't1', data: {
                            author: 'test reply author',
                            body_html: '&lt;div class=\"md\"&gt;&lt;p&gt;Test html body reply&lt;/p&gt;&lt;/div&gt;', 
                            ups: 456, 
                        }}, 
                        {kind: 'more', data: {
                            other: 1234567
                        }}
                    ]
                }
            }
        }

        component = renderer.create(
            <Provider store={store}>
                <Comment comment={testComment} />
            </Provider>
        );
    });
    
    it('renders without crashing', () => {
        expect(component).toBeDefined();
    });

    describe ('toggling replies', () => {
        it('does not show replies initially', () => {
            const displayedDivs = component.root.findAllByType('div');
            const displayedClassNames = displayedDivs.map(element => element.props.className);
            expect(displayedClassNames.includes('replies')).toBe(false);
        }); 

        it('shows replies when toggled', () => {
            renderer.act(() => {
                component.root.findByType('button').props.onClick();
            });
            expect(component.root.findByProps({className: 'replies'})).toBeDefined();
        }); 
    });

    
});
