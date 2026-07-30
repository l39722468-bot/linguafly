import '@testing-library/jest-dom'

// Los tests de freemium asumen el modo de pago activo.
process.env.NEXT_PUBLIC_FREE_ACCESS_MODE = 'false';
