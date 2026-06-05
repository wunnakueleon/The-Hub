import { AdminHeader } from "../../features/admin/components/AdminHeader";
import { AdminDashboard } from "../../features/admin/components/AdminDashboard";

export default function DashboardPage() {
  return (
    <>
      <AdminHeader title="Dashboard" sub="A live look across every retreat." />
      <AdminDashboard />
    </>
  );
}
