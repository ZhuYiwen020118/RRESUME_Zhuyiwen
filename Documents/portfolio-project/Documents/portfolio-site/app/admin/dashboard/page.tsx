import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline">Logout</Button>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 border rounded-lg bg-card">
           <h3 className="font-medium">Total Projects</h3>
           <p className="text-2xl font-bold">12</p>
        </div>
        {/* More stats */}
      </div>
    </div>
  );
}
