function onCrewSizeSelectorChange(element, data) {
    // On change of crew size you need to regenerate the wants table to accomodate for the new referees.
    data.crewSize = parseInt(element.value);
    data.limits = calculateLimits(data.crewSize);
}

function calculateLimits(crewSize) {
    return {
        foods: crewSize * 2,
        beverages: crewSize * 4
    };
}

function generateGenericEntryIdAttribute(id, type, data) {
    return `entry-${id}-${type}-${data}`;
}

function addAppropiateElementsToEntry(entryElement, id, item) {
    const wrapper = document.createElement("div");
    wrapper.className = "entry-extras-wrapper";
    for (let i = 0; i < item.extras.length; i++) {
        let extraCheckbox = document.createElement("input");
        extraCheckbox.type = "checkbox";
        const extra = item.extras[i];
        const extraLabel = document.createElement("label");
        extraLabel.className = "entry-extra-label";
        extraLabel.htmlFor = generateGenericEntryIdAttribute(id, "checkbox", extra);
        extraCheckbox.id = generateGenericEntryIdAttribute(id, "checkbox", extra);
        extraLabel.appendChild(extraCheckbox);
        extraLabel.append(" " + extra);
        wrapper.appendChild(extraLabel);
    }
    entryElement.appendChild(wrapper);
}

function removeElementsFromEntry(entryElement) {
    const entryExtrasWrappers = entryElement.getElementsByClassName("entry-extras-wrapper");
    for (wrapper of entryExtrasWrappers) {
        wrapper.remove();
    }
}

function registerEntry(id, items) {
    const entry = document.getElementById(generateGenericEntryIdAttribute(id, "container", ""));
    const itemSelect = document.getElementById(generateGenericEntryIdAttribute(id, "select", ""));
    itemSelect.addEventListener("change", function() {
        const item = items[itemSelect.value];
        removeElementsFromEntry(entry);
        addAppropiateElementsToEntry(entry, id, item);
    });
}

function createEntry(id, items) {
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.id = generateGenericEntryIdAttribute(id, "container", "");
    {
        const itemSelect = document.createElement("select");
        itemSelect.id = generateGenericEntryIdAttribute(id, "select", "");
        const options = itemSelect.options;
        items.map((item, index) => {
            const option = new Option(item.name, index);
            options.add(option);
        })
        entry.appendChild(itemSelect);
    }
    addAppropiateElementsToEntry(entry, id, items[0]);
    return entry;
}

function main() {
    const entriesContainer = document.getElementById("entries-container");
    const crewSizeSelector = document.getElementById("crew-size-selector");
    
    const foods = items.foods;
    const beverages = items.beverages;

    let entryLength = 0;

    const data = {
        crewSize: parseInt(crewSizeSelector.value),
        limits: calculateLimits(parseInt(crewSizeSelector.value)),
    }

    crewSizeSelector.addEventListener("change", function() {
        onCrewSizeSelectorChange(crewSizeSelector, data);
    });

    const createFoodsEntryButton = document.getElementById("create-foods-entry"); 
    createFoodsEntryButton.addEventListener("click", function() {
        entriesContainer.appendChild(createEntry(entryLength, foods));
        registerEntry(entryLength, foods);
        entryLength++;
    })

    const shareButton = document.getElementById("share");
    shareButton.addEventListener("click", function() {
        const vsData = createVersionSpecificDataFromData(dataVersion, data);
        const url = createDataFilledUrl("share.html", vsData, domain, repositoryName);
        location.href = url;
    });
}

window.addEventListener("load", main);      // Entry point to main function
