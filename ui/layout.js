export function createLayout() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search for a country...';
    input.className = 'search-input';
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'results-container';
    const appWrapper = document.createElement('div');
    appWrapper.className = 'app-container';
    appWrapper.appendChild(input);
    appWrapper.appendChild(resultsContainer);
    document.body.appendChild(appWrapper);
    return { input, resultsContainer };
}
//# sourceMappingURL=layout.js.map