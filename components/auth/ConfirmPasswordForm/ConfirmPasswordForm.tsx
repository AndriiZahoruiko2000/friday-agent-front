"use client";
import { useRouter, useSearchParams } from "next/navigation";
import css from "./ConfirmPasswordForm.module.css";
import { confirmPassword } from "@/services/auth";
import toast from "react-hot-toast";

const ConfirmPasswordForm = () => {
  const router = useRouter();

  const params = useSearchParams();

  const handleConfirm = async (formData: FormData) => {
    const token = params.get("token") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("confirm-password") as string;

    if (password !== repeatPassword) {
      toast.error("Password does not match!");
      return;
    } else {
      await confirmPassword(token, password);
      router.push("/auth/login");
    }
  };

  return (
    <section className={css.confirmPasswordForm}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.icon} aria-hidden="true">
            <span />
          </span>
          <h1>New password</h1>
          <p>Choose a secure password for your Friday account</p>
        </header>

        <form action={handleConfirm}>
          <div className={css.fields}>
            <label>
              <span>New password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
            </label>
            <label>
              <span>Confirm password</span>
              <input
                type="password"
                name="confirm-password"
                placeholder="Repeat new password"
                autoComplete="new-password"
              />
            </label>
          </div>
          <button type="submit">Confirm password</button>
        </form>
      </div>
    </section>
  );
};

export default ConfirmPasswordForm;
