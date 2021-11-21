# fliptrips

Based on ["eleventy-high-performance-blog"](https://github.com/google/eleventy-high-performance-blog)

# Generate content

OPENAI_API_KEY="..." npm run generate-content

## Other options: Hugo

https://github.com/lxndrblz/anatole/
https://github.com/hiplon/lighthouse100-theme

## Build and deploy

https://www.justus.ws/tech/deploying-eleventy-to-github-pages/


## Content sources

Pictures:

https://www.pexels.com/photo/person-standing-on-dirt-surrounded-by-coconut-trees-1005417/

Generate text from GPT-2/GPT-3/BERT?

## Automation

* Generate new blog posts every few days
* Supply list of GPT-3 feeders
* Inject free stock photos

A starter repository for building a blog with the [Eleventy static site generator](https://www.11ty.dev/) implementing a wide range of performance best practices.

![Screenshot showing that the site achieves 100 points on Lighthouse by default](https://cdn.glitch.com/db98564e-04da-47bf-a3d6-70803c3d0fe7%2FScreen%20Shot%202020-09-04%20at%2012.07.27.png?v=1599214260591)

Based on the awesome [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog).

## Setup

### 1. Install dependencies

```
npm install
```

### 2. Build, serve, watch and test

```
npm run watch
```

### 3. Build and test

```
npm run build
```

## Customize

- Search for "Update me" across files in your editor to find all the site specific things you should update.
- Update the favicons in 'img/favicon/'.
- Otherwise: Knock yourself out. This is a template repository.
- For a simple color override, adjust these CSS variables at the top of `css/main.css`.

```css
:root {
  --primary: #e7bf60;
  --primary-dark: #f9c412;
}
```
