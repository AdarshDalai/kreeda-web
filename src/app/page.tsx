export default async function Home() {
  // determine the base URL (fallback to localhost when env var is missing)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  // 1. Fetch the data with error handling
  let response;
  try {
    response = await fetch(`${baseUrl}/api/healthz`);
  } catch (err) {
    console.error("failed to fetch healthz:", err);
    return <main className="p-8 text-red-500">Unable to contact backend.</main>;
  }
  
  // 2. Check for success
  if (!response.ok) {
    return <main className="p-8 text-red-500">Backend is offline!</main>;
  }

  // 3. Parse the JSON (your FastAPI healthz endpoint returns {})
  const data = await response.json();

  // 4. Render the UI using Tailwind CSS (similar to Compose Modifiers!)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 p-8 text-white">
      <h1 className="text-5xl font-bold text-emerald-400">Kreeda</h1>
      <p className="mt-4 text-lg text-zinc-400">Backend Status: Online</p>
    </main>
  );
}