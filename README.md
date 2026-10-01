# BlogAPI
# BlogAPI

A full-stack blogging platform with a public reader experience, role-based administration, secure JWT authentication, and a PostgreSQL-backed REST API.

BlogAPI is a multi-application blogging system designed to separate public content consumption from content management. Readers can browse published posts, search by title, and participate in discussions through authenticated comments. Administrators can manage their own posts, publish or unpublish content, and review admin access requests. The backend provides the shared business logic, role checks, JWT session management, and database persistence that both frontends rely on.

The system is split into three main parts: a public reader frontend, an admin frontend for authenticated post management, and an Express REST API that handles authentication, authorization, post and comment operations, admin request workflows, and database interaction through Prisma.

## Live Demo

- Reader frontend: https://blogapi-1-nzcm.onrender.com
- Admin frontend: https://admin-frontend-xzbz.onrender.com
- Backend/API: https://blogapi-mpfp.onrender.com

The deployed services are hosted separately, with the reader and admin apps communicating with the same backend API service.

## Demo Video

> 🎥 Project walkthrough: [YouTube video coming soon](YOUTUBE_LINK_HERE)
>
> Replace `YOUTUBE_LINK_HERE` with the final YouTube URL when it is available.

## Screenshots

Screenshots will be added to `docs/images/` as the project evolves.

### Reader Interface

![Reader Home](./docs/images/reader-home.png)

### Article View

![Article View](./docs/images/article-view.png)

### Login / Register

![Login and Register](./docs/images/login-register.png)

### Comment Functionality

![Commenting](./docs/images/commenting.png)

### Admin Dashboard

![Admin Dashboard](./docs/images/admin-dashboard.png)

### Post Management

![Post Management](./docs/images/post-management.png)

### Create / Edit Post

![Create or Edit Post](./docs/images/create-edit-post.png)

### Admin Request Review

![Admin Request Review](./docs/images/admin-request-review.png)

## What BlogAPI Solves

BlogAPI provides a practical full-stack blogging workflow in one codebase: a public reading experience, authenticated user participation, and a role-based administrative interface for publishing and managing content. The project demonstrates real app patterns such as JWT-based authentication, refresh-token rotation, database-backed session tracking, ownership checks, and role-based access control in a full-stack Express + React architecture.

## Main Features

### Reader-side capabilities

- Browse published blog posts
- Pagination and page-based listing
- Search posts by title
- View individual posts and article content
- Register and log in as a reader
- Comment on posts while authenticated
- Edit own comments
- Delete own comments

### Admin-side capabilities

- Authenticated admin interface
- Dashboard overview
- Create posts
- Edit posts
- Delete posts
- Publish and unpublish posts
- Mark posts as featured
- View and manage own posts
- View post statistics
- Submit an admin access request
- Review pending admin requests as OWNER
- Approve or reject admin access requests

### Authentication and session features

- JWT access tokens
- Short-lived access tokens
- Refresh tokens
- HttpOnly refresh-token cookies
- Refresh-token hashing in the database
- Refresh-token rotation
- Session persistence
- Session revocation
- Logout
- Logout from all sessions

### Authorization

- READER role
- ADMIN role
- OWNER role
- Role-based endpoint protection
- Ownership checks for posts and comments where implemented

## Roles & Authorization

### READER

Readers can:

- read published posts
- comment while authenticated
- manage their own comments
- submit an admin access request

### ADMIN

Admins can:

- manage blog posts according to the implemented ownership rules
- create, edit, publish, unpublish, and delete posts
- view post statistics
- manage comments according to the implemented authorization rules

### OWNER

OWNER is the highest role in the app and has elevated administrative privileges. In the current backend implementation, OWNER can review pending admin requests, approve or reject requests, and exercise broader ownership privileges over content and administrative workflows.

The authorization middleware checks `req.user.role` against a list of permitted roles. For example, some routes restrict access to `ADMIN` and `OWNER`, while the admin request routes are restricted to `OWNER` for review and to `READER` for request creation. Post and comment updates and deletions also include ownership checks so a user can only modify content they authored unless they hold the `OWNER` role.

## Architecture

The application follows a three-tier architecture with separate frontend apps and a shared backend service.

```text
Reader React App
        |
        v
Express REST API
        |
        v
Prisma ORM
        |
        v
PostgreSQL

Admin React App
        |
        v
Express REST API
        |
        v
Prisma ORM
        |
        v
PostgreSQL