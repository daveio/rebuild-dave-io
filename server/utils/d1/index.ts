/// <reference types="../../../worker-configuration" />

export function queryRedirect(env: Env, slug: string) {
  const stmt = env.DB.prepare("SELECT * FROM redirects WHERE slug = ?")
  return stmt.bind(slug).first()
}
