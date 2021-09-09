function GoodsList(props) {

    const {
        name,
        price, 
        full_background,
        func,
        id
    } = props

    return (
        <div id={id} className="card">
        <div className="card-image">
          <img src={full_background} alt={name} />
        </div>
        <div className="card-content">
            <span className="card-title">{name}</span>
            <h5>{price} $</h5>
        </div>
        <div className="card-action">
          <button onClick={() => func({name, id, price})} className="btn">Купить</button>
        </div>
      </div>
    )
}

export {GoodsList}