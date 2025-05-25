import Link from 'next/link';

export default function AdminHome() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Manage your pages here.</p>
      <Link href="/admin/pages">
        <span className="text-blue-600 underline">Go to Pages</span>
      </Link>
    </div>
  );
}
