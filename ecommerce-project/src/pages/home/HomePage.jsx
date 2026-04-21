import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `http://localhost:3000/api/products?search=${search}` : `http://localhost:3000/api/products`;
            const response = await axios.get(urlPath)
            setProducts(response.data)
        }
        getHomeData();
    }, [search]);

    return (
        <>
            <title>Ecommerce project</title>
            <link rel="icon" type="image/png" href="/home-favicon.png" />

            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}