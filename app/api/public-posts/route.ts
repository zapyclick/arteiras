import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("arteiras_posts")
      .select("id,title,caption,category,image_url,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro ao carregar feed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
