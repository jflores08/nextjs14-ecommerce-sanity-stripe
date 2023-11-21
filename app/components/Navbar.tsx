"use client";

// Import Next Components
import Link from "next/link";
import { usePathname } from "next/navigation";

// Import ShadcnUI Components
import { Button } from "@/components/ui/button";

// Import Lucide React Components
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

// Create nav link array
const links = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/Men" },
  { name: "Women", href: "/Women" },
  { name: "Teens", href: "/Teens" },
];

// start of tsx
export default function Navbar() {
  {
    /* create pathname variable with current url value using usePathname Hook */
  }
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  return (
    <header className="mb-8 border-b">
      {/* Navbar Flex container */}
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        {/* Logo navButton to Home */}
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Next<span className="text-primary">Commerce</span>
          </h1>
        </Link>

        {/* Navbar Links to pages Flexbox */}
        <nav className="hidden gap-12 lg:flex 2xl:ml-16">
          {/* Navbar Links to pages Map function */}
          {links.map((link, idx) => (
            <div key={idx}>
              {/* If the current page the link is the primary color esle it is grey with a hover effect that turns it the primary color */}
              {pathname === link.href ? (
                <Link
                  className="text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/*Shoppping cart logo */}
        <div className="flex divide-x border-r sm: border-l">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
