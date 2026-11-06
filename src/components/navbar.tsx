"use client"
import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";

const leftLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Destinations", href: "/destinations", active: false },
  { label: "Add Destination", href: "/add-destination", active: false },
  { label: "My Bookings", href: "/my-bookings", active: false },
];

const rightLinks = [
  { label: "Login", href: "/login", icon: false },
  { label: "Sign Up", href: "/signup", icon: false },
];

export default function Navbar() {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const handleSignout = () => {
    authClient.signOut();
  }

  return (
    <header className="bg-white">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-3 items-center px-4 text-sm font-medium text-neutral-800">
        <ul className="flex items-center gap-8">
          {leftLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={
                  link.active
                    ? "text-cyan-600 underline decoration-2 underline-offset-8"
                    : "hover:text-cyan-600"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link href="#" aria-label="Wanderlast home">
            <Image
              src="/images/Wanderlast.png"
              alt="Wanderlast"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <ul className="flex items-center justify-end gap-8">
          <li>
            <Link href="#" className="flex items-center gap-1.5 hover:text-cyan-600">
              <UserRound className="size-4" />
              Profile
            </Link>
          </li>

          {
            user ?
              <Popover>
                <PopoverTrigger render={<Avatar>
                  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>}>
                  Open Popover
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle>
                      {user?.name}
                    </PopoverTitle>
                    <PopoverDescription>
                      <p>{user?.email}</p>
                      <Button onClick={handleSignout} variant={'destructive'}>Sign Out</Button>
                    </PopoverDescription>
                  </PopoverHeader>
                </PopoverContent>
              </Popover> :
              <>
                {rightLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-cyan-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </>
          }

          {/* <Popover>
            <PopoverTrigger render={<Avatar>
              <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>}>
              Open Popover
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>
                  {user?.name}
                </PopoverTitle>
                <PopoverDescription>
                  <p>{user?.email}</p>
                  <Button onClick={handleSignout} variant={'destructive'}>Sign Out</Button>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          {rightLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="hover:text-cyan-600">
                {link.label}
              </Link>
            </li>
          ))} */}
        </ul>
      </nav>
    </header>
  );
}
