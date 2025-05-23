import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-1/3 mx-auto mt-5">
      <SignIn />
    </div>
  );
}
