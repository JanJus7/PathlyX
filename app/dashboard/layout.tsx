import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Pathly<span className="text-blue-500">X</span>
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-blue-600/10 text-blue-400 rounded-xl font-medium transition-colors hover:bg-blue-600/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Active Orders
          </Link>
          <Link
            href="/dashboard/add-order"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors hover:bg-slate-800 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Order
          </Link>
          <Link
            href="/dashboard/history"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors hover:bg-slate-800 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            History
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight">
            Pathly<span className="text-blue-500">X</span>
          </h2>
          <LogoutButton />
        </header>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}