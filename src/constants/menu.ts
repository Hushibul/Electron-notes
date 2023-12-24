// eslint-disable-next-line import/no-unresolved
import { app } from 'electron';
import { MenuType } from '../types/menu';

export const customMenuTemplate: MenuType[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open',
        click: () => {
          // Handle 'Open' action
        },
      },
      {
        label: 'Save',
        click: () => {
          // Handle 'Save' action
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Cut',
        role: 'cut',
      },
      {
        label: 'Copy',
        role: 'copy',
      },
      {
        label: 'Paste',
        role: 'paste',
      },
    ],
  },
  // Add more menu items as needed
];
