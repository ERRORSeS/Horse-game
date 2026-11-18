/* Appearance is local to this device, independent of career saves and recovery. */
(function () {
  if (typeof document === 'undefined' || !document.documentElement) return;
  const key = 'oxer.appearance101';
  function preference() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function apply(theme) {
    document.documentElement.dataset.theme = theme;
    const button = document.getElementById('appearanceToggle');
    if (button) {
      button.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      button.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    }
  }
  const system = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
  const stored = preference();
  apply(stored === 'light' || stored === 'dark' ? stored : system?.matches ? 'dark' : 'light');
  system?.addEventListener?.('change', event => { if (!['light', 'dark'].includes(preference())) apply(event.matches ? 'dark' : 'light'); });
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.getElementById('appearanceToggle')?.addEventListener('click', () => {
      const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(theme);
      try { localStorage.setItem(key, theme); } catch (_) { /* Private browsing still supports this session. */ }
    });
    document.addEventListener('click', event => {
      const target = event.target.closest?.('[data-stable-start]');
      if (target && typeof changeTab === 'function') changeTab(target.dataset.stableStart);
    });
    document.querySelector('.stable-brand')?.addEventListener('click', event => {
      if (typeof changeTab === 'function') { event.preventDefault(); changeTab('dashboard'); }
    });
  });
})();
