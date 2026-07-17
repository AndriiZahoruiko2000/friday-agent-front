"use client";
import { forgotPassword } from "@/services/auth";
import css from "./ForgotForm.module.css";
import { useRouter } from "next/navigation";

const ForgotForm = () => {
  const router = useRouter();

  const handleForgot = async (formData: FormData) => {
    const email = formData.get("email") as string;

    await forgotPassword(email);
    router.push("/auth/login");
  };

  return (
    <section className={css.forgotForm}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.icon} aria-hidden="true">
            <span />
          </span>
          <h1>Forgot password?</h1>
          <p>Enter your email and we&apos;ll send you a recovery link</p>
        </header>

        <form action={handleForgot}>
          <div className={css.fields}>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
              />
            </label>
          </div>
          <button type="submit">Send recovery link</button>
        </form>
      </div>
    </section>
  );
};

export default ForgotForm;
