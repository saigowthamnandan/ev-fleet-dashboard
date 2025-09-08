import {translations} from './translations';
import {NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
  const submodule = request.nextUrl.searchParams.get('submodule');
  const locale = request.nextUrl.searchParams.get('locale');

  if (typeof submodule === 'string' && typeof locale === 'string' && submodule && locale) {
    const content = translations.find((t) => t.language === locale)?.content;
    if (content) {
      return new Response(JSON.stringify({...content.common, ...content[submodule]}), {status: 200});
    }
  }

  return new Response(null, {status: 404});
}
