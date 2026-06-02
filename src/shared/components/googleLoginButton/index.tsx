export function GoogleLoginButton() {
  return (
    <a
      href="/api/auth/google"
      className="flex items-center justify-center gap-3 w-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
    >
      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
      Entrar com Google
    </a>
  );
}