export default function Count({ allProductCartItems }) {
  var count = 0;
  allProductCartItems.map(item => {
    count += item.quantity;
  });
  return count;
}
