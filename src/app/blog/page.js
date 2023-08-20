"use client";
import React from 'react';
import './blog.css';
import { useRouter } from 'next/navigation';

export default function Blog() {
  const router = useRouter();

  const blogPosts = [
    {
      id:1,
      title: 'Post Title 1',
      date: 'June 1, 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat metus ut elit blandit, et tempus felis feugiat.',
    },
    {
      id:2,
      title: 'Post Title 2',
      date: 'June 5, 2023',
      content: 'Vestibulum feugiat rutrum ligula, ut eleifend quam tristique ut. Mauris tristique, lectus sit amet aliquam placerat, velit nisl efficitur erat, ac faucibus turpis nunc id justo.',
    },
    {
      id:3,
      title: 'Post Title 3',
      date: 'June 10, 2023',
      content: 'Etiam eu elit est. Nulla facilisi. Nullam sed sollicitudin tortor, id facilisis neque. Suspendisse non orci nec purus ullamcorper eleifend vel et arcu.',
    },
  ];


  const navToBlogPage = (blogData) => {
    router.push("/blog/"+blogData.id, {
      pathname: "/blog/"+blogData.id,
      blogNum: blogData.id,
      query: { data: JSON.stringify(blogData) },
    });
  }

  return (
    <div className="blog-container">
      <h1 className="blog-heading">Blog</h1>
      {blogPosts.map((post, index) => (
        <div className="blog-post" key={index}>
          <h2 className="blog-post-title" onClick={() => navToBlogPage(post)}>{post.title}</h2>
          <p className="blog-post-date">{post.date}</p>
          <p className="blog-post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
}