import { createContext, useContext, useMemo, useState } from 'react';

const ShellModeContext = createContext(null);

export function ShellModeProvider({ initialMode, children }) {
  const [mode, setMode] = useState(initialMode);
  const value = useMemo(() => ({ mode, setMode }), [mode]);
  return (
    <ShellModeContext.Provider value={value}>{children}</ShellModeContext.Provider>
  );
}

export function useShellMode() {
  const ctx = useContext(ShellModeContext);
  if (!ctx) throw new Error('useShellMode requires ShellModeProvider');
  return ctx;
}
