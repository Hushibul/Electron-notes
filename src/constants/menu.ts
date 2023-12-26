import { app } from 'electron';

export const customMenuTemplate: any = [
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
];
