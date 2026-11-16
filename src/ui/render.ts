import { AppState } from '../core/types.js';
import { renderCountryList } from './countryList.js';
import { renderEmpty } from './empty.js';
import { renderError } from './error.js';
import { renderLoading } from './loading.js';

export function createRenderer(container: HTMLElement, onRetry: () => void) {
  return (state: AppState): void => {
    container.textContent = '';
    switch (state.type) {
      case 'idle':
        break;
      case 'loading':
        renderLoading(container);
        break;
      case 'empty':
        renderEmpty(container);
        break;
      case 'error':
        renderError(container, state.message, onRetry);
        break;
      case 'success':
        renderCountryList(container, state.data);
        break;
    }
  };
}
