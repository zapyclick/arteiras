function fileToDataUrl(file: File, buffer: ArrayBuffer) {
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:${file.type || "image/jpeg"};base64,${base64}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image");
  const title = String(formData.get("title") || "");
  const text = String(formData.get("text") || "");
  const url = String(formData.get("url") || "");

  if (!(file instanceof File)) {
    return Response.redirect(new URL("/admin?share=empty", request.url), 303);
  }

  const dataUrl = fileToDataUrl(file, await file.arrayBuffer());
  const draft = {
    imageDataUrl: dataUrl,
    fileName: file.name || "foto-compartilhada.jpg",
    fileType: file.type || "image/jpeg",
    caption: [title, text, url].filter(Boolean).join("\n"),
  };

  const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Abrindo painel...</title>
  </head>
  <body>
    <script>
      sessionStorage.setItem("arteiras-shared-draft", ${JSON.stringify(
        JSON.stringify(draft)
      )});
      location.replace("/admin?from=share");
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
