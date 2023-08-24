import React from 'react';
import { Link } from 'react-router-dom';

interface LinkListProps {
  links: { to: string; title: string }[];
}

const LinkList: React.FC<LinkListProps> = ({ links }) => (
  <ul>
    {links.map((link, id) => (
      <li key={link.to + id}>
        <Link to={link.to}>{link.title}</Link>
      </li>
    ))}
  </ul>
);

export default LinkList;
