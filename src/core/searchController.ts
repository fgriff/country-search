import { OnStateChange, SearchController } from './types.js';

export function createSearchController(
  _onStateChange: OnStateChange,
  _debounceDelay = 300,
): SearchController {
  throw new Error('not implemented');
}
