import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <Link href={'/login'}>Login</Link>
    </div>
  );
}

export default Home
