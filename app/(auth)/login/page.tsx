'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth';
import { Mail, Lock, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      router.push('/dashboard');
    } else {
      setError('Credenciais inválidas. Tente: admin@demo.com / admin123');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Background animado com gradientes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Gradientes flutuantes animados */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Container principal */}
      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {/* Card de Login com glassmorphism */}
        <div className="glass-strong rounded-3xl p-8 shadow-2xl border border-border/50">
          {/* Header com logo e título */}
          <div className="mb-8 text-center space-y-4">
            {/* Logo animado */}
            <div className="relative mx-auto mb-6 h-20 w-20">
              {/* Círculo externo girando */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-xl animate-pulse-slow" />
              
              {/* Logo principal */}
              <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-primary to-secondary p-4 shadow-lg shadow-primary/25">
                <Shield className="h-full w-full text-white" />
              </div>
              
              {/* Sparkle decorativo */}
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Painel Administrativo
              </h1>
              <p className="text-sm text-muted-foreground">
                Entre com suas credenciais para continuar
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-foreground/90"
              >
                E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className={`h-5 w-5 transition-colors duration-200 ${
                    focusedInput === 'email' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="
                    w-full rounded-xl border border-border bg-background/50 pl-12 pr-4 py-3
                    text-sm backdrop-blur-sm transition-all duration-200
                    placeholder:text-muted-foreground/50
                    focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                    hover:border-border-strong
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                  placeholder="seuemail@exemplo.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-foreground/90"
              >
                Senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className={`h-5 w-5 transition-colors duration-200 ${
                    focusedInput === 'password' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="
                    w-full rounded-xl border border-border bg-background/50 pl-12 pr-4 py-3
                    text-sm backdrop-blur-sm transition-all duration-200
                    placeholder:text-muted-foreground/50
                    focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                    hover:border-border-strong
                    disabled:cursor-not-allowed disabled:opacity-50
                  "
                  placeholder="••••••••••"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 animate-slide-down">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="h-5 w-5 rounded-full bg-destructive/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-destructive" />
                    </div>
                  </div>
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                group relative w-full overflow-hidden rounded-xl
                bg-gradient-to-r from-primary to-secondary
                px-6 py-3.5 text-sm font-semibold text-white
                shadow-lg shadow-primary/25
                transition-all duration-300
                hover:shadow-xl hover:shadow-primary/30
                hover:scale-[1.02]
                active:scale-[0.98]
                disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
              "
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              {/* Conteúdo do botão */}
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Entrando...</span>
                  </>
                ) : (
                  <>
                    <span>Entrar no painel</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">ou use as credenciais de demonstração</span>
            </div>
          </div>

          {/* Demo credentials card */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-accent/20 p-1.5 rounded-lg">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <p className="text-xs font-semibold text-accent">
                Credenciais de Demonstração
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                <code className="flex-1 rounded-lg bg-background/50 px-3 py-1.5 font-mono text-foreground">
                  admin@demo.com
                </code>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                <code className="flex-1 rounded-lg bg-background/50 px-3 py-1.5 font-mono text-foreground">
                  admin123
                </code>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Desenvolvido por{' '}
              <span className="text-destructive">♥</span>{' '}
              codesbyamanda
            </p>
          </div>
        </div>

        {/* Features decorativas */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: Shield, label: 'Seguro' },
            { icon: Zap, label: 'Rápido' },
            { icon: Sparkles, label: 'Moderno' },
          ].map((feature, i) => (
            <div
              key={i}
              className="group glass rounded-xl p-4 hover:bg-card/50 transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <feature.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}