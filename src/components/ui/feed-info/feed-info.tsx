import React, { FC, memo } from 'react';
import styles from './feed-info.module.css';
import { FeedInfoUIProps, HalfColumnProps, TColumnProps } from './type';

const COLORS = {
  READY: '#00cccc',
  DEFAULT: '#F2F2F3'
};

export const FeedInfoUI: FC<FeedInfoUIProps> = memo(
  ({ feed, readyOrders, pendingOrders }) => {
    const { total, totalToday } = feed;

    return (
      <section data-testid="feed-info">
        <div className={styles.columns}>
          <HalfColumn
            orders={readyOrders}
            title="Готовы"
            textColor="blue"
          />
          <HalfColumn 
            orders={pendingOrders} 
            title="В работе" 
          />
        </div>
        <Column title="Выполнено за все время" content={total} />
        <Column title="Выполнено за сегодня" content={totalToday} />
      </section>
    );
  }
);

const HalfColumn: FC<HalfColumnProps> = memo(({ orders, title, textColor }) => (
  <div className={`pr-6 ${styles.column}`} data-testid={`${title.toLowerCase().replace(' ', '-')}-column`}>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <ul className={`pt-6 ${styles.list}`}>
      {orders.length === 0 ? (
        <p className="text text_type_main-default">Нет заказов</p>
      ) : (
        orders.map((item, index) => (
          <li
            className={`text text_type_digits-default ${styles.list_item}`}
            style={{ color: textColor === 'blue' ? COLORS.READY : COLORS.DEFAULT }}
            key={index}
            data-testid={`order-${textColor}-${index}`}
          >
            {item}
          </li>
        ))
      )}
    </ul>
  </div>
));

const Column: FC<TColumnProps> = memo(({ title, content }) => (
  <div data-testid={`${title.toLowerCase().replace(' ', '-')}-section`}>
    <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
      {title}:
    </h3>
    <p className={`text text_type_digits-large ${styles.content}`}>{content}</p>
  </div>
));