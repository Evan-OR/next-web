import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import DARK_THEME from './theme';
import { Inter } from 'next/font/google';
import { NavBar } from './components/navigation/NavBar';
import { AuthProvider } from './auth/utils/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StreamSell',
  description: 'Stream auction app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <title>StreamSell</title>
      </head>
      <body
        className={inter.className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={DARK_THEME}>
            <CssBaseline />
            <AuthProvider>
              <NavBar />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
