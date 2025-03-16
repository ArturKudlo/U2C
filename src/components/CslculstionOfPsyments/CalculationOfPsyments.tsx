import { useState, FC } from 'react';
import { Memo } from '../../hoc/Memo';
import { cn } from '@bem-react/classname';
import './CalculationOfPayments.scss';
import { Button } from '../Button';
import { Credit } from '../Credit';
import { Modal } from '../Modal';

const cnCalculationOfPyments = cn('CalculationOfPayments');

export const CalculationOfPayments: FC = Memo(() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const onCloseOpenModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cnCalculationOfPyments('', { gray: isModalOpen })}>
      <Button onClick={handleOpenModal}>Расчет платежей</Button>
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseOpenModal}
        isInform
        titlePosition="left"
        buttonPosition="center"
        title={'Платежи по кредиту'}
        subtitle={
          'Введите сумму кредита и выберите срок, на который вы хотите его оформить. Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.'
        }
        confirmBtnText={'Добавить'}
      >
        <Credit />
      </Modal>
    </div>
  );
});
