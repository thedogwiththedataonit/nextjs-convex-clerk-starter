import Tasks from "./tasks";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';

export default async function TasksPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="p-4 overflow-y-auto">
      <Tasks userId={user.id} />
    </div>
  );
}
