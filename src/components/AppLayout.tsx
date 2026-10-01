import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import type { PageId } from "./nav";

interface AppLayoutProps {
  active: PageId;
  onNavigate: (id: PageId) => void;
  children: ReactNode;
}

export default function AppLayout({
  active,
  onNavigate,
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      <div className="mx-auto flex max-w-6xl">
        <Sidebar active={active} onNavigate={onNavigate} />
        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-12">
          {children}
        </main>
      </div>
      <BottomNav active={active} onNavigate={onNavigate} />
    </div>
  );
}
