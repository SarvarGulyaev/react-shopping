import { GoodsList } from "./GoodsList"

function GoodsItems(props) {
    
    const {goods, func} = props

    return (
        <div className="goods">
            {
                goods.map((good) => {
                    return <GoodsList func={func} key={good.id} {...good} />
                })
            }
        </div>
    )
}

export {GoodsItems}