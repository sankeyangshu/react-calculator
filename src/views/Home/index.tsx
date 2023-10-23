import SwitchDark from '@/components/SwitchDark';
import './index.less';

const Home = () => {
  return (
    <div className="home">
      <div className="result"></div>
      <div className="content">
        <button className="item">C</button>
        <button className="item">
          <span className="division">&divide;</span>
        </button>
        <button className="item">
          <span className="division">&times;</span>
        </button>
        <button className="item-blue">Del</button>
        <button className="item">7</button>
        <button className="item">8</button>
        <button className="item">9</button>
        <button className="item-blue">
          <SwitchDark />
        </button>
        <button className="item">4</button>
        <button className="item">5</button>
        <button className="item">6</button>
        <button className="item-blue">-</button>
        <button className="item">1</button>
        <button className="item">2</button>
        <button className="item">3</button>
        <button className="item-blue">+</button>
        <button className="item">%</button>
        <button className="item">0</button>
        <button className="item">.</button>
        <button className="item-blue">=</button>
      </div>
    </div>
  );
};

export default Home;
