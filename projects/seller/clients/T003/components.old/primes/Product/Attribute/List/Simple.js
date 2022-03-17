import { useState } from 'react';
import ProductAttributeItemSimple from '../Item/Simple';
const ProductAttributeListSimple = ({ allProductAttributes = [], onChange = values => {} }) => {
  const [values, setValues] = useState([]);
  return allProductAttributes?.map(attribute => {
    const onChangeValue = value => {
      // remove all value of attribute in values
      var temp = [];
      values?.map(a => {
        var isIn = false;
        attribute.values.map(b => {
          if (a.id === b.id) isIn = true;
        });
        if (!isIn) temp.push(a);
      });
      //
      temp.push(value);
      onChange(temp);
      setValues(temp);
    };
    return (
      <ProductAttributeItemSimple key={attribute.id} {...attribute} onChange={onChangeValue} />
    );
  });
};
export default ProductAttributeListSimple;
