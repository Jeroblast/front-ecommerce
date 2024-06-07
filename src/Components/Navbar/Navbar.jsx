import './Navbar.css';

const Navbar = () => {
    return (
        <div className={'navbar'}>
            <div className={"nav-logo"}>
                <img className="logo" src="/ecommerce.png" alt="logo"/>
                <p>Easy to buy</p>
            </div>
            <ul className={'nav-menu'}>
                <li><a href="/">Accueil</a></li>
                <li><a href="/products">Produits</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/cart">Cart</a></li>
            </ul>
        </div>
    );
}

export default Navbar;
