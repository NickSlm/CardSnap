import { NavLink } from "react-router-dom";


export default function Navbar() {


    return (
        <nav className="bg-cream-50 border-b border-cream-200 px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-[15px] font-medium text-baltic-700 no-underline">
            <div className="w-7 h-7 bg-baltic-700 rounded-md flex items-center justify-center text-cream-50 text-sm">
            {/* swap with your logo/icon */}
            C
            </div>
            CardSnap
        </NavLink>

      {/* Nav links */}
      <div className="flex items-center gap-0.5">
        {["home", "binder", "market"].map((label) => (
          <NavLink
            key={label}
            to={`/${label}`}
            className={({ isActive }) =>
              `text-[13px] px-3 py-1.5 rounded-md no-underline transition-colors
               ${isActive
                 ? "bg-baltic-100 text-baltic-800 font-medium"
                 : "text-lav-500 hover:bg-cream-200 hover:text-baltic-700"
               }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">

        <button className="flex items-center gap-1.5 bg-baltic-700 hover:bg-baltic-800 text-cream-50 text-[13px] font-medium rounded-md px-3 h-[34px] transition-colors">
            Login
        </button>
      </div>

    </nav>


    );



}