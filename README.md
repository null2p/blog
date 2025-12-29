# My Blog

A beautiful blog built with Next.js, MDX, and Liquid Glass, deployed on GitHub Pages.

## Features

- 🚀 **Static Site Generation** - Blazing fast with Next.js SSG
- ✍️ **MDX Support** - Write content in Markdown with React components
- 🎨 **Liquid Glass UI** - Stunning glass morphism design
- 🏷️ **Tag System** - Organize posts by topics
- 📱 **Responsive** - Works perfectly on all devices
- 🌙 **Dark Theme** - Beautiful dark gradient background
- ⚡ **GitHub Pages** - Free hosting with GitHub

## Tech Stack

- **Framework**: Next.js 16
- **Content**: MDX (Markdown + JSX)
- **Styling**: Tailwind CSS 4
- **UI Library**: Liquid Glass React
- **Deployment**: GitHub Pages + GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/blog.git
cd blog

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

### Building

```bash
# Build for production
npm run build

# The static files will be in the 'out' directory
```

## Project Structure

```
blog/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── posts/            # Posts pages
│   │   ├── page.tsx      # All posts
│   │   └── [slug]/       # Individual post
│   ├── tags/             # Tags pages
│   └── about/            # About page
├── components/            # React components
│   ├── ui/               # UI components (Liquid Glass)
│   ├── layout/           # Layout components
│   └── mdx/              # MDX components
├── content/              # Blog content
│   └── posts/            # MDX blog posts
├── lib/                  # Utilities
│   ├── content/          # Content loading utilities
│   └── config/           # Site configuration
├── public/               # Static assets
└── next.config.ts        # Next.js configuration
```

## Writing Posts

Create a new MDX file in `content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2025-01-01"
description: "A brief description"
tags: ["tag1", "tag2"]
draft: false
---

# Your Content Here

Write your post in Markdown with MDX support!
```

## Configuration

Edit `lib/config/site.ts` to customize your blog:

```typescript
export const siteConfig = {
  name: 'Your Blog Name',
  description: 'Your blog description',
  url: 'https://yourusername.github.io/blog',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    // ...
  },
  // ...
};
```

## Deployment

This blog is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Steps:

1. Push your code to GitHub
2. Go to Settings > Pages
3. Set Source to "GitHub Actions"
4. Push to the `main` branch
5. GitHub Actions will build and deploy automatically

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder
2. Update the `basePath` in `next.config.ts` if needed

## License

MIT

## Credits

- [Next.js](https://nextjs.org/)
- [Liquid Glass React](https://github.com/rdev/liquid-glass-react)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
