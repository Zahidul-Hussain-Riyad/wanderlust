"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:8000";

export default function DestinationActions({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  const handleCancel = async () => {
    if (
      !window.confirm("Cancel and remove this travel package from listings?")
    ) {
      return;
    }

    setPending(true);
    try {
      const res = await fetch(`${API_URL}/destination/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Failed to cancel destination:", res.status);
        // TODO: surface an error to the user (toast/alert component)
        setPending(false);
        return;
      }
      router.push("/destinations");
    } catch (error) {
      console.error("Failed to cancel destination:", error);
      setPending(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        className="gap-1.5 px-4 border-neutral-200 hover:border-neutral-300"
        render={<Link href={`/add-destination?id=${id}`} />}
      >
        <Pencil className="size-4" />
        Edit
      </Button>
      <Button
        variant="outline"
        className="gap-1.5 px-4 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
        disabled={pending}
        onClick={handleCancel}
      >
        <Trash2 className="size-4" />
        Cancel
      </Button>
    </div>
  );
}
