import { NextResponse } from "next/server";
import { createServerSupabaseClient, getUserFromToken } from "@/lib/supabase/server";

const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "arteiras-posts";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Login obrigatorio para publicar." }, { status: 401 });
    }

    const { user, error: userError } = getUserFromToken(token);

    if (userError || !user) {
      return NextResponse.json({ error: "Sessao invalida ou expirada." }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image");
    const caption = String(formData.get("caption") || "").trim();
    const category = String(formData.get("category") || "Novidades");

    if (!(image instanceof File) || !caption) {
      return NextResponse.json(
        { error: "Envie uma foto e uma legenda para publicar." },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();
    const extension = image.name.split(".").pop() || "jpg";
    const filePath = `${user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, image, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    const title = caption.split("\n")[0]?.slice(0, 80) || "Nova publicacao";

    const { data, error: insertError } = await supabase
      .from("arteiras_posts")
      .insert({
        owner_id: user.id,
        title,
        caption,
        category,
        image_url: publicUrl,
        storage_path: filePath,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro inesperado ao publicar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
