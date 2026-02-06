import { ProfileForm } from "@/features/settings/components/profile-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header com gradiente */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-3xl -z-10" />
        
        <div className="flex items-center gap-4">
          <div className="h-14 w-1.5 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Configurações
            </h1>
            <p className="text-muted-foreground mt-1.5 text-base">
              Gerencie suas preferências de conta
            </p>
          </div>
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}