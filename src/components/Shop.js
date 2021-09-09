import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../config';


import { Preloader } from './Preloader';
import { GoodsItems } from './GoodsItems';
import { Cart } from './Cart';
import { CartList } from './CartList';
import { Alert } from './Alert';

function setValue() {
    const value = localStorage.getItem('goods')
    return value ? JSON.parse(value) : []
}

function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(setValue())
    const [CartShow, setCartShow] = useState(false)
    const [alertName, setAlertName] = useState('')

    const addGood = (id) => {
        const orderIndex = order.findIndex(good => good.id === id)

        const addOrder = order.map((good, index) => {
            if(index === orderIndex) {
                return {
                    ...good,
                    count: good.count + 1
                }
            } else {
                return good
            }
        })
        setOrder(addOrder)
    }

    const removeGood = (id, count) => {
        const orderIndex = order.findIndex(good => good.id === id)

        const orderArr = order.map((good, index) => {
            if(index === orderIndex && good.count > 1) {
                const newCount = good.count - 1
                return {
                    ...good,
                    count: newCount >= 0 ? newCount : 0
                }
            } else {
                return good
            }
        })
        setOrder(orderArr)
    }
    

    const deleteGood = (goodId) => {
        const newOrder = order.filter(good => good.id !== goodId)
        setOrder(newOrder)
        console.log(goodId);
    }
    
    
    const closeAlert = () => {
        setAlertName('')
    }


    const addGoodInOrder = (good) => {

        const orderIndex = order.findIndex(goodItem => goodItem.id === good.id)

        if(orderIndex < 0) {
            const newGood = {
                ...good,
                count: 1
            }
            setOrder([...order, newGood])
        } else {
            const newOrder = order.map((goodOrder, index) => {
                if(orderIndex === index) {
                    return {
                        ...goodOrder,
                        count: goodOrder.count + 1
                    }
                } else {
                    return goodOrder
                }
            })
            setOrder(newOrder)
        }
            setAlertName(good.name)
    }

    const cartShow = () => {
        setCartShow(!CartShow)
    }

    document.addEventListener('click', (event) => {
        if(event.target.dataset.close) {
          setCartShow(false)
        }
      })

    useEffect(() => {
            setLoading(true)
            fetch(API_URL, {
                headers: {
                    Authorization: API_KEY
                }
            })
            .then(response => response.json())
            .then(data => setGoods(data.featured))
            setLoading(false)

    }, [])

    useEffect(() => {
        localStorage.setItem('goods', JSON.stringify(order))
    }, [order])


    

    return (
        <div className="container content">
            <Cart func={cartShow} count={order.length} />
            {
                loading ? <Preloader /> : <GoodsItems func={addGoodInOrder} goods={goods} />
            }
            {
                CartShow ? <CartList addGood={addGood} removeGood={removeGood} deleteGood={deleteGood} cartClose={cartShow} order={order} /> : null
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert} />
            }
        </div>
    )
}

export {Shop}