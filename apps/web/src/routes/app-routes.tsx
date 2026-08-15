import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { BatchNormalizer } from "@/pages/BatchNormalizer";
import { EmailNormalizer } from "@/pages/EmailNormalizer";
import { Overview } from "@/pages/Overview";
import { PhoneNumberNormalizer } from "@/pages/PhoneNumberNormalizer";

/**
 * Declares the shareable section routes nested under the main layout shell.
 */
export const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route element={<Overview />} index />
      <Route element={<EmailNormalizer />} path="email" />
      <Route element={<PhoneNumberNormalizer />} path="phone" />
      <Route element={<BatchNormalizer />} path="csv" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Route>
  </Routes>
);
