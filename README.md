
# myBlog App with Redux-Toolkit

## Description
This blog app has been designed for writing blogs, adding comments, dialogs and likes to these blogs. All online users can read written blogs and their comments and give likes, but should be registered and logged into the system if they would like to add blogs or comments. How many times has a blog been read is also observable by all online users. 

## Live Project Link
https://blog-app-redux.onrender.com

## How to use this app?
1. Register yourself to the website. A username, email address and password are required, other demanded information is optional. You can also add a profile picture.
2. Log in.
3. When you would like to add a new blog, click on NEW BLOG button on the top menu and enter your blog.
4. On the top-right menu, you can see the blogs entered by you and your favorite blogs which you have given likes.
5. You can switch to dark theme mode by clicking the button near the top-right menu.

## Project Skeleton

Blog App
```
|----readme.md        

├── src
|    ├── index.css
|    ├── index.js
|    ├── App.css
|    ├── App.js
|    ├── app
|    │   └── store.jsx
|    ├── assets
|    │   ├── about.png
|    ├── components
|    │   ├── auth
|    │   │   ├── LoginFom.jsx
|    │   │   └── RegisterForm.jsx
|    │   ├── blog
|    │   │   ├── Card.jsx
|    │   │   ├── CommentCard.jsx
|    │   │   ├── CommentForm.jsx
|    │   │   ├── DeleteModal.jsx
|    │   │   └── UpdateModal.jsx
|    │   ├── FooTer.jsx
|    │   ├── NavBar.jsx
|    ├── features
|    │   ├── authSlice.jsx
|    │   └── blogSlice.jsx
|    ├── helper
|    │   └── ToastNotify.jsx
|    ├── hooks
|    │   ├── useAuthCalls.jsx
|    │   ├── useAxios.jsx
|    │   └── useBlogCalls.jsx
|    ├── pages
|    │   ├── About.jsx
|    │   ├── Dashboard.jsx
|    │   ├── Detail.jsx
|    │   ├── Login.jsx
|    │   ├── NewBlog.jsx
|    │   ├── NotFound.jsx
|    │   ├── Profile.jsx
|    │   └── Register.jsx
|    └── router
|        ├── AppRouter.jsx
|        └── PrivateRouter.jsx
```
