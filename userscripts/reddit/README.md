old.reddit adjustments to make it more like new.reddit

# to use:

- disable subreddit custom stylesheets
- install tampermonkey or something
- [add the userscript](https://github.com/pfgithub/customizations/raw/master/userscripts/reddit/userscript.user.js)
- add the optional but recommended [stylesheet.css](https://raw.githubusercontent.com/pfgithub/customizations/master/userscripts/reddit/stylesheet.css) somehow glhf

# adds:

## duplicate viewing functionality

view the same post in other subreddits, like new.reddit

![sidebar section showing duplicates](https://user-images.githubusercontent.com/6010774/101238514-a6b77500-3695-11eb-8874-797e8f969207.png)

## full height comment collapse buttons

click anywhere on the left of a comment to collapse it, like new.reddit but even better

![screenshot of that](https://user-images.githubusercontent.com/6010774/101238612-2e9d7f00-3696-11eb-9b27-a6690b4c2566.png)

better than new.reddit because:

- no lag when collapsing a comment
- scroll will always end up in the right place, unlike new.reddit where scroll only ends up in the right place if you collapse a top level comment

## no more "open link in new tab" for save/report/…

![image](https://user-images.githubusercontent.com/6010774/101238619-3c530480-3696-11eb-9c54-67563404e280.png)

## \[disabled] single page app functionality

this was implemented with iframes and caused issues because the inner frame could not authenticate requests, and I'm not sure why

clicking comments links would open an iframe. you could press escape or click out to close it.

unlike new.reddit, this correctly popped the state when you exited a post, rather than pushing a new state

issues:

- many links that should be normal actually pushstate (user profile pages and subreddit sorting options)
- doesn't let requests through because of some iframe issue
- buggy with back and forwards button occasionally


# works with:

- darkreader
- maybe res

# (optional, recommended) stylesheet.css

some reddit styling adjustments

- shadows
- centered content like new.reddit

supports

- darkreader
- res probably
