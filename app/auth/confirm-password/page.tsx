import ConfirmPasswordForm from "@/components/auth/ConfirmPasswordForm/ConfirmPasswordForm";
import css from "./Page.module.css";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div />}>
      <ConfirmPasswordForm />
    </Suspense>
  );
};

export default Page;
