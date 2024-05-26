"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import logoImg from "../../../public/logoImg.png";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Showcase Teknologi",
    href: "/tech",
    description: "Rangkuman terkait aplikasi ini secara detail dan lengkap.",
  },
  {
    title: "Design",
    href: "/tech",
    description:
      "Aplikasi dibuat menggunakan design yang mudah diterapkan dalam UI.",
  },
  {
    title: "Frontend",
    href: "/tech",
    description:
      "Kami menggunakan framework Next.js, Next.js adalah framework React fleksibel yang memberi Anda landasan untuk membuat aplikasi web full-stack yang cepat",
  },
  {
    title: "Backend",
    href: "/tech",
    description:
      "Backend kami dibuat melalui bahasa pemrograman Golang, Go digunakan untuk berbagai aplikasi seperti aplikasi cloud dan sisi server, DevOps, alat baris perintah, dan banyak lagi.",
  },
  {
    title: "API",
    href: "/tech",
    description: "dapatkan akses data melalui API yang disediakan.",
  },
  {
    title: "StackShare.io",
    href: "https://stackshare.io/jeremyperwira/mrt-jakarta",
    description:
      "Cari Kami di StackShare, Tech Stack Intelligence platform and community helping teams to make data-driven technology decisions.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className=" md:visible">
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Cek Stasiun
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Bantuan</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="https://jakartamrt.co.id/id" target="_blank"
                  >
                    <Image
                      src={logoImg}
                      // width={200}
                      // height={200}
                      alt="MRT"
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">CekMRT</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Aplikasi Pengecekan Transportasi MRT, Install sekarang!
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/bantuan" title="Panduan">
                Kendala dalam menggunakan Aplikasi CekMRT? Cek disini.
              </ListItem>
              <ListItem href="/bantuan" title="Bagikan">
                Sharing is Yapping, Ayo informasikan aplikasi CekMRT ke
                Keluarga, Istri, Pacar, Tetangga, Dede Inoen, Komeng, dan
                Lainnya!.
              </ListItem>
              <ListItem href="/bantuan" title="Ulasan">
                Beri ulasan untuk aplikasi ini. Aplikasi Bintang 5, API Bintang
                Local
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Teknologi</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-350 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dokumentasi API
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
