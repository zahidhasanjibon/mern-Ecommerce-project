import Products from '../components/product/products';

function Home() {
    return (
        <div className="container">
            <h2 className="heading">Welcome to Redux Toolkit Store</h2>
            <section>
                <h3>Products</h3>
                <Products />
            </section>
        </div>
    );
}

export default Home;
