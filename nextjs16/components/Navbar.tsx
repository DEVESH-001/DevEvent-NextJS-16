import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul>
          <Link href="/events">Home</Link>
          <Link href="/events">Events</Link>
          <Link href="/createevent">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
