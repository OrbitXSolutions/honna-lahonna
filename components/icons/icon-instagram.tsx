import { SVGProps } from "react"
const IconInstagram = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <g fill="currentColor" clipPath="url(#a)">
            <path d="M15.182 8.818a4.5 4.5 0 1 1-6.364 6.364 4.5 4.5 0 0 1 6.364-6.364Z" />
            <path d="M17.25 0H6.75A6.757 6.757 0 0 0 0 6.75v10.5A6.757 6.757 0 0 0 6.75 24h10.5A6.757 6.757 0 0 0 24 17.25V6.75A6.757 6.757 0 0 0 17.25 0ZM12 18c-3.308 0-6-2.69-6-6s2.692-6 6-6 6 2.69 6 6-2.692 6-6 6Zm6.75-12a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default IconInstagram
