"use client";

import { useState } from "react";
import useUserData from "../hooks/use-user-data";
import Link from "next/link";

export default function UserSearchBox() {
  const [username, setUsername] = useState<string>("");
  const { state, fetchByUsername } = useUserData();

  const handleSearch = async () => {
    await fetchByUsername(username);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        className="border border-gray-300 rounded-md p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
          }
        }}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSearch}
        disabled={state.status === "loading"}
      >
        {state.status === "loading" ? "Searching..." : "Go to result"}
      </button>
      {state.status === "error" ? (
        <p className="text-sm text-red-600 mt-1">{state.error}</p>
      ) : null}
      {state.status === "success" ? (
        <Link
          href={`/users/${state.username}`}
          className="mt-4 block rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-400 hover:shadow"
        >
          <p className="text-sm text-gray-500">Tap to open profile</p>
          <p className="text-lg font-semibold text-gray-900">
            {state.fullname || state.username}
          </p>
          <p className="text-sm text-gray-600">@{state.username}</p>
          {state.website ? (
            <p className="text-sm text-blue-600 break-all">{state.website}</p>
          ) : null}
        </Link>
      ) : null}
    </div>
  );
}
