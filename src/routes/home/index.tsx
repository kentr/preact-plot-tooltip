import { FunctionalComponent, h } from "preact";
import Chart from "../../components/Chart";
import style from "./style.scss";

const Home: FunctionalComponent = () => {
  return (
    <div class={style.home}>
      <h1>Home</h1>
      <Chart />
    </div>
  );
};

export default Home;
