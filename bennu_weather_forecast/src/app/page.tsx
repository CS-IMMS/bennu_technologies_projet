'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  router.replace('/Weather')
  return (
    <>
      <h1>Bennu Weather App</h1>
    </>
  );
}
