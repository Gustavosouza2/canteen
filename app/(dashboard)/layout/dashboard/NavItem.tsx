import * as React from "react";

import { Icons } from "./Icons";

export function NavItems() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full bg-[#1E1E20] border-t-2 border-[#a1a1aa28]">
      <nav className="flex flex-row items-center justify-around p-4 ">
        <div className="w-4rem rounded-lg hover:bg-[#282829]">
          <Icons.home
            className="h-7 w-7 cursor-pointer"
            href="/dashboard/home"
          />
        </div>
        <div className="w-4rem rounded-lg hover:bg-[#282829]">
          <Icons.customer
            className="h-7 w-7  cursor-pointer"
            href="/dashboard/customers"
          />
        </div>
      </nav>
    </div>
  );
}
