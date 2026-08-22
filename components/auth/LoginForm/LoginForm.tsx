"use client";

import { googlePayload, login } from "@/services/auth";
import css from "./LoginForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useUserStore } from "@/stores/userStore";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const updateUser = useUserStore((s) => s.updateUser);
  const isAuth = useUserStore((s) => s.isAuth);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleButtonWidth, setGoogleButtonWidth] = useState(360);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
    }
  }, [isAuth, router]);

  useEffect(() => {
    const container = googleButtonRef.current;

    if (!container) {
      return;
    }

    const updateWidth = () => {
      setGoogleButtonWidth(Math.min(360, Math.floor(container.clientWidth)));
    };
    const observer = new ResizeObserver(updateWidth);

    updateWidth();
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const loginData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      await login(loginData);
      updateUser();
      router.push("/");
    } catch (error) {
      toast.error("Invalid credential");
    }
  };

  return (
    <section className={css.loginForm}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.logo} aria-hidden="true">
            F
          </span>
          <span className={css.eyebrow}>Friday</span>
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
        <div className={css.divider}>
          <span>or continue with</span>
        </div>

        <div className={css.googleButton} ref={googleButtonRef}>
          <div className={css.googleNative}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (!credentialResponse.credential) {
                  console.error("Google did not return a credential");
                  return;
                }

                try {
                  await googlePayload(credentialResponse.credential);
                  await updateUser();
                  router.push("/");
                } catch (error) {
                  console.error("Google login failed", error);
                }
              }}
              onError={() => {
                console.error("Google login failed");
              }}
              width={`${googleButtonWidth}`}
              size="large"
              shape="rectangular"
            />
          </div>
        </div>

        <div className={css.authLinks}>
          <p className={css.alternative}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register">Register</Link>
          </p>
          <div className={css.secondaryLinks}>
            <Link href="/auth/forgot">Forgot password?</Link>
            <span aria-hidden="true"></span>
            <Link href="/auth/verify">Verify your email</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
