function onCrewSizeSelectorChange(element, data) {
    // On change of crew size you need to regenerate the wants table to accomodate for the new referees.
    data.crewSize = parseInt(element.value);
    data.limits = calculateLimits(data.crewSize);
}

function calculateLimits(crewSize) {
    return {
        foods: crewSize * 8,
        beverages: crewSize * 16
    };
}

function isItemOverLimmit(data, type) {
    let itemAmount = data.requests[type].reduce((sum, food) => sum + food.amount, 0);
    if (itemAmount > data.limits[type]) {
        return true;
    }
    return false;
}

function registerItems(generalizedItems, type, name, data) {
    for (let i = 0; i < generalizedItems.length; i++) {
        let itemEntry = document.getElementById(`${type}-amount-selector-${i}`);
        itemEntry.addEventListener("change", function() {
            let oldAmount = data.requests[type][i].amount;
            data.requests[type][i].amount = parseInt(itemEntry.value);
            if (isItemOverLimmit(data, type)) {
                data.requests[type][i].amount = oldAmount;
                itemEntry.value = oldAmount;
                window.alert(`Du hast das Limit für ${name} für diese Crewgröße erreicht.`);
            }
        });
    }
}

function createTableContent(generalizedItems, type) {
    return `
        <tr>
            <th>Name</th>
            <th>Stückzahl</th>
        </tr>
        ${generalizedItems.map((itemName, index) => `
            <tr>
                <th>${itemName}</th>
                <th><input type="number" min="0" placeholder="Stückzahl" value="0" id="${type}-amount-selector-${index}"></input></th>
            </tr>
        `).join('')}
    `;
}

function createItemContainer(generalizedItems, type, name) {
    let itemHeading = document.createElement("h1");
    itemHeading.innerText = `${name}:`;
    let itemTable = document.createElement("table");
    let itemTableContent = createTableContent(generalizedItems, type);
    itemTable.innerHTML = itemTableContent;
    let itemContainer = document.createElement("div");
    itemContainer.appendChild(itemHeading);
    itemContainer.appendChild(itemTable);
    return itemContainer;
}

function fillEntries(entriesContainer, foods, beverages) {
    entriesContainer.appendChild(createItemContainer(foods, "foods", "Essen"));
    entriesContainer.appendChild(createItemContainer(beverages, "beverages", "Getränke"));
}

function main() {
    const entriesContainer = document.getElementById("entries-container");
    const crewSizeSelector = document.getElementById("crew-size-selector");

    const foods = items.foods;
    const beverages = items.beverages;

    fillEntries(entriesContainer, foods, beverages);

    const data = {
        crewSize: parseInt(crewSizeSelector.value),
        limits: calculateLimits(parseInt(crewSizeSelector.value)),
        requests: {
            foods: foods.map(() => {
                return {
                    amount: 0
                }
            }),
            beverages: beverages.map(() => {
                return {
                    amount: 0
                }
            })
        }
    }

    registerItems(foods, "foods", "Essen", data);
    registerItems(beverages, "beverages", "Getränke", data);

    crewSizeSelector.addEventListener("change", function() {
        onCrewSizeSelectorChange(crewSizeSelector, data);
    });

    let shareButton = document.getElementById("share");
    shareButton.addEventListener("click", function() {
        const vsData = createVersionSpecificDataFromData(dataVersion, data);
        const url = createDataFilledUrl("share.html", vsData, domain, repositoryName);
        location.href = url;
    });

}

window.addEventListener("load", main);      // Entry point to main function
