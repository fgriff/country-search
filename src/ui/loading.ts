export function renderLoading(container: HTMLElement): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'loading__wrapper';

  const spinner = document.createElement('div');
  spinner.className = 'spinner';

  const text = document.createElement('span');
  text.className = 'screen-reader';
  text.textContent = 'Loading...';

  wrapper.appendChild(spinner);
  wrapper.appendChild(text);
  container.appendChild(wrapper);
}
