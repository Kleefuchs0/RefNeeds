
function createTableContent(generalizedItems, type, data) {
    return `
        <tr>
            <th>Name</th>
            <th>Stückzahl</th>
        </tr>
        ${generalizedItems.map((itemName, index) => `
            <tr>
                <th>${itemName}</th>
                <th>${data.requests[type][index].amount}</th>
            </tr>
        `).join('')}
    `;
}

function createItemContainer(generalizedItems, type, name, data) {
    let itemHeading = document.createElement("h1");
    itemHeading.innerText = `${name}:`;
    let itemTable = document.createElement("table");
    let itemTableContent = createTableContent(generalizedItems, type, data);
    itemTable.innerHTML = itemTableContent;
    let itemContainer = document.createElement("div");
    itemContainer.appendChild(itemHeading);
    itemContainer.appendChild(itemTable);
    return itemContainer;
}

function fillEntries(entriesContainer, foods, beverages, data) {
    entriesContainer.appendChild(createItemContainer(foods, "foods", "Essen", data));
    entriesContainer.appendChild(createItemContainer(beverages, "beverages", "Getränke", data));
}

function main() {
    const params = new URLSearchParams(location.search);
    const vsData = JSON.parse(params.get("d"));
    const data = getDataFromVersionSpecificData(vsData);
    const entriesContainer = document.getElementById("entries-container");

    const foods = items.foods;
    const beverages = items.beverages;

    fillEntries(entriesContainer, foods, beverages, data);

    const copyToClipboardButton = document.getElementById("copy-to-clipboard");

    copyToClipboardButton.addEventListener("click", function() {
        const vsData = createVersionSpecificDataFromData(dataVersion, data);
        const url = createDataFilledUrl("share.html", vsData, domain, repositoryName);
        copyTextToClipboard(url);
    })
}

window.addEventListener("load", main);
