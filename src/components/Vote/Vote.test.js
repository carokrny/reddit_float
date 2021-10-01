import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import Vote from './Vote';

const mockStore = configureMockStore({});

describe('<Vote /> component', () => {
    let store;
    let component;
    beforeEach(() => {
        store = mockStore({
            subreddit: {}, 
            comment: {},
        });
    })
    
    it('renders without crashing', () => {
        component = renderer.create(
            <Provider store={store}>
                <Vote />
            </Provider>
        );
        expect(component).toBeDefined();
    });

    describe('formats up-votes', () => {
        it('formats a large up-vote count properly', () => {
            const ups = 2200;
            const expectedFormatedUps = '2.2k';
            component = renderer.create(
                <Provider store={store}>
                    <Vote ups={ups} />
                </Provider>
            );
            const resultUps = component.root.findByType('h5').children[0];
            expect(resultUps).toBe(expectedFormatedUps);
        });

        it('formats a small up-vote count properly', () => {
            const ups = 22;
            const expectedFormatedUps = '22';
            component = renderer.create(
                <Provider store={store}>
                    <Vote ups={ups} />
                </Provider>
            );
            const resultUps = component.root.findByType('h5').children[0];
            expect(resultUps).toBe(expectedFormatedUps);
        });
    }); 
});