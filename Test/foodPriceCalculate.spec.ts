import { describe, test } from '@jest/globals';
import assert from 'node:assert';
import { FoodSet, calculateTotalPrice } from '../src/foodPriceCalculate'; 

describe('calculateTotalPrice', () => {

    test('should calculate total price without any discount', () => {
        const foodSets = [
            new FoodSet("Red set", 50),
            new FoodSet("Blue set", 30)
        ];
        const isMember = false;
        const finalPrice = calculateTotalPrice(foodSets, isMember);
        assert.equal(finalPrice, 80); // 50 + 30
    });

    test('should apply 5% discount for each bundle of combo items', () => {
        const foodSets = [
            new FoodSet("Orange set", 120),
            new FoodSet("Orange set", 120),
            new FoodSet("Pink set", 80),
            new FoodSet("Pink set", 80),
            new FoodSet("Green set", 40),
            new FoodSet("Green set", 40)
        ];
        const isMember = false;
        const finalPrice = calculateTotalPrice(foodSets, isMember);
        const expectedPrice = (120 * 2) + (80 * 2) + (40 * 2) - ((120 * 0.05 ) + (80 * 0.05 ) + (40 * 0.05 )); // Apply 5% discount for each bundle
        assert.equal(finalPrice, expectedPrice);
    });

    test('should apply 10% membership discount after combo discounts', () => {
        const foodSets = [
            new FoodSet("Orange set", 120),
            new FoodSet("Orange set", 120),
            new FoodSet("Pink set", 80),
            new FoodSet("Pink set", 80)
        ];
        const isMember = true;
        const finalPrice = calculateTotalPrice(foodSets, isMember);
        const beforeDiscount = (120*2) + (80*2);
        const expectedPriceWithoutMemberDiscount = beforeDiscount - ((120 * 0.05) + (80 * 0.05));
        const expectedPriceWithMemberDiscount = expectedPriceWithoutMemberDiscount * 0.90; // Apply 10% member discount
        assert.equal(finalPrice, expectedPriceWithMemberDiscount);
    });

    test('should handle no combo items', () => {
        const foodSets = [
            new FoodSet("Red set", 50),
            new FoodSet("Blue set", 30)
        ];
        const isMember = false;
        const finalPrice = calculateTotalPrice(foodSets, isMember);
        assert.equal(finalPrice, 80); // No combo items, no discount
    });

});
