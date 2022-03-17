export default function Count({ ProductCart: productCart }) {
  var count = 0;
  productCart.items.map(item => {
    count += item.quantity;
  });
  return count;
}
