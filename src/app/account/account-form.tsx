"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";

type Profile =
  | {
      full_name: string | null;
      username: string | null;
      website: string | null;
      avatar_url: string | null;
    }
  | null
  | undefined;

export default function AccountForm({
  user,
  initialProfile,
}: {
  user: User | null;
  initialProfile?: Profile;
}) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string | null>(
    initialProfile?.full_name ?? null
  );
  const [username, setUsername] = useState<string | null>(
    initialProfile?.username ?? null
  );
  const [website, setWebsite] = useState<string | null>(
    initialProfile?.website ?? null
  );
  const [avatar_url, setAvatarUrl] = useState<string | null>(
    initialProfile?.avatar_url ?? null
  );

  useEffect(() => {
    if (!initialProfile) return;
    setFullname(initialProfile.full_name);
    setUsername(initialProfile.username);
    setWebsite(initialProfile.website);
    setAvatarUrl(initialProfile.avatar_url);
  }, [initialProfile]);

  async function updateProfile({
    fullname: nextFullname,
    username,
    website,
    avatar_url,
  }: {
    fullname: string | null;
    username: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: nextFullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (_error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ fullname, username, website, avatar_url: url });
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({ fullname, username, website, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
