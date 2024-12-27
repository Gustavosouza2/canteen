import { LucideIcon, LucideProps } from 'lucide-react'

export type Icon = keyof LucideIcon

export const Icons = {
  home: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.00001 13H4.00001V15V20C4.00001 21.103 4.89701 22 6.00001 22H18C19.103 22 20 21.103 20 20V15V13H21C21.404 13 21.77 12.756 21.924 12.383C22.079 12.009 21.993 11.579 21.707 11.293L12.707 2.293C12.316 1.902 11.684 1.902 11.293 2.293L2.29301 11.293C2.00701 11.579 1.92101 12.009 2.07601 12.383C2.23001 12.756 2.59601 13 3.00001 13ZM12 4.414L18 10.414V15L18.001 20H6.00001V15V12V10.414L12 4.414Z"
        fill="#fafafaaf"
      />
      <path
        d="M12 18C15.703 18 16.901 14.461 16.95 14.311L15.05 13.69C15.042 13.713 14.269 16 12 16C9.762 16 8.98 13.779 8.949 13.684L7.05 14.311C7.099 14.461 8.297 18 12 18Z"
        fill="#fafafaaf"
      />
    </svg>
  ),
  customer: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C9.243 2 7 4.243 7 7C7 9.757 9.243 12 12 12C14.757 12 17 9.757 17 7C17 4.243 14.757 2 12 2ZM12 10C10.346 10 9 8.654 9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7C15 8.654 13.654 10 12 10ZM21 21V20C21 16.141 17.859 13 14 13H10C6.14 13 3 16.141 3 20V21H5V20C5 17.243 7.243 15 10 15H14C16.757 15 19 17.243 19 20V21H21Z"
        fill="#fafafaaf"
      />
    </svg>
  ),
}
