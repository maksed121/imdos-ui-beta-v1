import Image from "next/image";
import Login from "./components/Login";

export default function Home() {
  return (
    <>
      <div className="px-4 sm:px-6 md:px-0">
        <Image
          src="/imdos/innovation.png"
          alt="Innovation"
          width={500}
          height={500}
          className="h-[80px] w-[80px] m-auto object-contain"
        />
        <h1 className="text-2xl font-semibold text-center tracking-tight mb-1">
          Login to your account
        </h1>
        <p className="text-sm text-center text-muted-foreground mb-3">
          Enter your credentials to login to your dashboard
        </p>
        <Login />
      </div>
    </>
  );
}
