import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, verifyAuthToken } from "@/lib/supabase/server";

const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "arteiras-posts";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = _request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Login obrigatorio." }, { status: 401 });
    }

    const { user, error: userError } = await verifyAuthToken(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Sessao invalida." }, { status: 401 });
    }

    const { id } = await params;
    const supabase = createServerSupabaseClient();

    const { data: post, error: fetchError } = await supabase
      .from("arteiras_posts")
      .select("storage_path, owner_id")
      .eq("id", id)
      .single();

    if (fetchError || !post) {
      return NextResponse.json({ error: "Post nao encontrado." }, { status: 404 });
    }

    if (post.owner_id !== user.id) {
      return NextResponse.json({ error: "Sem permissao para deletar este post." }, { status: 403 });
    }

    if (post.storage_path) {
      await supabase.storage.from(bucketName).remove([post.storage_path]);
    }

    const { error: deleteError } = await supabase
      .from("arteiras_posts")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao deletar post.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
