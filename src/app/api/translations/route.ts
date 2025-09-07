import { translations } from "./translations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const module = request.nextUrl.searchParams.get("module"), locale = request.nextUrl.searchParams.get("locale");
  if (typeof module === "string" && typeof locale === "string" && module && locale) {
    const content = translations.find((t) => t.language === locale)?.content;
    if (content) {
      return new Response(JSON.stringify({...content.common, ...content[module]}),{status: 200});
    }
  }
  return new Response(null, { status: 404 });
}
