import { ReactNode } from "react";
import { AuthGuard } from "@/features/auth/components/auth-guard";
import { Sidebar } from "@/shared/layout/sidebar";
import { MobileMenu } from "@/shared/components/mobile-menu";
import { Header } from "@/shared/layout/header";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Sidebar Desktop (oculta no mobile) */}
        <Sidebar />
        
        {/* Menu Mobile com Hambúrguer (visível apenas no mobile) */}
        <MobileMenu />

        {/* Main Content - com padding left no desktop para compensar a sidebar */}
        <div className="lg:pl-64">
          {/* Header */}
          <Header />

          {/* Page Content - com padding responsivo */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}