import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500" aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <Fragment key={idx}>
          {idx > 0 && <span className="text-gray-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-600 hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className={idx === items.length - 1 ? 'font-medium text-gray-800' : ''}>{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
