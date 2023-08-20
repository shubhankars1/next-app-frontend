"use client";
import React from 'react';
import '../blog.css';
import { usePathname, useRouter } from 'next/navigation';

export default function page(props) {
  const pathname = usePathname();
  const router = useRouter();
  const publishDate = "June 29, 2023";
  const blogNo = pathname.split('/').slice(-1).toString();

  console.log(props);

  return (
    <div className="single-blog">
      <h1 className="blog-title">Blog Title {blogNo}</h1>
      <p className="publish-date">Published on {publishDate}</p>
      <div className="blog-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae quam quis velit consectetur iaculis. Mauris nec aliquam odio. Phasellus maximus eleifend tortor, et lacinia turpis vehicula id. Fusce vitae lectus ut lectus consequat auctor. Sed convallis lectus vitae neque aliquam aliquet. Proin fringilla, tellus et ultricies commodo, lacus elit lobortis nisl, sed dictum nisl erat a justo. Integer gravida, risus id fermentum semper, augue erat venenatis felis, a ultrices quam sapien in ligula. Aliquam erat volutpat. Quisque gravida, quam vel tincidunt tincidunt, lacus urna facilisis nisi, nec iaculis velit ipsum ac nisi.
        </p>
        <p>
          Morbi facilisis erat elit, vitae aliquet libero dictum eget. Suspendisse gravida lorem ac lectus sollicitudin consequat. Vestibulum cursus lorem sed enim luctus aliquet. Nullam id dui quis neque hendrerit consequat. Fusce id mi aliquet, sagittis mi ut, ultricies risus. Aliquam sollicitudin turpis a turpis placerat, id pharetra quam fringilla. Morbi non elit nec nunc ultricies posuere. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce tempus ex ut metus dignissim, ut iaculis ante fringilla. Nam id tincidunt justo.
        </p>
      </div>
    </div>
  )
}
