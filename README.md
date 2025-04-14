# Blog Website

**Website:** [blog.dahaotang.com](https://blog.dahaotang.com)

## Introduction

Welcome to the GitHub repository for my peronsal blog website, [blog.dahaotang.com](https://blog.dahaotang.com). This repository hosts the source code for the first iteration (v1) of the site. The design philosophy focuses on simplicity and providing optimal viewing on devices of varying screen sizes.

## Tech Stack

This website is built using:

- **[Next.js](https://nextjs.org/)**: A React framework for production.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.

## User's Guide

This project renders markdown files into web pages to boost the process of writing and posting blogs.

To create a new post:

1. Add a new folder under `./public/blogs/<Id_of_the_Blog>`. Id should be in the format of `yyyymmdd<rest of the id>`
2. Inside the folder, create a markdown file `<Name_of_Blog>.md` to write the blog. If the blog contains images or other resources, create a folder called `<Name_of_Blog>.assets` at the same level as the markdown file for storing the resources.
