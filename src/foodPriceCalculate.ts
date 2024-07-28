export class FoodSet {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export function calculateTotalPrice(
  food: FoodSet[],
  isMember: boolean
): number {
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
    totalPrice = memberDiscount(totalPrice, isMember);
  }

  return totalPrice;
}

export function memberDiscount(total: number, isMember: boolean): number {
  let totalPrice: number = 0;

  if (isMember) {
    let discount: number = total * 0.1;
    totalPrice = total - discount;
  }
  return totalPrice;
}
