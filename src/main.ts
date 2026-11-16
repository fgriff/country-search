import { createSearchController } from './core/searchController.js';
import { createLayout } from './ui/layout.js';
import { createRenderer } from './ui/render.js';

const { input, resultsContainer } = createLayout();

let retryFn: () => void = () => {};

const render = createRenderer(resultsContainer, () => retryFn());
const controller = createSearchController(render);

retryFn = () => controller.retry();

input.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  controller.onInput(target.value);
});
