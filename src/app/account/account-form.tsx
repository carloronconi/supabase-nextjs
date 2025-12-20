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
    <section className="page-section">
      <div className="surface-card">
        <div className="section-heading">
          <p className="eyebrow">Account</p>
          <h1>Profile settings</h1>
          <p>
            Keep your public information up to date so teammates can recognize
            you quickly across the workspace.
          </p>
        </div>
        <div className="account-layout">
          <div className="avatar-panel">
            <Avatar
              uid={user?.id ?? null}
              url={avatar_url}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ fullname, username, website, avatar_url: url });
              }}
            />
            <p className="helper-text">
              Recommended size 400×400px. PNG or JPG works best.
            </p>
          </div>

          <div className="form-grid">
            <div className="fieldset">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="input-control"
                type="text"
                value={user?.email ?? ""}
                disabled
              />
            </div>
            <div className="fieldset">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                className="input-control"
                type="text"
                value={fullname || ""}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="fieldset">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="input-control"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="fieldset">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                className="input-control"
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button
                className="btn btn-primary btn-full-mobile"
                onClick={() =>
                  updateProfile({ fullname, username, website, avatar_url })
                }
                disabled={loading}
                type="button"
              >
                {loading ? "Saving…" : "Save changes"}
              </button>
              <form action="/auth/signout" method="post">
                <button
                  className="btn btn-ghost btn-full-mobile"
                  type="submit"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
