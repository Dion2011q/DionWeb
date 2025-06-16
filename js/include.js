// include.js

// Laad externe HTML-bestanden in
function includeHTML() {
  const includes = [
    { id: 'header-placeholder', file: 'header.html' },
    { id: 'footer-placeholder', file: 'footer.html' }
  ];

  includes.forEach(include => {
    const el = document.getElementById(include.id);
    if (el) {
      fetch(include.file)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;

          // Als het de header is, moet de dark mode knop ook weer gaan werken
          if (include.id === 'header-placeholder') {
            setTimeout(() => initThemeToggle(), 0);
          }
        })
        .catch(error => {
          console.error(`Fout bij laden van ${include.file}:`, error);
        });
    }
  });
}

// Zorg dat theme toggle ook werkt na laden
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggle.textContent = '🌙';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggle.textContent = '☀️';
    }
  });
}

// Start de include functie wanneer de pagina geladen is
window.addEventListener('DOMContentLoaded', includeHTML);