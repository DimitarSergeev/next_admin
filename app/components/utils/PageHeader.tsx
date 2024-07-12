"use client";

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function PageHeader({
  title,
  link,
  linkText,
}: {
  title: string;
  link?: string;
  linkText?: string;
}) {
  const router = useRouter();

  return (
    <div className="pageHeader">
      <h1>{title}</h1>
      {link && (
        <Button
          label={linkText}
          className="p-button-primary"
          raised
          onClick={() => router.push(link)}
        />
      )}
    </div>
  );
}
