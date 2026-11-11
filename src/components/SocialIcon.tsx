// Icônes simples en trait (même style partout), couleur = celle du texte.
export type IconName = 'whatsapp' | 'email' | 'instagram' | 'tiktok' | 'snapchat';

const PATHS: Record<IconName, React.ReactNode> = {
  whatsapp: (<><path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.3L3 21z" /><path d="M9.2 8.8c.4 2.6 2.4 4.6 5 5.2l1.1-1.2-1.9-1-.8.8c-1.1-.4-1.9-1.2-2.3-2.3l.8-.8-1-1.9-.9 1.2z" /></>),
  email: (<><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M3.5 7.5l8.5 6 8.5-6" /></>),
  instagram: (<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></>),
  tiktok: (<><path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.4 2.3 2 3.8 4.5 4" /></>),
  snapchat: (<path d="M12 3.5c-2.7 0-4.3 1.9-4.3 4.4 0 1 .1 1.8.1 2.6-.6.1-1.3.2-1.9.3.4.6 1.2.9 2 .9-.4 1.2-1.4 2.2-2.6 2.9.6.5 1.6.6 2.3.7.2.5.6 1 1.4 1 .9 0 1.7-.6 3-.6s2.1.6 3 .6c.8 0 1.2-.5 1.4-1 .7-.1 1.7-.2 2.3-.7-1.2-.7-2.2-1.7-2.6-2.9.8 0 1.6-.3 2-.9-.6-.1-1.3-.2-1.9-.3 0-.8.1-1.6.1-2.6 0-2.5-1.6-4.4-4.3-4.4z" />),
};

export default function SocialIcon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  );
}
