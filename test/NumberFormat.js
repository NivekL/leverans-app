const {assert} = require('chai');

// UNIT TESTING FÖR NUMMER FORMAT

describe('Funktion som formaterar nummer till internationellt nummerformat.', () => {
        it('Formatera input till svenskt nummer format.', () => {
            it('Formatera 10000 till 10 000, 100000 till 100 000, 1000000 till 1 000 000')
            assert.throw( () => {
                const displayCost = (cost) => {
                    if (cost === undefined) {
                      return;
                    }
                    let formattedCost = new Intl.NumberFormat('se-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 }).format(cost);
                    return formattedCost;
                };
                displayCost(10000);
                displayCost(100000);
                displayCost(1000000);
                })
            })
        })