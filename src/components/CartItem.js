function CartItem(props) {

    const {name, price, count, id, deleteGood, addGood, removeGood} = props

    return (
        <li className="collection-item">
           {name} <span onClick={() => addGood(id)} className="material-icons cart-count">add</span> x{count} <span onClick={() => {removeGood(id, count)}} className="material-icons cart-count">remove</span> = {count * price}$
            <span onClick={() => deleteGood(id, count)}>
                <i className="material-icons good-delete">close</i>
            </span>
        </li>
    )
}

export {CartItem}