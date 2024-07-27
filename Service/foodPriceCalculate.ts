export class FoodSet {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

function createFoodSets(): FoodSet[] {
  return [
    new FoodSet("Red set", 50),
    new FoodSet("Green set", 40),
    new FoodSet("Blue set", 30),
    new FoodSet("Yellow set", 50),
    new FoodSet("Pink set", 80),
    new FoodSet("Purple set", 90),
    new FoodSet("Orange set", 120),
  ];
}

const redSet = new FoodSet("Red set", 50);
const greenSet = new FoodSet("Green set", 40);
const blueSet = new FoodSet("Blue set", 30);
const yellowSet = new FoodSet("Yellow set", 50);
const pinkSet = new FoodSet("Pink set", 80);
const purpleSet = new FoodSet("Purple set", 90);
const orangeSet = new FoodSet("Orange set", 120);

export function calculateTotalPrice(food: FoodSet[], isMember: boolean): number {
  let totalPrice: number = 0;
  let itemCounts: { [key: string]: number } = {};

  // Calculate the total price and count the quantities of each set
  for (let item of food) {
      totalPrice += item.price;
      itemCounts[item.name] = (itemCounts[item.name] || 0) + 1;
  }

  // Check combo set
  const comboItems = ["Orange set", "Pink set", "Green set"];
  for (let itemName of comboItems) {
      if (itemCounts[itemName]) {
          // Calculate number of bundles
          let numberOfBundles = Math.floor(itemCounts[itemName] / 2);
          if (numberOfBundles > 0) {
              // Apply 5% discount for each bundle
              let itemPrice = food.find((item) => item.name === itemName)!.price;
              let discountPerBundle = itemPrice * 0.05; // 5% discount
              totalPrice -= numberOfBundles * discountPerBundle;
          }
      }
  }

  // Apply membership discount if applicable
  if (isMember) {
      let discount: number = totalPrice * 0.1;
      totalPrice = totalPrice - discount;
  }

  return totalPrice;
}

