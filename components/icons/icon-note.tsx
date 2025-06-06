import { SVGProps } from "react"
const IconNote = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M26.667 11v13c0 4-2.387 5.333-5.334 5.333H10.668C7.72 29.333 5.334 28 5.334 24V11c0-4.333 2.386-5.333 5.333-5.333 0 .826.333 1.573.88 2.12.546.546 1.293.88 2.12.88h4.667c1.653 0 3-1.347 3-3 2.946 0 5.333 1 5.333 5.333Z"
        />
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21.333 5.667c0 1.653-1.346 3-3 3h-4.666a2.983 2.983 0 0 1-2.12-.88 2.983 2.983 0 0 1-.88-2.12c0-1.654 1.346-3 3-3h4.666c.827 0 1.574.333 2.12.88.547.546.88 1.293.88 2.12ZM10.666 17.333H16M10.666 22.667h10.667"
        />
    </svg>
)
export default IconNote
