import Link from 'next/link'

export const HeaderLogin = () => {
  return (
    <header className="flex fixed w-full justify-between items-center p-2 bg-[#1E1E20] border-b-2 border-[#a1a1aa28]">
      <div className="flex space-x-4">
        <div className="w-12 h-12 bg-[#282829] rounded-full"></div>
      </div>
      <div className="flex space-x-4 mr-5">
        <button className="w-20 h-8 bg-gradient-to-r from-[#BD3F32] to-[#DA4453] hover:from-[#ac323e] hover:to-[#993429] font-mono text-sm text-white font-semibold rounded-md">
          <Link href="https://wa.me/5511948019137" target="_blank">
            Contact
          </Link>
        </button>
      </div>
    </header>
  )
}
