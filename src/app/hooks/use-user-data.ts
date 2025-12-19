import { createClient } from "@/lib/supabase/client";
import { useCallback, useState } from "react";

export type UserDataState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      fullname: string;
      username: string;
      website: string;
      avatar_url: string;
    }
  | { status: "error"; error: string };

export default function useUserData() {
  const supabase = createClient();
  const [state, setState] = useState<UserDataState>({ status: "idle" });

  const fetchByUsername = useCallback(
    async (username: string | undefined) => {
      const trimmed = username?.trim();
      if (!trimmed) {
        setState({ status: "idle" });
        return null;
      }

      setState({ status: "loading" });
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("username", trimmed)
        .single();

      if (error && status !== 406) {
        setState({ status: "error", error: "User not found." });
        return null;
      }

      if (data) {
        const profile = {
          fullname: data.full_name,
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        };
        setState({ status: "success", ...profile });
        return profile;
      }

      setState({ status: "error", error: "User not found." });
      return null;
    },
    [supabase]
  );

  return { state, fetchByUsername };
}
