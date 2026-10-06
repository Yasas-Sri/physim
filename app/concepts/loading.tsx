import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[1040px] px-6">
      <Loader label="Loading experiments…" />
    </div>
  );
}
