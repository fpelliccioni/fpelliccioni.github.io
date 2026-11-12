const root = document.documentElement;
const colorButton = document.querySelector<HTMLButtonElement>('.theme-toggle');
const choices = document.querySelectorAll<HTMLButtonElement>('[data-design-choice]');
const isTechnical = () => root.dataset.design === 'technical';
const colorKey = () => (isTechnical() ? 'cp-technical-theme' : 'cp-theme');

function updateControls() {
  choices.forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.designChoice === (root.dataset.design || 'editorial')),
    );
  });
  const dark = root.dataset.theme === 'dark';
  colorButton?.setAttribute('aria-pressed', String(dark));
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      'content',
      isTechnical() ? (dark ? '#0c1118' : '#f2f5f8') : dark ? '#1c221e' : '#f7f5ef',
    );
}

function restoreColor() {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem(colorKey());
  } catch {}
  root.dataset.theme =
    saved === 'dark' || saved === 'light' ? saved : isTechnical() ? 'dark' : 'light';
}

choices.forEach((button) => {
  button.addEventListener('click', () => {
    const design = button.dataset.designChoice;
    if (design !== 'technical' && design !== 'editorial') return;
    root.dataset.design = design;
    try {
      sessionStorage.setItem('cp-design-preview', design);
    } catch {}
    const url = new URL(location.href);
    url.searchParams.set('design', design);
    history.replaceState(null, '', url);
    restoreColor();
    updateControls();
  });
});

document.querySelector('.close-design-preview')?.addEventListener('click', () => {
  try {
    sessionStorage.removeItem('cp-design-preview');
  } catch {}
  delete root.dataset.design;
  delete root.dataset.designPreview;
  const url = new URL(location.href);
  url.searchParams.delete('design');
  history.replaceState(null, '', url);
  restoreColor();
  updateControls();
});

colorButton?.addEventListener('click', () => {
  const color = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = color;
  try {
    localStorage.setItem(colorKey(), color);
  } catch {}
  updateControls();
});
updateControls();
