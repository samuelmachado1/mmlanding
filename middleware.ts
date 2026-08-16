/** Edge middleware — pass-through; admin protection added in a follow-up. */
export default async function middleware(request: Request): Promise<Response> {
  return fetch(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
