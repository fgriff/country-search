export function renderError(container: HTMLElement, message: string, onRetry: () => void): void {
  const errorEl = document.createElement('div');
  errorEl.className = 'error';

  const msgEl = document.createElement('p');
  msgEl.textContent = message;

  const retryBtn = document.createElement('button');
  retryBtn.textContent = 'Retry';
  retryBtn.addEventListener('click', onRetry);

  errorEl.appendChild(msgEl);
  errorEl.appendChild(retryBtn);
  container.appendChild(errorEl);
}
