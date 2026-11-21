const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export function isAdminEmail(email?: string | null): boolean {
  if (!ADMIN_EMAIL) {
    console.error("[admin] ADMIN_EMAIL env variable is not set. Admin login disabled.");
    return false;
  }
  return email?.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();
}
