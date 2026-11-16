import { createSearchController } from './core/searchController.js';
import { AppState } from './core/types.js';
import { renderHistory } from './ui/historyList.js';
import { createLayout } from './ui/layout.js';
import { createRenderer } from './ui/render.js';

const { input, resultsContainer } = createLayout();

const historyContainer = document.createElement('div');
input.after(historyContainer);

let retryFn: () => void = () => {};

const renderResults = createRenderer(resultsContainer, () => retryFn());

const handleStateChange = (state: AppState) => {
  renderResults(state);

  if (state.type === 'success') {
    renderHistory(historyContainer, (query) => {
      input.value = query;
      controller.onInput(query);
    });
  }
};

const controller = createSearchController(handleStateChange);
retryFn = () => controller.retry();

input.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  controller.onInput(target.value);
});

renderHistory(historyContainer, (query) => {
  input.value = query;
  controller.onInput(query);
});
