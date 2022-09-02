import { FunctionalComponent } from 'preact';

import Header from './header';
import Chart from "./Chart";

const App: FunctionalComponent = () => {
    return (
        <div id="preact_root">
            <Header />
            <Chart />
        </div>
    );
};

export default App;
