import { Metadata } from "next";
import { LoginButton } from "@/lib/components/LoginButton";

export const metadata: Metadata = {
  title: "Cambridge Engineering Calendar",
};

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center align-middle text-center mx-4 space-y-6 h-screen">
      <h1 className="text-4xl pb-4">Cambridge Engineering Calendar</h1>
      <LoginButton />
      <p>Encountered issues? <a href="https://github.com/nelaggy/eng-calendar/issues" className="underline">Contact</a></p>
    </div>
  );
}
