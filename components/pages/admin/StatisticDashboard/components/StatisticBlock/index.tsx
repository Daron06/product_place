import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { DashboardRole, IconType } from 'services/types';

import stylesStatisticDashboard from '../../StatisticDashboard.module.scss';
import styles from './StatisticBlock.module.scss';

interface StatisticBlockProps {
  className?: string;
  color?: string;
  loading?: boolean;
  name: string;
  role?: DashboardRole;
  type?: IconType;
  title?: string;
  value: string | number;
}

function renderIcon(type: IconType, color?: string, disabled?: boolean): React.ReactNode {
  const circleStroke = disabled ? '#eee' : 'none';

  switch (type) {
    case 'orders': {
      const circleFill = disabled ? 'none' : color || '#FFF1A8';
      const pathStroke = disabled ? '#eee' : color || '#917C12';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.17" stroke={circleStroke} />
          <path
            d="M21 22.5H25M21 26.5H25M28.5 22.5H29.5M28.5 26.5H29.5M14 36V29.5H17M17 29.5V15L21 16.5L25 15L29 16.5L33 15V29.5M17 29.5V32.5H33V29.5M33 29.5H36V36"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }
    case 'cloudKitchen': {
      const circleFill = disabled ? 'none' : color || '#4636FF';
      const pathStroke = disabled ? '#eee' : color || '#7169D1';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.13" stroke={circleStroke} />
          <path
            d="M33.0328 24.423H34.1803C36.8422 24.423 39 26.5669 39 29.2115C39 31.8561 36.8422 34 34.1803 34H14.6721C12.6441 34 11 32.3666 11 30.3516C11 27.6897 13.0045 26.4356 15.5902 26.7033C15.2952 25.6148 15.3887 23.8288 16.8724 22.8707M21.1482 30.3517V18.8987M21.1482 18.8987L20.7466 18.8707C19.3041 18.7699 18.1857 17.5778 18.1857 16.1411V13.425M21.1482 18.8987L21.5497 18.8707C22.9922 18.7699 24.1106 17.5778 24.1106 16.1411V13.425M21.1482 18.8987V13.3147M29.1896 30.3517V19.8108M29.1896 19.8108C27.861 19.8108 26.784 18.7407 26.784 17.4207V16.5019C26.784 15.0959 27.5452 13.7987 28.7767 13.1061C29.0323 12.9624 29.3456 12.9648 29.5989 13.1124C30.8011 13.8128 31.5396 15.0937 31.5396 16.4782V17.4757C31.5396 18.7652 30.4876 19.8106 29.1896 19.8108Z"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    case 'chefTable': {
      const circleFill = disabled ? 'none' : color || '#4636FF';
      const pathStroke = disabled ? '#eee' : color || '#7169D1';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="24.5" fill={circleFill} fillOpacity="0.13" stroke={circleStroke} />
          <path
            d="M14 35V22.1071M14 22.1071H36M14 22.1071H12L18 16H32L38 22.1071H36M36 22.1071V35M18 25.5V30.9286M32 25.5V30.9286"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    case 'store': {
      const circleFill = disabled ? 'none' : color || '#EFEDB7';
      const circleFill1 = disabled ? 'none' : color || '#B6B854';
      const pathStroke = disabled ? '#eee' : color || '#B6B854';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.13" stroke={circleStroke} />
          <path
            d="M11.1316 14.9756C10.5793 14.9756 10.1316 15.4233 10.1316 15.9756C10.1316 16.5279 10.5793 16.9756 11.1316 16.9756V14.9756ZM14.1643 15.9756L15.113 15.6594C14.9769 15.251 14.5948 14.9756 14.1643 14.9756V15.9756ZM19.6232 32.3523L18.6746 32.6686C18.8107 33.0769 19.1928 33.3523 19.6232 33.3523V32.3523ZM32.9673 32.3523V33.3523C33.4165 33.3523 33.8106 33.0528 33.9308 32.62L32.9673 32.3523ZM36 21.4345L36.9635 21.7022C37.0472 21.4011 36.9852 21.0782 36.7961 20.8294C36.607 20.5806 36.3125 20.4345 36 20.4345V21.4345ZM11.1316 16.9756H14.1643V14.9756H11.1316V16.9756ZM19.6232 33.3523H32.9673V31.3523H19.6232V33.3523ZM33.9308 32.62L36.9635 21.7022L35.0365 21.1669L32.0038 32.0847L33.9308 32.62ZM13.2156 16.2918L15.0353 21.7507L16.9326 21.1183L15.113 15.6594L13.2156 16.2918ZM15.0353 21.7507L18.6746 32.6686L20.5719 32.0361L16.9326 21.1183L15.0353 21.7507ZM36 20.4345H15.984V22.4345H36V20.4345Z"
            fill={pathStroke}
          />
          <circle cx="21.4429" cy="37.2044" r="1.81964" fill={circleFill1} />
          <circle cx="31.1476" cy="37.2044" r="1.81964" fill={circleFill1} />
        </svg>
      );
    }

    case 'recipes': {
      const circleFill = disabled ? 'none' : color || '#FFEFD7';
      const pathStroke = disabled ? '#eee' : color || '#CA9341';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.13" stroke={circleStroke} />
          <path
            d="M34 35V36C34.3713 36 34.7121 35.7943 34.885 35.4656C35.0579 35.137 35.0345 34.7397 34.8242 34.4336L34 35ZM34 13H35C35 12.4477 34.5523 12 34 12V13ZM34 30.2432L34.8242 30.8096C34.9387 30.6429 35 30.4455 35 30.2432H34ZM21.129 17.3514C20.5767 17.3514 20.129 17.7991 20.129 18.3514C20.129 18.9036 20.5767 19.3514 21.129 19.3514V17.3514ZM29.0968 19.3514C29.6491 19.3514 30.0968 18.9036 30.0968 18.3514C30.0968 17.7991 29.6491 17.3514 29.0968 17.3514V19.3514ZM21.129 20.9189C20.5767 20.9189 20.129 21.3666 20.129 21.9189C20.129 22.4712 20.5767 22.9189 21.129 22.9189V20.9189ZM29.0968 22.9189C29.6491 22.9189 30.0968 22.4712 30.0968 21.9189C30.0968 21.3666 29.6491 20.9189 29.0968 20.9189V22.9189ZM17.3784 36H34V34H17.3784V36ZM18 14H34V12H18V14ZM14 16V30.2432H16V16H14ZM21.129 19.3514H29.0968V17.3514H21.129V19.3514ZM33 13V30.2432H35V13H33ZM33.1758 29.6769C32.513 30.6414 32.0806 31.5862 32.0806 32.6216C32.0806 33.6571 32.513 34.6018 33.1758 35.5664L34.8242 34.4336C34.2612 33.6144 34.0806 33.0726 34.0806 32.6216C34.0806 32.1706 34.2612 31.6288 34.8242 30.8096L33.1758 29.6769ZM17.4516 31.2432H34V29.2432H17.4516V31.2432ZM14 30.2432V32.6216H16V30.2432H14ZM17.4516 29.2432C16.524 29.2432 15.6728 29.6838 15.0698 30.2687C14.4688 30.8518 14 31.6909 14 32.6216H16C16 32.3631 16.1441 32.0131 16.4624 31.7042C16.7789 31.3973 17.1534 31.2432 17.4516 31.2432V29.2432ZM21.129 22.9189H29.0968V20.9189H21.129V22.9189ZM17.3784 34C16.6171 34 16 33.3829 16 32.6216H14C14 34.4874 15.5126 36 17.3784 36V34ZM18 12C15.7909 12 14 13.7909 14 16H16C16 14.8954 16.8954 14 18 14V12Z"
            fill={pathStroke}
          />
        </svg>
      );
    }

    case 'sales': {
      const circleFill = disabled ? 'none' : color || '#DDFAF1';
      const pathStroke = disabled ? '#eee' : color || '#1CBD8D';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.17" stroke={circleStroke} />
          <path
            d="M38 25C38 25.9346 36.9791 26.7644 35.4006 27.2857C34.3142 27.6445 32.9636 27.8571 31.5 27.8571C30.0364 27.8571 28.6858 27.6445 27.5994 27.2857C26.0209 26.7644 25 25.9346 25 25M25 25C25 23.422 22.0899 22.1429 18.5 22.1429C14.9101 22.1429 12 23.422 12 25M25 25C25 25.9346 23.9791 26.7644 22.4006 27.2857C21.3142 27.6445 19.9636 27.8571 18.5 27.8571C17.0364 27.8571 15.6858 27.6445 14.5994 27.2857C13.0209 26.7644 12 25.9346 12 25M25 25V34.1429C25 35.7208 22.0899 37 18.5 37C14.9101 37 12 35.7208 12 34.1429V25M25 25V15.8571M12 29.5714C12 30.5061 13.0209 31.3359 14.5994 31.8571C15.6858 32.2159 17.0364 32.4286 18.5 32.4286C19.9636 32.4286 21.3142 32.2159 22.4006 31.8571C23.9791 31.3359 25 30.5061 25 29.5714C25 31.1494 27.9101 32.4286 31.5 32.4286C35.0899 32.4286 38 31.1494 38 29.5714V15.8571M38 20.4286C38 21.3632 36.9791 22.193 35.4006 22.7143C34.3142 23.0731 32.9636 23.2857 31.5 23.2857C30.0364 23.2857 28.6858 23.0731 27.5994 22.7143C26.0209 22.193 25 21.3632 25 20.4286M38 15.8571C38 14.2792 35.0899 13 31.5 13C27.9101 13 25 14.2792 25 15.8571M38 15.8571C38 16.7918 36.9791 17.6216 35.4006 18.1429C34.3142 18.5017 32.9636 18.7143 31.5 18.7143C30.0364 18.7143 28.6858 18.5017 27.5994 18.1429C26.0209 17.6216 25 16.7918 25 15.8571"
            stroke={pathStroke}
            strokeWidth="2"
          />
        </svg>
      );
    }

    case 'chefs': {
      const circleFill = disabled ? 'none' : color || '#4636FF';
      const pathStroke = disabled ? '#eee' : color || '#7169D1';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.13" stroke={circleStroke} />
          <path
            d="M17.9556 25.4429L18.6991 20.6511M17.9556 25.4429C23.5874 22.7377 30.433 24.2087 33.0136 25.4429M17.9556 25.4429C15.9408 25.7763 16.0517 28.1032 17.9431 28.4775C18.2341 32.5356 19.9038 36.954 25.3433 36.954C30.8051 36.954 32.9026 32.5805 33.1572 28.4775C34.8332 28.1032 35.0825 26.0256 33.0136 25.4429M18.6991 20.6511C15.9516 20.6511 15.5747 18.5818 16.3616 17.1265C17.9552 14.1791 24.0306 13.9999 25.1497 14C26.507 14.0001 33.2207 14.1791 34.4768 17.1264C35.0964 18.5804 35.1686 20.3804 32.2983 20.6511M18.6991 20.6511C18.6991 20.6511 20.1001 20.4524 20.6197 19.9054M32.2983 20.6511L33.0136 25.4429M32.2983 20.6511C31.5167 20.7935 29.1761 20.5697 28.2223 18.9483"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    case 'masterClass': {
      const circleFill = disabled ? 'none' : color || '#4636FF';
      const pathStroke = disabled ? '#eee' : color || '#7169D1';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="24.5" fill={circleFill} stroke={circleStroke} fillOpacity="0.17" />
          <path
            d="M13 19.5512C13 18.8454 13.7394 18 15.0181 18H26.4363C27.715 18 28.4544 18.8454 28.4544 19.5512V31.4488C28.4544 32.1546 27.715 33 26.4363 33H15.0181C13.7394 33 13 32.1546 13 31.4488V19.5512ZM38 19.5512V32.1297C38 32.1514 37.9899 32.2658 37.7614 32.3557C37.5365 32.4441 37.2792 32.4192 37.0987 32.2906L33.1041 29.445V22.2358L37.0987 19.3902C37.2792 19.2617 37.5365 19.2368 37.7614 19.3252C37.9899 19.415 38 19.5295 38 19.5512Z"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    case 'warehouse': {
      const circleFill = disabled ? 'none' : color || '#36B7FF';
      const pathStroke = disabled ? '#eee' : color || '#46ADE7';
      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.17" stroke={circleStroke} />
          <path
            d="M14 19.2812V35H36V19.2812M14 19.2812H25M14 19.2812L18.2308 14H25M36 19.2812L31.7692 14H25M36 19.2812H25M25 19.2812V14"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    case 'items':
      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={color || '#E4F6F1'} fillOpacity="0.17" />
          <path
            d="M25 24H14V35H25M25 24V35M25 24H36V35H25M19.5 13H30.5V24H19.5V13Z"
            stroke="#1CBD8D"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'menu': {
      const circleFill = disabled ? 'none' : color || '#36B7FF';
      const pathStroke = disabled ? '#eee' : color || '#46ADE7';

      return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="25" fill={circleFill} fillOpacity="0.17" stroke={circleStroke} />
          <path
            d="M18.999 32C16.5707 30.1755 15 27.2712 15 24C15 18.4772 19.4772 14 25 14C30.5228 14 35 18.4772 35 24C35 27.2712 33.4293 30.1755 31.001 32"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22.5 27C23.8807 27 25 26.2108 25 24.2778C25 22.3448 23.8807 20 22.5 20C21.1193 20 20 22.3448 20 24.2778C20 26.2108 21.1193 27 22.5 27ZM22.5 27V36"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M25 20V23.7368C25 25.3937 26.3431 26.7368 28 26.7368V26.7368M31 20V23.7368C31 25.3937 29.6569 26.7368 28 26.7368V26.7368M28 26.7368V36M28 22.5V20"
            stroke={pathStroke}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    default:
      return null;
  }
}

export const StatisticBlock: React.FC<StatisticBlockProps> = ({
  className,
  children,
  color,
  loading = false,
  name,
  role,
  title,
  type,
  value,
}) => {
  const switchBlock = (blockType?: DashboardRole): React.ReactElement => {
    switch (blockType) {
      case DashboardRole.CHEF:
        return (
          <div className={styles.statisticWhiteBlockInfoChef}>
            {type && renderIcon(type)}
            <div className="ml-20 pb-10 pt-5">
              <Typography variant="h5" className={stylesStatisticDashboard.statisticName}>
                {name}
              </Typography>
              <Typography variant="h5" className={stylesStatisticDashboard.statisticCount}>
                {loading ? <Skeleton height={34} width={80} /> : <b>{value}</b>}
              </Typography>
            </div>
          </div>
        );
      case DashboardRole.STAFF:
        return (
          <>
            <div className="d-flex align-items-center justify-content-between mb-20">
              {title && <Typography className="fz-large-18 fw-bold">{title}</Typography>}
              {type && renderIcon(type, color, value === 0)}
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <Typography>{name}</Typography>
              <Typography className="fw-bold" variant="h4" style={{ color: value === 0 ? '#eee' : color }}>
                {value}
              </Typography>
            </div>
            <>
              <Divider className="mt-15 mb-15" />
              {children}
            </>
          </>
        );
      default:
        return (
          <div className={styles.statisticWhiteBlockInfo}>
            {type && renderIcon(type)}
            <Typography variant="h5" className={stylesStatisticDashboard.statisticName}>
              {name}
            </Typography>
            <Typography variant="h5" className={stylesStatisticDashboard.statisticCount}>
              {loading ? <Skeleton height={34} width={80} /> : <b>{value}</b>}
            </Typography>
          </div>
        );
    }
  };

  return <WhiteBlock className={clsx(styles.statisticWhiteBlock, className)}>{switchBlock(role)}</WhiteBlock>;
};
