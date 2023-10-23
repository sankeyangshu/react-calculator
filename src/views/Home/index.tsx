import { useState } from 'react';
import SwitchDark from '@/components/SwitchDark';
import './index.less';

const Home = () => {
  // 计算结果
  const [equation, setEquation] = useState('');
  // 是否有结果
  const [isCalculated, setIsCalculated] = useState(false);
  // 是否输入小数点，防止多次输入小数点
  const [isDecimalAdded, setIsDecimalAdded] = useState(false);
  // 判断是否已经输入运算符号, 防止一个数连续点击超过一个运算符
  const [isOperatorAdded, setIsOperatorAdded] = useState(false);

  /**
   * 判断是否是运算符
   * @param {string} val 值
   * @return 是否是运算符
   */
  const isOperator = (val: string | number) => {
    return ['÷', '×', '-', '+'].indexOf(String(val)) > -1;
  };

  // 输入字符
  const appendValue = (value: string | number) => {
    // 当本次输入为数字或小数点时
    if (!isOperator(value)) {
      const lastStr = equation.substring(equation.length - 1);
      // 第一个字符不能是%
      if (equation === '' && value === '%') return;

      // 如果最后一个字符是%，后面不能输入%或数字
      if (lastStr === '%' && !isOperator(value)) return;

      // 如果已经有小数点，还输入小数点，直接返回
      if (isDecimalAdded && value === '.') return;

      // 如果本次输入的是小数点
      if (value === '.') {
        setIsDecimalAdded(true);
        // 由于本次输入是小数点，所以后面不能输入运算符
        setIsOperatorAdded(true);
      } else {
        // 由于本次输入不为小数点，所以后面可以输入运算符
        setIsOperatorAdded(false);
      }
      setEquation(equation + String(value));
    }

    // 当本次输入为运算符时，且上次不是运算符
    if (isOperator(value) && !isOperatorAdded) {
      // 第一个字符不能为乘除法运算符
      if (equation === '' && (value === '×' || value === '÷')) return;

      setEquation(equation + String(value));
      // 本次已经输入运算符，设置为true，防止连续输入
      setIsOperatorAdded(true);
      // 本次输入不为小数点
      setIsDecimalAdded(false);
      // 本次输入不为等号
      setIsCalculated(false);
    }
  };

  /**
   * 当点击 C 时，清除计算结果
   */
  const clearCalculator = () => {
    setEquation('');
    setIsCalculated(false);
    setIsDecimalAdded(false);
    setIsOperatorAdded(false);
  };

  /**
   * 当点击退格键
   */
  const onBackspace = () => {
    // 如果有结果,清空所有
    if (isCalculated) {
      clearCalculator();
      return;
    }
    // 删除最后一个字符
    setEquation(equation.substring(0, equation.length - 1));
    // 如果是最后一个字符，按下清空所有的字符
    if (equation.length === 0) {
      clearCalculator();
    }
  };

  /**
   * 计算结果
   */
  const onCalculate = () => {
    const lastStr = equation.substring(equation.length - 1);
    // 判断最后一位是否合法
    if (isOperator(lastStr) || lastStr === '.') return;

    // 替换乘号和除号为正确的运算符号
    const result = equation.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '*0.01');

    // 计算结果
    setEquation(parseFloat((eval(result) as number).toFixed(9)).toString());

    // 有计算结果,设置状态
    setIsCalculated(true);
    setIsDecimalAdded(false);
    setIsOperatorAdded(false);
  };

  return (
    <div className="home">
      <div className="result">
        <span>{equation}</span>
      </div>
      <div className="content">
        <button className="item" onClick={clearCalculator}>
          C
        </button>
        <button className="item" onClick={() => appendValue('÷')}>
          {/* 除号 */}
          <span className="division">&divide;</span>
        </button>
        <button className="item" onClick={() => appendValue('×')}>
          {/* 乘号 */}
          <span className="division">&times;</span>
        </button>
        <button className="item-blue" onClick={onBackspace}>
          Del
        </button>
        <button className="item" onClick={() => appendValue(7)}>
          7
        </button>
        <button className="item" onClick={() => appendValue(8)}>
          8
        </button>
        <button className="item" onClick={() => appendValue(9)}>
          9
        </button>
        <button className="item-blue">
          <SwitchDark />
        </button>
        <button className="item" onClick={() => appendValue(4)}>
          4
        </button>
        <button className="item" onClick={() => appendValue(5)}>
          5
        </button>
        <button className="item" onClick={() => appendValue(6)}>
          6
        </button>
        <button className="item-blue" onClick={() => appendValue('-')}>
          -
        </button>
        <button className="item" onClick={() => appendValue(1)}>
          1
        </button>
        <button className="item" onClick={() => appendValue(2)}>
          2
        </button>
        <button className="item" onClick={() => appendValue(3)}>
          3
        </button>
        <button className="item-blue" onClick={() => appendValue('+')}>
          +
        </button>
        <button className="item" onClick={() => appendValue('%')}>
          %
        </button>
        <button className="item" onClick={() => appendValue(0)}>
          0
        </button>
        <button className="item" onClick={() => appendValue('.')}>
          .
        </button>
        <button className="item-blue" onClick={onCalculate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Home;
