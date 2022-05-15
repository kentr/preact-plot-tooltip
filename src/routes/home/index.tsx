import { FunctionalComponent, h } from "preact";
import Chart from "../../components/Chart";
import style from "./style.scss";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <Chart />
    </div>
  );
};

export default Home;
