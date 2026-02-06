"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  ProfileFormData,
} from "../schemas";
import { useState } from "react";
import { User, Mail, Lock, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function ProfileForm() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Admin Demo",
      email: "admin@demo.com",
      password: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setSuccess(false);

    // Fake submit
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submitted data:", data);
    setSuccess(true);
    reset({ ...data, password: "" });

    // Hide success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl"
    >
      <div className="glass rounded-2xl p-8 border border-border/50 space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Nome
          </label>
          <div className="relative">
            <input
              {...register("name")}
              className="
                w-full rounded-xl border border-border bg-background/50 px-4 py-3
                text-sm backdrop-blur-sm transition-all duration-200
                placeholder:text-muted-foreground/50
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                hover:border-border-strong
              "
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
            )}
          </div>
          {errors.name && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20 animate-slide-down">
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              <p>{errors.name.message}</p>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            E-mail
          </label>
          <div className="relative">
            <input
              {...register("email")}
              className="
                w-full rounded-xl border border-border bg-background/50 px-4 py-3
                text-sm backdrop-blur-sm transition-all duration-200
                placeholder:text-muted-foreground/50
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                hover:border-border-strong
              "
              placeholder="seuemail@exemplo.com"
            />
            {errors.email && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
            )}
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20 animate-slide-down">
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              <p>{errors.email.message}</p>
            </div>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Nova Senha
          </label>
          <div className="relative">
            <input
              type="password"
              {...register("password")}
              className="
                w-full rounded-xl border border-border bg-background/50 px-4 py-3
                text-sm backdrop-blur-sm transition-all duration-200
                placeholder:text-muted-foreground/50
                focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
                hover:border-border-strong
              "
              placeholder="••••••••••"
            />
            {errors.password && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
              </div>
            )}
          </div>
          {errors.password ? (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20 animate-slide-down">
              <AlertCircle className="h-3 w-3 flex-shrink-0" />
              <p>{errors.password.message}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 px-1">
              <Lock className="h-3 w-3" />
              Deixe em branco para manter a senha atual
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-6">
          {/* Submit button + Success message */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group relative overflow-hidden rounded-xl
                bg-gradient-to-r from-primary to-secondary
                px-6 py-3 text-sm font-semibold text-white
                shadow-lg shadow-primary/25
                transition-all duration-300
                hover:shadow-xl hover:shadow-primary/30
                hover:scale-105
                active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              "
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              
              {/* Conteúdo do botão */}
              <span className="relative flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <span>Salvar alterações</span>
                  </>
                )}
              </span>
            </button>

            {/* Success feedback */}
            {success && (
              <div className="flex items-center gap-2 text-sm text-success font-medium bg-success/10 px-4 py-2.5 rounded-xl border border-success/20 animate-slide-down">
                <CheckCircle2 className="h-4 w-4" />
                <span>Perfil atualizado com sucesso</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="mt-6 glass rounded-xl p-4 border border-border/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Lock className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold mb-1">
              Suas informações estão seguras
            </h4>
            <p className="text-xs text-muted-foreground">
              Todos os dados são criptografados e armazenados com segurança. 
              Sua senha nunca é exibida ou compartilhada.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}