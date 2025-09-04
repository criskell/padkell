import { redirect } from "next/navigation";

import { signOut } from "@/lib/auth";

export const GET = async () => {
  await signOut();
  await redirect('/');
};