"use client";
import { useState } from "react";
import css from "./VerifyEmail.module.css";
import { useModal } from "@/hooks/useModal";
import { checkVerificationCode, sendVerificationCode } from "@/services/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isOpenModal, showModal] = useModal();
  const router = useRouter();

  const handleSendVerificationCode = async () => {
    const message = await sendVerificationCode(email);

    if (message === "You have been already verified") {
      toast.success(message);
      router.push("/auth/login");
    }

    if (message === "Code was sended") {
      toast(message, {
        icon: "👏",
      });
    }

    showModal();
  };

  const handleCheckVerificationCode = async () => {
    const message = await checkVerificationCode(email, code);

    if (message === "Code is not correct") {
      toast.error(message);
      return;
    }

    if (message === "You have been already verified") {
      toast.success(message);
    }
    router.push("/auth/login");
  };

  return (
    <section className={css.verifyEmail}>
      <div className={css.card}>
        <header className={css.header}>
          <span className={css.icon} aria-hidden="true">
            <span className={css.envelope}></span>
            <span className={css.badge}>✓</span>
          </span>
          <h1>Verify your email</h1>
          <p>
            Enter your email address and we&apos;ll send you a verification
            code.
          </p>
        </header>

        <div className={css.content}>
          <div className={css.step}>
            <span className={css.stepNumber}>1</span>
            <div className={css.stepContent}>
              <label className={css.field}>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              <button
                className={css.primaryButton}
                type="button"
                disabled={!email.trim()}
                onClick={handleSendVerificationCode}
              >
                Send verification code
              </button>
            </div>
          </div>

          {isOpenModal && (
            <div className={`${css.step} ${css.codeStep}`}>
              <span className={css.stepNumber}>2</span>
              <div className={css.stepContent}>
                <div className={css.codeHeading}>
                  <strong>Enter the code</strong>
                  <span>Check your inbox for the verification code.</span>
                </div>
                <label className={css.field}>
                  <span>Verification code</span>
                  <input
                    className={css.codeInput}
                    type="text"
                    name="code"
                    placeholder="Enter code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  />
                </label>
                <button
                  className={css.primaryButton}
                  type="button"
                  disabled={!code.trim()}
                  onClick={handleCheckVerificationCode}
                >
                  Verify email
                </button>
              </div>
            </div>
          )}
        </div>

        <p className={css.securityNote}>
          <span aria-hidden="true">●</span>
          The code is used only to confirm your email address.
        </p>
      </div>
    </section>
  );
};

export default VerifyEmail;
