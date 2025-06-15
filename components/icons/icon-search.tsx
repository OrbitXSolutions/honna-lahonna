/**
 * @file IconSearch.tsx
 * @description Search icon component.
 */
import * as React from "react";

interface IconSearchProps extends React.SVGProps<SVGSVGElement> {}

const IconSearch: React.FC<IconSearchProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

IconSearch.displayName = "IconSearch";

export { IconSearch };
export type { IconSearchProps };
