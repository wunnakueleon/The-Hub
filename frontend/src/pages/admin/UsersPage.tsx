import { AdminHeader } from "../../features/admin/components/AdminHeader";
import { UsersTable } from "../../features/admin/components/UsersTable";
import { useAdminUsers } from "../../features/admin/hooks/useAdminUsers";

export default function UsersPage() {
  const { users, loading, error } = useAdminUsers();

  return (
    <>
      <AdminHeader title="Users" sub={`${users.length} registered developers.`} />
      {loading && <p className="text-ink-500">Loading users…</p>}
      {error && <p className="text-coral-600">{error}</p>}
      {!loading && !error && <UsersTable users={users} />}
    </>
  );
}
