# Diff. News

The Diff. News is the real time updated news website from the Award-winning journalism: The Guardian. It consists of Homepage, Category pages, Article pages, Bookmark and Search page.

## Features

 - **Homepage**: Latest news content from all categories, and latest news from the top categories.
 - **Category**: Show news content based on its categories. There are 6 category pages namely: Sports, World, Culture, Lifestyle, Tech, Travel.
 - **Bookmark**: Users can add or remove news to the personal bookmark for reading later
 - **Sorting news**: News items can be sorting from the newest to oldest first.
 - **Live search**: Start searching for news when starts typing.
 - **Infinite scroll**: Scrolling page auto detection, and serve more news to the page
 - **Loading Spinner**: Handling UI when fetching news content.

## Showcases
- Fetching news content API from [The Guardian Open Platform API](https://open-platform.theguardian.com/).
- Fully use `react-bootstrap` to build the front-end.
- `LocalStorage` for managing bookmark data.
- `useContext` providing fetching news required configurations, sending the requests, and handling promises.
- Debouncing search input by `DebounceInput` package

## Setup
1. Add your The Guardian Open Platform `API KEY` in `config.ini.json` in ` ./src/`
2. Copy and rename the file to `config.json`

## Future improvement
- Add/Remove to bookmark from news thumbnail
- `useReducer` for managing httpState and loading state
- Exclude duplicated news on Homepage
