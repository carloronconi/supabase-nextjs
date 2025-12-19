import verifyLoggedUser from "@/app/auth/util/verify-logged-user";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AvatarPreview from "../avatar-preview";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  await verifyLoggedUser();
  const supabase = await createClient();
  const username = userId?.trim();

  if (!username) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(`full_name, username, website, avatar_url`)
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  let avatarSrc: string | null = null;
  if (profile.avatar_url) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .createSignedUrl(profile.avatar_url, 60 * 60);
    if (!error) {
      avatarSrc = data?.signedUrl ?? null;
    }
  }

  return (
    <div className="mx-auto mt-8 max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow">
      <div className="flex flex-col items-center text-center">
        <AvatarPreview
          src={avatarSrc}
          size={140}
          alt={profile.full_name || profile.username || "User avatar"}
        />
        <p className="mt-6 text-sm uppercase tracking-wide text-gray-500">
          Profile
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900">
          {profile.full_name || profile.username}
        </h1>
        <p className="text-gray-600">@{profile.username}</p>

        {profile.website ? (
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            {profile.website}
          </a>
        ) : null}
      </div>
    </div>
  );
}
