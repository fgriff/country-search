export function showModal(country) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    const content = document.createElement('div');
    content.className = 'modal__content';
    const title = document.createElement('h2');
    title.textContent = country.name;
    const details = createDetailFields(country);
    const description = createDescription(country);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => modal.remove());
    content.appendChild(title);
    content.appendChild(details);
    content.appendChild(description);
    content.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);
}
function createDetailFields(country) {
    const details = document.createElement('div');
    details.className = 'modal__details';
    const fields = [
        {
            label: 'Area',
            value: country.area ? `${country.area.toLocaleString()} km²` : 'No data',
        },
        {
            label: 'Borders',
            value: country.borders.length > 0 ? country.borders.join(', ') : 'None',
        },
        {
            label: 'Languages',
            value: country.languages.length > 0 ? country.languages.join(', ') : 'None',
        },
        {
            label: 'Currencies',
            value: country.currencies.length > 0 ? country.currencies.join(', ') : 'None',
        },
    ];
    fields.forEach(({ label, value }) => {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = `${label}: `;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value));
        details.appendChild(p);
    });
    return details;
}
function createDescription(country) {
    const descP = document.createElement('p');
    descP.textContent = `${country.name} is a country in ${country.region}. Capital: ${country.capital}.`;
    return descP;
}
//# sourceMappingURL=modal.js.map