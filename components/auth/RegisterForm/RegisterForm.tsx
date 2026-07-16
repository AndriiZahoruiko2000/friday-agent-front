"use client";

import { register } from "@/services/auth";
import css from "./RegisterForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const registerData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      nickname: formData.get("nickname") as string,
    };

    await register(registerData);
    router.push("/auth/login");
  };

  return (
    <section className={css.registerForm}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.logo} aria-hidden="true">
            F
          </span>
          <h1>Create account</h1>
          <p>Start managing your finances with Friday</p>
        </header>

        <form action={handleSubmit}>
          <div className={css.fields}>
            <label>
              <span>Nickname</span>
              <input
                type="text"
                name="nickname"
                placeholder="Your name"
                autoComplete="nickname"
                required
              />
            </label>
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
                placeholder="Create a password"
                autoComplete="new-password"
                required
              />
            </label>
          </div>
          <button type="submit">Create account</button>
        </form>

        <p className={css.alternative}>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;
