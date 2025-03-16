import { useState, useCallback, FC } from 'react';
import { Memo } from '../../hoc/Memo';
import { cn } from '@bem-react/classname';
import './Credit.scss';
import { Button } from '../Button';

const cnCredit = cn('Credit');

export const Credit: FC = Memo(() => {
  const [amount, setAmount] = useState<string>('');
  const [months, setMonths] = useState(12);
  const [result, setResult] = useState<string>('');
  const monthsArr = [12, 24, 36, 48];
  const [amountError, setAmountError] = useState<boolean>(false);
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  const [isShowResult, setIsShowResult] = useState<boolean>(false);

  const handleCalculate = useCallback(() => {
    if (!amount.trim()) {
      setAmountError(true);
      setResult('');
      setIsShowResult(false);
      return;
    } else {
      setAmountError(false);
    }

    const amountNumber = parseFloat(amount);

    let monthlyPayment = amountNumber / months;
    let finalResult = monthlyPayment;

    if (period === 'year') {
      finalResult = monthlyPayment * 12;
    }

    setResult(isNaN(finalResult) ? '' : finalResult.toFixed(0));
    setIsShowResult(true);
  }, [amount, months, period]);

  const handleAmountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      value = value.replace(/₽/g, '');
      setAmount(value);
    },
    []
  );

  return (
    <div>
      <div className={cnCredit('text')}>Ваша сумма кредита</div>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Введите данные"
        className={cnCredit('input', { error: amountError })}
      />
      {amountError && (
        <div className={cnCredit('error')}>Поле обязательно для заполнения</div>
      )}

      <Button onClick={handleCalculate} outline>
        Рассчитать
      </Button>
      <div className={cnCredit('months')}>
        <div className={cnCredit('text')}>Количество месяцев?</div>
        <div className={cnCredit('month')}>
          {monthsArr.map((month) => (
            <Button
              key={month}
              className={cnCredit(months === month ? 'active' : '')}
              onClick={() => setMonths(month)}
              circle
            >
              {month}
            </Button>
          ))}
        </div>
      </div>

      {isShowResult && (
        <div className={cnCredit('result')}>
          <div className={cnCredit('text')}>Итого ваш платеж по кредиту:</div>
          <div>
            <Button
              tag
              className={period === 'year' ? cnCredit('active') : ''}
              onClick={() => setPeriod('year')}
            >
              в год
            </Button>
            <Button
              tag
              className={period === 'month' ? cnCredit('active') : ''}
              onClick={() => setPeriod('month')}
            >
              в месяц
            </Button>
          </div>

          <p className={cnCredit('result')}>{result} рублей</p>
        </div>
      )}
    </div>
  );
});
