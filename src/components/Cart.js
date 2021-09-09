function Cart(props) {

    const {count = 0, func} = props

    return (
            <div onClick={func} className="cart blue darken-4 white-text">
            <i className="material-icons">shopping_cart</i>
            {
                count ? <span className="cart-count">{count}</span> : null
            }
        </div>
    )
}

export { Cart }