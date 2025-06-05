import { SVGProps } from "react"
const IconArrow = (props: SVGProps<SVGSVGElement>, backward = false) => (
    <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d={backward ? 'M14.43 5.93 20.5 12l-6.07 6.07M3.5 12h16.83' : 'M9.57 5.93 3.5 12l6.07 6.07M20.5 12H3.67'}
        />
      
    </svg>
)
export default IconArrow
