"use server";
import { destroySession, getSession } from "@/lib/auth";

export async function logoutAction() {
  await destroySession();
}

export async function getCurrentAdminEmail() {
  const session = await getSession();
  return session?.email || null;
}
