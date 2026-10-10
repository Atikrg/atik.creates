import { Container } from "@/components/primitives";
import { Logo } from "@/components/logo";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo />
            <p className="text-small text-muted-foreground">
              {site.tagline}. Built by {site.owner}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-caption text-subtle-foreground">
              [ Contact ]
            </span>
            <a
              href={`mailto:${site.email}`}
              className="text-small text-foreground transition-colors hover:text-violet"
            >
              {site.email}
            </a>
            <span className="text-small text-muted-foreground">
              {site.location}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-caption text-subtle-foreground">
              [ Elsewhere ]
            </span>
            <div className="flex flex-col gap-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-small text-foreground transition-colors hover:text-violet"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 text-caption text-subtle-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span className="font-mono">Designed &amp; built by {site.owner}</span>
        </div>
      </Container>
    </footer>
  );
}
