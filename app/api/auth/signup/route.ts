import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email e senha obrigatorios." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Senha deve ter no minimo 6 caracteres." }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const admin = supabase.auth as unknown as {
      admin: {
        createUser: (attrs: { email: string; password: string; email_confirm: boolean }) => Promise<{
          data: { user: { id: string; email: string } | null };
          error: Error | null;
        }>;
      };
    };

    const { data, error } = await admin.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: { id: data.user?.id, email: data.user?.email } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao criar conta.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
