"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./ui/LinkButton";

export const LoginButton = () => {
  const router = useRouter();
  return <LinkButton href={"/api/auth/login"}>Raven Login</LinkButton>;
};
