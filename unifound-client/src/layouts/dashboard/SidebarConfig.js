import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import squareOutline from '@iconify/icons-eva/message-square-outline';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(squareOutline)
  },
  {
    title: 'lost and found',
    path: '/dashboard/lostfound',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'study buddy',
    path: '/dashboard/studybuddy',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Chats',
    path: '/dashboard/chats',
    icon: getIcon(messageCircleFill)
  }
];

export default sidebarConfig;
