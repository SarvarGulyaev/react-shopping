import { CartItem } from "./CartItem"

function CartList(props) {

    const {order, cartClose, deleteGood, addGood, removeGood} = props

    const totalSum = order.reduce((sum, current) => {
      return sum + current.price * current.count;
    }, 0)
    
    return (
        
      <div className="overlay" data-close="close">
        <ul className="collection modal-goods">
        <span className="all-close"> 
          <i onClick={cartClose} className="material-icons cart-close">close</i>
        </span>
      <li href="#!" className="collection-item active">Basket</li>
      {
        order.length ? 
        order.map((good) => {
          return <CartItem addGood={addGood} removeGood={removeGood} deleteGood={deleteGood} cartClose={cartClose} key={good.id} {...good} />
        }) : <h5 className="words">Корзина пуста</h5>
      }
      <li href="#!" className="collection-item active">Total Sum: {totalSum}</li>
    </ul>
      </div>
    )
}

export {CartList}