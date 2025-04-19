import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Wordle Copy-Cat</h1>
      <Link href="/connections">
        <span>Click to Play</span>
      </Link>
    </div>
  );
}
