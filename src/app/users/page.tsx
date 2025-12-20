import verifyLoggedUser from "@/app/auth/util/verify-logged-user";
import UserSearchBox from "./user-search-box";

export default async function Users() {
  await verifyLoggedUser();

  return (
    <section className="page-section">
      <div className="surface-card">
        <div className="section-heading">
          <p className="eyebrow">Directory</p>
          <h1>Find a teammate</h1>
          <p>Search by username to quickly jump into someone&apos;s profile.</p>
        </div>
        <UserSearchBox />
      </div>
    </section>
  );
}
