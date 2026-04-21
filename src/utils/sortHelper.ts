import { Locator, expect } from '@playwright/test';

type SortType = 'string' | 'number';
type SortOrder = 'asc' | 'desc';

export class SortHelper {

    /**
     * Extracts clean values from UI elements
     */
    private async extractValues(locator: Locator, type: SortType): Promise<(string | number)[]> {
        const texts = await locator.allInnerTexts();

        return texts.map(text => {
            const lines = text
                .split('\n')
                .map(l => l.trim())
                .filter(Boolean);

            if (type === 'number') {
                const priceLine = lines.find(l => l.includes('$'));
                if (!priceLine) throw new Error(`No price found in: ${text}`);

                return parseFloat(priceLine.replace(/[^0-9.]/g, ''));
            }

            return lines[0];
        });
    }

    /**
     * Builds expected sorted array
     */
    private buildExpected(values: (string | number)[], type: SortType, order: SortOrder) {
        const sorted = [...values].sort((a, b) => {
            if (type === 'number') {
                return (a as number) - (b as number);
            }

            return (a as string).localeCompare(b as string, undefined, {
                sensitivity: 'base',
            });
        });

        return order === 'asc' ? sorted : sorted.reverse();
    }

    /**
     * Main assertion: verifies UI sorting is correct
     */
    async verifySort(
        locator: Locator,
        type: SortType,
        order: SortOrder
    ) {
        await expect(locator.first()).toBeVisible();

        const actual = await this.extractValues(locator, type);

        const expected = this.buildExpected(actual, type, order);

        console.log('Actual:', actual);
        console.log('Expected:', expected);

        expect(actual).toEqual(expected);
    }

    /**
     * Waits until sort operation completes (fixes flakiness)
     */
    async waitForSortToStabilize(locator: Locator) {
        const firstSnapshot = await locator.allInnerTexts();

        await expect.poll(async () => {
            return await locator.allInnerTexts();
        }).not.toEqual(firstSnapshot);
    }


    
}