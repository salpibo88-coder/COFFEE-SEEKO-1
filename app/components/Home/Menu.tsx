import Link from "next/link";

const navItems = [
  { label: "HOME", href: "/home" },
  { label: "SHOP", href: "/shop" },
  { label: "MENU", href: "/menu" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="bg-[#f5f0e8] px-12 py-6 flex items-center justify-between font-sans">
      {/* Logo Section */}
      <div className="text-2xl font-bold text-[#1a1411]">
        Logo
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-8">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-normal tracking-wide transition-colors ${
              index === 0 ? "text-[#ff7700]" : "text-[#1a1411] hover:text-[#d67b2d]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}