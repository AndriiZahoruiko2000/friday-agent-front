"use client";

import { login } from "@/services/auth";
import css from "./LoginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const loginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    await login(loginData);
    router.push("/");
  };

  return (
    <section className={css.loginForm}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.logo} aria-hidden="true">
            F
          </span>
          <h1>Welcome back</h1>
          <p>Sign in to continue to Friday</p>
        </header>

        <form action={handleSubmit}>
          <div className={css.fields}>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                required
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>
          </div>
          <button type="submit">Log in</button>
        </form>

        <p className={css.alternative}>
          Don&apos;t have an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginForm;
