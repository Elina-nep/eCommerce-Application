import React from 'react';
import { Link } from 'react-router-dom';

interface LinkListProps {
  links: { to: string; title: string }[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => (
  <ul>
    {links.map((link, linkIndex) => (
      <li key={linkIndex}>
        <Link to={link.to}>{link.title}</Link>
      </li>
    ))}
  </ul>
);

export default LinkList;
