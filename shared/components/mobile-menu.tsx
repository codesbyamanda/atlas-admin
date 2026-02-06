'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Settings,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Clientes',
    href: '/customers',
    icon: Users,
  },
  {
    name: 'Pedidos',
    href: '/orders',
    icon: ShoppingCart,
  },
  {
    name: 'Configurações',
    href: '/settings',
    icon: Settings,
  },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Botão Hambúrguer - Tamanho e estilo melhorados */}
      <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-3 left-4 z-50 flex items-center justify-center h-10 w-10 rounded-xl bg-background/95 border border-border shadow-lg hover:bg-muted/50 transition-all duration-200 backdrop-blur-xl"
        aria-label="Menu"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Menu Lateral */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64 
          border-r border-border/50 bg-background/95 backdrop-blur-xl
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 items-center border-b border-border/50 px-6">
          <Link href="/dashboard" className="flex items-center gap-3 group" onClick={closeMenu}>
            {/* Logo com gradiente */}
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-20 blur-lg group-hover:opacity-30 transition-opacity" />
              <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-primary to-secondary p-2 shadow-lg shadow-primary/25">
                <Sparkles className="h-full w-full text-white" />
              </div>
            </div>
            
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`
                  group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold
                  transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }
                `}
              >
                {/* Indicador de página ativa */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-white" />
                )}
                
                {/* Ícone */}
                <div className={`
                  flex items-center justify-center h-5 w-5
                  transition-transform duration-300
                  ${isActive ? '' : 'group-hover:scale-110'}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                
                {/* Label */}
                <span>{item.name}</span>

                {/* Shimmer effect no hover (não ativo) */}
                {!isActive && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <div className="glass rounded-xl p-4 border border-border/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-success/20 to-success/10 border border-success/20 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Sistema Online</p>
                <p className="text-[10px] text-muted-foreground">Todos os serviços OK</p>
                <p className="text-[8px] text-muted-foreground">Desenvolvido por codesbyamanda</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}