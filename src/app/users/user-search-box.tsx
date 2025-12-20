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
    <div className="form-grid">
      <div className="fieldset">
        <label htmlFor="userSearch">Username</label>
        <div className="input-row">
          <input
            id="userSearch"
            type="text"
            placeholder="e.g. alex"
            className="input-control"
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
            className="btn btn-primary"
            onClick={handleSearch}
            disabled={state.status === "loading" || !username.trim()}
            type="button"
          >
            {state.status === "loading" ? "Searching…" : "Search"}
          </button>
        </div>
      </div>
      {state.status === "error" ? (
        <p className="helper-text helper-error">{state.error}</p>
      ) : null}
      {state.status === "success" ? (
        <Link href={`/users/${state.username}`} className="result-tile">
          <p className="eyebrow">Tap to open profile</p>
          <p>{state.fullname || state.username}</p>
          <p>@{state.username}</p>
          {state.website ? (
            <p className="helper-text">{state.website}</p>
          ) : null}
        </Link>
      ) : null}
    </div>
  );
}
