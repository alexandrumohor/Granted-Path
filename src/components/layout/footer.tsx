import Link from "next/link";
import Image from "next/image";

const links = {
  Product: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "/pricing" }, { label: "For Education", href: "/pricing#education" }, { label: "For Business", href: "/pricing#business" }],
  Company: [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }],
  Legal: [{ label: "Terms", href: "/legal/terms" }, { label: "Privacy", href: "/legal/privacy" }, { label: "GDPR", href: "/legal/gdpr" }],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image src="/SoftPathLogo.png" alt="Soft Path" width={120} height={35} className="h-9 w-auto" />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">Learn Anything. Your AI Knows How.</p>
            <p className="mt-4 text-xs text-muted-foreground/70">Soft Training Enterprise SRL</p>
          </div>
          {Object.entries(links).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="text-sm font-semibold">{cat}</h3>
              <ul className="mt-3 space-y-2">{items.map((l) => (<li key={l.href}><Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link></li>))}</ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-border/50 pt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Soft Path under Soft Training Enterprise SRL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
