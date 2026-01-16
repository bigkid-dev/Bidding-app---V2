"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { LinkProps } from "next/link";

export interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
}

function NavLink({
  href,
  className = "",
  activeClassName = "",
  children,
  ...props
}: NavLinkCompatProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}

NavLink.displayName = "NavLink";

export { NavLink };
