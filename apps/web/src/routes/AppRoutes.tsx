import { Navigate, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Overview } from '@/pages/Overview';
import { EmailNormalizer } from '@/pages/EmailNormalizer';
import { PhoneNumberNormalizer } from '@/pages/PhoneNumberNormalizer';
import { BatchNormalizer } from '@/pages/BatchNormalizer';

/**
 * Declares the shareable section routes nested under the main layout shell.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Overview />} />
        <Route path="email" element={<EmailNormalizer />} />
        <Route path="phone" element={<PhoneNumberNormalizer />} />
        <Route path="csv" element={<BatchNormalizer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
