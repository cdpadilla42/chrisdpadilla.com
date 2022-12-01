---
title: Fonts and CLS
tags:
  - Tech
  - React
  - CSS
date: '2022-10-11T05:35:07.322Z'
---

Fonts are a tricky space when accounting for CLS. They have the potential to not ping the CLS score too harshly. Though, if multiple element sizings are based on a web font loading, then it can add up. A nav bar plus a hero header plus breadcrumbs plus subtitle plus author name, it can all contribute to a larger score.

Current solutions are primarily hack-y. There are a few worth experimenting with, and a few coming down the pipe

# Pure CSS Solution

The leading idea offered up is to use `font-display: optional`. This will not load web fonts if they don't load in time. A great SEO solution, but not an ideal design solution.

# CSS Font API

the CSS Font Loading API can be used to determine when the font has loaded, and then render the content to the page. `document.fonts.onloadingdone` will accept a call back where we can switch styles from hidden to `display: block`. In React, it could look something like this:

```jsx
const TextComponent = () => {
	const [fontLoaded, setFontLoaded] = useState(false)

	useEffect(() => {
		document.fonts.onloadingdone(() => setFontLoaded(true))
	})

	// fallback, render content after certain time elapsed
	useEffect(() => {
		setTimeout(() => setFontLoaded(true), 1000)
	})
	...

	return (
		<StyledTextComponent $fontLoaded={fontLoaded}>
			...
		</StyledTextComponent>
	)
}

const StyledTextComponent = styled.ul`
	display: ${props => props.$fontLoaded ? 'block' : 'none'};

	...

`;
```

This is not an ideal solution for main page content. It wouldn't be ideal to have the content missing when SEO bots crawl your site for content. This would work great for asides, however.

# Font Optimization

[This article](https://simonhearne.com/2021/layout-shifts-webfonts/#prevent-layout-shifts-with-font-display) shares some interesting ideas on optimizing fonts so that they load before CLS is accounted for. Though, for some use cases these are heavy handed solutions. They include:

- Hosting your fonts
- Converting font to modern .woff2 format if not already
- Caching fonts in a CDN
- In **the future** 🪐: using F-mods, a method for _matching_ the fallback font dimensions with the designed font

# Font Descriptions

In **the future** 🪐 we'll see font descriptions coming to CSS. A great overview is here on [Barry Pollard's Smashing Magazine Article](https://www.smashingmagazine.com/2021/05/reduce-font-loading-impact-css-descriptors/#a-better-solution-is-coming). The gist is that we'll have more control over adjusting the size of fonts as they're swapped out to mitigate the shifting that comes from a differently sized font.

It's almost there, but will still take some time to fully bake.
