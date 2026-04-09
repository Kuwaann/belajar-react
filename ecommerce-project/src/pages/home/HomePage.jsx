import axios from 'axios'
import { Header } from '../../components/Header'
import './HomePage.css'
import { useEffect, useState } from 'react'
import { ProductsGrid } from './ProductsGrid'

export function HomePage({ cart }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('http://localhost:3000/api/products')
            setProducts(response.data)
        }

        getHomeData();
    }, []);

    return (
        <>
            <title>Ecommerce project</title>
            <link rel="icon" type="image/png" href="/home-favicon.png" />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    );
}