import { cn } from '@bem-react/classname';
import { CalculationOfPayments } from './components/CslculstionOfPsyments';

import './App.scss';

const cnApp = cn('App');

function App() {
  return (
    <div className={cnApp()}>
      <CalculationOfPayments />
    </div>
  );
}

export default App;
