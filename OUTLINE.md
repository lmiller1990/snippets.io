## Goal

The goals of snippets is to allow programmers to save and share knowledge quickly and easily. 

## Why Snippets?

There are a number of existing resources for sharing information:

- StackOverflow
- GitHub
- Personal Blogs (Ghost, WP)
- Public Blog platforms (Medium)

### StackOverflow

StackOverflow is a Q&A site. Often the knowledge can become outdated and irrelevant, or worse, unknown - often the version, context etc. is missing from questions and/or answers.

### GitHub

GitHub allows developers to share and work on projects together. The goal is not to provide knowledge, as such, but contribute and build products. A great way to learn, but often valuable knowledge and learning is buried in issues.

### Personal Blogs

Personal blogs vary in quality. The main problem is not the quality, but discoverability. People rarely visit a personal blog for information about a specific topic, but from a Google search for the information, or because they are interested in the poster's style or personality. Also, since many personal blogs are just that, personal, they come and go, and often disappear if the person loses interest.

### Public Platforms

There are a number of great developer resources on platforms such as Medium. Medium is as much a marketing tool as a knowledge base, though, and often the development resources are lost or mixed in with other unrelated content. Many posts are optimized for clicks or views.

## The problem I am solving (for myself)

I often writ details posted on my blog and mirror them to Medium. However, I lke to host the entire source code, so readers can reproduce the results. It is inconvinient to make tons of public repos on my GH, and then to use the code as snippets copy and paste them. I want a single platform to host my repo, and be able to easily refernce the code from the repo in my articles. This mirrors another problem I often found in academic research: exciting results, but no source code or way to reproduce them, making the knowledge not as useful.


## Essential Features

- upload and host a git repo in a single command
- host articles, and support publishing in markdown
- able to reference code from the article
- open source (as much as possible)
- no lock in. Users can download and migrate their code and posts at any time, in their original form

## Roadmap

### Alpha

- can upload a git repo
- can make posts
- can reference a line of code from the post
- can display a snippet from the post
- users can create an account

All these features from a cli program are okay

### Beta

All the functionality from the alpha, but with a basic web gui

### Release

Alpha and Beta features working, with a guide on how to use snippets

### Future

Users can comment and interact with each other
Import repos from other services
Monetize

