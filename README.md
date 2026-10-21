# Blog App

A full-stack blogging application built with React and Appwrite. Users can sign up, log in, write posts with a rich text editor, upload a featured image, and manage their own posts.

## Features

- Email and password authentication (sign up, log in, log out)
- Protected routes for logged-in users only
- Create, edit, and delete posts
- Rich text editor (TinyMCE) for post content
- Featured image upload and storage
- Active and inactive post status
- Auto-generated URL slug from the post title
- Author-only Edit and Delete buttons
- Form validation with React Hook Form

## Tech Stack

| Area | Technology |
| --- | --- |
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| State management | Redux Toolkit |
| Routing | React Router |
| Forms | React Hook Form |
| Rich text editor | TinyMCE |
| HTML rendering | html-react-parser |
| Backend as a service | Appwrite (Auth, Database, Storage) |

## Project Structure

```
src/
├── appwrite/
│   ├── auth.js
│   └── config.js
├── components/
│   ├── Container/
│   ├── Footer/
│   ├── Header/
│   ├── PostForm/
│   ├── AuthLayout.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Login.jsx
│   ├── Logo.jsx
│   ├── PostCard.jsx
│   ├── RTE.jsx
│   ├── Select.jsx
│   ├── Signup.jsx
│   └── index.js
├── conf/
│   └── conf.js
├── pages/
│   ├── AddPost.jsx
│   ├── AllPosts.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   └── Signup.jsx
├── store/
│   ├── authSlice.js
│   └── store.js
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- An [Appwrite](https://appwrite.io) project (Cloud or self-hosted)
- A [TinyMCE](https://www.tiny.cloud) API key

### Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

### Appwrite Setup

1. Create a new project in the Appwrite console and add a Web platform with your app's hostname (for example `localhost`).
2. Create a database and a collection inside it.
3. Add these attributes to the collection:

| Attribute | Type | Required |
| --- | --- | --- |
| `title` | String | Yes |
| `content` | String (large enough for HTML content) | Yes |
| `featuredImage` | String | Yes |
| `status` | String | Yes |
| `userId` | String | Yes |

4. In the collection settings, enable **Document Security** so per-document permissions are applied.
5. Create a storage bucket for post images. Allow file create access for logged-in users.
6. Add the Appwrite IDs to your `.env` file (see below).

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### Run the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Routes

| Path | Access | Description |
| --- | --- | --- |
| `/` | Public | Home page with the post list |
| `/login` | Logged-out only | Log in |
| `/signup` | Logged-out only | Create an account |
| `/all-posts` | Logged-in only | All posts |
| `/add-post` | Logged-in only | Create a new post |
| `/post/:slug` | Logged-in only | View a single post |
| `/edit-post/:slug` | Logged-in only | Edit a post |

## How It Works

- **Authentication:** `App.jsx` checks for an active Appwrite session on load and stores the result in Redux. The `Authlayout` component redirects users based on login status.
- **Posts:** The post slug is used as the Appwrite document ID. The featured image is uploaded to Appwrite Storage and its file ID is saved in the post.
- **Rich text:** Post content is written in TinyMCE, saved as HTML, and rendered with `html-react-parser`.


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is open source and available for further improvements.