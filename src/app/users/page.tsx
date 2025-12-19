import verifyLoggedUser from "@/app/auth/util/verify-logged-user";
import UserSearchBox from "./user-search-box";

export default async function Users() {
  await verifyLoggedUser();

  return <UserSearchBox />;
}
