"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";

import { login as loginService } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: loginService,
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginMutation.mutate(form, {
        onSuccess: (data) => {
          login(data.data);
          setForm({ email: "", password: "" });

          router.push("/dashboard");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-5 border rounded-md shadow-md bg-white"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <div className="space-y-4">
          <div className="space-y-0.5">
            <Label className="required" htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          </div>

          <div className="space-y-0.5">
            <Label className="required" htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your Password"
            />
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </p>

          <Button
            disabled={loginMutation.isPending}
            type="submit"
            className="w-full"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default LoginForm;
