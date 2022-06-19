import { FunctionalComponent } from 'preact';
import style from './style.css';

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Preact App</h1>
        </header>
    );
};

export default Header;
