
function createVersionSpecificDataFromData(dataVersion, data) {
    return {
        v: dataVersion,
        d: btoa(JSON.stringify({
            c: data.crewSize,
            l: {
                f: data.limits.foods,
                b: data.limits.beverages
            },
            r: {
                f: data.requests.foods.map((food) => {
                    return {
                        a: food.amount,
                    }
                }),
                b: data.requests.beverages.map((beverage) => {
                    return {
                        a: beverage.amount,
                    }
                })
            }
        }))
    }
}

function getDataFromVersionSpecificData(vsData) {
    const d = JSON.parse(atob(vsData.d));
    switch (vsData.v) {
        case "v0.3":
            return {
                crewSize: d.c,
                limits: {
                    foods: d.l.f,
                    beverages: d.l.b
                },
                requests: {
                    foods: d.r.f.map((f) => {
                        return {
                            amount: f.a
                        }
                    }),
                    beverages: d.r.b.map((b) => {
                        return {
                            amount: b.a
                        }
                    }),
                }
            }
    }
}
