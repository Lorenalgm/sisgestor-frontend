import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Configurações',
    path: '/exercicios',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Exercícios',
        path: '/exercicios',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Programas Tipos',
        path: '/programas_tipos',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Fontes Tipos',
        path: '/acoes_tipos',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Ações Tipos',
        path: '/programas_tipos',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Natureza de despesa',
        path: '/naturezas_despesas',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Instituições',
        path: '/instituicoes',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Unidades gestoras',
        path: '/unidades_gestoras',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Unidades administrativas',
        path: '/unidades_administrativas',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Centro de Custo',
        path: '/centros_custos',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Usuários',
        path: '/usuarios',
        icon: <IoIcons.IoIosPaper />
      }

    ]
  },
  {
    title: 'Matriz orçamentária',
    path: '/exercicios',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Matriz instituição',
        path: '/matrizes_orcamentarias_instituicoes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Matriz gestora',
        path: '/matrizes_orcamentarias_gestoras',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Matriz administrativa',
        path: '/matrizes_orcamentarias_administrativas',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
];