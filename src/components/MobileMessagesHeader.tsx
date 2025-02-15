import styled from 'styled-components';
import ArrowLeftWhite from '../../public/assets/images/ArrowLeftWhite.svg';
import MobileFixedHeader from './MobileFixedHeader';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MobileMessageHeaderProps {
  titleText: string;
  onMenuClick: () => unknown;
}

export default function MobileMessagesHeader({
  titleText,
  onMenuClick,
}: MobileMessageHeaderProps) {
  const router = useRouter();
  return (
    <MobileFixedHeader>
      <Menu
        width={30}
        height={30}
        src={'/assets/images/MobileWhiteHamburgerMenu.svg'}
        onClick={onMenuClick}
      />
      <UserDisplay>{shortAddress(titleText)}</UserDisplay>
      <GoBack
        width={20}
        height={20}
        src={ArrowLeftWhite}
        onClick={() => router.back()}
      />
    </MobileFixedHeader>
  );
}

const UserDisplay = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 16px;
`;

const GoBack = styled(Image)`
  cursor: pointer;
`;

const Menu = styled(Image)`
  cursor: pointer;
`;

function shortAddress(str: string): string {
  if (str.length > 20) {
    return str.slice(0, 6) + '...' + str.slice(-5);
  } else return str;
}
