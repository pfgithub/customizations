reddit styling adjustments to make it look better and act more like new.reddit (but without 1000 react rerenders when you hover over someone's username)

- works with res
- make sure to disable custom subreddit styles
- old.reddit.com
- single page app (clicking links to comments will keep you on the same page and you can go back and forwards in history)
- press escape to leave a comment page
- uses popstate when you exit a post (unlike new.reddit which just pushes a new history state)
- turns link buttons into link buttons without the context menu options (removes the href so options like "open in new tab" are no longer there)
- uses css grid
- collapse button is available on the entire height of the comment (like new.reddit), scrolls properly when you are halfway through a comment when collapsing (like top level comments on new.reddit but everywhere), and does not have the vote buttons covering the top of it

issues:

- many links that should be normal actually pushstate (user profile pages and subreddit sorting options)
- adds a horizontal scrollbar to the page with blank content

screenshots:

[![https://i.imgur.com/mSADVjR.png](https://i.imgur.com/mSADVjR.png)](https://i.imgur.com/mSADVjR.png)
[![https://i.imgur.com/0WLCGUX.png](https://i.imgur.com/0WLCGUX.png)](https://i.imgur.com/0WLCGUX.png)
