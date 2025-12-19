import AccountForm from "./account-form";
import verifyLoggedUser from "../auth/util/verify-logged-user";
import { createClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = await createClient();
  const user = await verifyLoggedUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select(`full_name, username, website, avatar_url`)
    .eq("id", user.id)
    .single();

  return <AccountForm user={user} initialProfile={profile} />;
}
