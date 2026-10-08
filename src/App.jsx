import { ShellModeProvider } from './context/ShellModeContext.jsx';
import { getInitialShellMode, renderPageByKey, resolvePageKey } from './renderApp.jsx';
export default function App() {
  const shellMode = getInitialShellMode();
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '/';
  const pageKey = resolvePageKey(pathname, shellMode);

  return (
    <ShellModeProvider initialMode={shellMode}>
      {renderPageByKey(pageKey)}
    </ShellModeProvider>
  );
}
