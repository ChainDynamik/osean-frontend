import AdminsBookingsTable from "../../components/AdminBookingsTable/AdminsBookingsTable";

export default function AdminPage() {
  return (
    <main className="pt-32">
      <h1 className="py-8 text-text-secondary text-5xl font-bold mx-auto w-fit ">
        Admin Page
      </h1>
      <div className="px-8 !overflowauto">
        <AdminsBookingsTable />
      </div>
    </main>
  );
}
