import { Header } from "../components/Header"

export function NotFoundPage({ cart }) {
    return (
        <>
            <Header cart={cart} />
            <p>Error 404: Not Found</p>
        </>

    );
}