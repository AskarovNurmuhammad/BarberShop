// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 shadow">
      <Link href="/menu" className="text-decoration-none text-black">
        Menu
      </Link>
      <Link href="/profile" className="text-decoration-none text-black">
        PR/LO
      </Link>
    </div>
  );
}
