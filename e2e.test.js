import { waitForReact, ReactSelector, getReact } from 'testcafe-react-selectors';
//import { Selector } from 'testcafe';
//import {fireEvent} from '@testing-library/react'

fixture `Basic end-to-end UI test`
    .page `http://localhost:3000`
    .beforeEach(async () => {
        await waitForReact();
    })


test('Loads posts when user searches /r/popular', async t => {
    const inputField = ReactSelector('SearchBar').find('input');
    const nextButton = ReactSelector('NextButton');
    const postPanel = ReactSelector('PostPanel');

    await t 
        // go to /r/popular
        .typeText(inputField, 'popular')
        .pressKey('enter')

        // check that post panel has content
        .expect(postPanel.exists).ok()
        .expect(postPanel.find('h2').innerText).ok()
        .expect(postPanel.find('p').innerText).ok()

        // nextButton is not disabled when there are posts from a valid subreddit to view
        .expect(nextButton.hasAttribute('disabled')).eql(false); 
});

test('Can toggle view of <CommentsPanel /> when viewing a valid post', async t => {
    const inputField = ReactSelector('SearchBar').find('input');
    const viewCommentsButton = ReactSelector('ViewCommentsButton');

    await t 
        // go to /r/popular
        .typeText(inputField, 'popular')
        .pressKey('enter')

        // wait for comments to load
        .wait(10000)

        // click view comments to open comments panel
        .click(viewCommentsButton)
        .expect(ReactSelector('CommentsPanel').exists).ok()
        .expect(ReactSelector('Comment').exists).ok()
        .expect(ReactSelector('CommentsPanel').hasClass('open')).eql(true)

        //click view comments again to close comments panel
        .click(viewCommentsButton)
        .expect(ReactSelector('CommentsPanel').exists).notOk();
});

