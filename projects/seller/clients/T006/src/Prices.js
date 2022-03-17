import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';
const Prices = () => {
  const [current, setCurrent] = useState();
  const [alert, setAlert] = useState();
  const [createProductOrder] = useMutation(gql`
    mutation ($data: ProductOrderCreateInput) {
      createProductOrder(data: $data) {
        id
      }
    }
  `);
  const { loading, error, data } = useQuery(
    gql`
      query {
        allProducts {
          id
          name
          price
          image {
            publicUrl
          }
        }
      }
    `
  );
  if (loading || error) return 'loading...';
  const { allProducts } = data;
  const submit = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    if (!current?.id) return setAlert('Please, choose the plan!');
    if (!address) return setAlert('Please, input your email!');
    console.log(name, phone, address);
    if (name && phone && address) {
      createProductOrder({
        variables: {
          data: {
            contact: { create: { name, phone, address } },
            items: { create: { product: { connect: { id: current.id } } } },
          },
        },
      })
        .then(data => {
          setAlert('Successful!');
          console.log(data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    e.target.name.value = null;
    e.target.phone.value = null;
    e.target.address.value = null;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-3 p-2">
          <form className="card p-3" onSubmit={submit}>
            <h1>Contact</h1>
            <hr />
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Plan"
                value={current?.name}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">MT4 number</label>
              <input name="name" className="form-control" placeholder="MT4 number" />
            </div>
            <div className="mb-3">
              <label className="form-label">Account name</label>
              <input name="phone" className="form-control" placeholder="Account name" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input name="address" type="email" className="form-control" placeholder="Email" />
            </div>

            <button className="btn btn-sm btn-outline-primary w-100" type="submit">
              Buy
            </button>
            <p className="my-3">{alert}</p>
          </form>
        </div>
        {allProducts?.map(product => {
          return (
            <div
              className="col-6 col-md-3 p-2"
              onClick={() => {
                setCurrent(product);
              }}
            >
              <div className={`card p-3 ${current?.name === product.name ? `active` : ``}`}>
                <center>
                  <h2>{product.name}</h2>
                  <hr />
                  <img
                    className="w-50 my-3"
                    src={`https://seller.itoa.vn${product.image.publicUrl}`}
                    alt={product.name}
                  />
                  <h3 className=" text-primary">${formatMoney(product.price)}</h3>
                </center>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Prices;

function formatMoney(amount, decimalCount = 0, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? '-' : '';
    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
      // +      " đ"
    );
  } catch (e) {}
}
