import { useContext } from 'react';
import logoImg from '../assets/logo.png'
import Button from './UI/Button.jsx';
import CartContext from './store/CartContext.jsx';
import UserProgressContext from './store/UserProgressContext.jsx';

export default function Header() {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    let buttonContent='';
    if(totalCartItems === 0){
       buttonContent='Cart';
    }else{
    buttonContent=`Cart (${totalCartItems} items)`;
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="McDonalds official logo image." />
            </div>
            <nav>
                <Button textOnly={false} onClick={handleShowCart}>
                  {buttonContent}
                </Button>
            </nav>
        </header>
    );
}