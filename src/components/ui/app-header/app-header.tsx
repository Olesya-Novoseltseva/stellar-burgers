import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            className={clsx(
              styles.link,
              pathname === '/' && styles.link_active
            )}
            to="/"
          >
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2 mr-10">Конструктор</p>
          </Link>

          <Link
            className={clsx(
              styles.link,
              pathname === '/feed' && styles.link_active
            )}
            to="/feed"
          >
            <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </Link>
        </div>

        <div className={styles.logo}>
          <Logo className=''/>
        </div>

        <div className={styles.link_position_last}>
          <Link
            className={clsx(
              styles.link,
              pathname.startsWith('/profile') && styles.link_active
            )}
            to="/profile"
          >
            <ProfileIcon
              type={pathname.startsWith('/profile') ? 'primary' : 'secondary'}
            />
            <p className="text text_type_main-default ml-2">
              {userName || 'Личный кабинет'}
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};