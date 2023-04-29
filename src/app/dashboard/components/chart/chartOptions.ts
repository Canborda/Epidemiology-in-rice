import { Options } from 'highcharts';
import { ChartI } from 'src/app/models/chart.model';

export const tempSeries: ChartI[] = [
  {
    index: 'NDVI',
    standardized: [
      {
        x: 1664150400000,
        y: 0.2,
      },
      {
        x: 1667520000000,
        y: 0.62,
      },
      {
        x: 1670198400000,
        y: 0.78,
      },
      {
        x: 1672012800000,
        y: 0.5,
      },
    ],
    estimated: [
      {
        x: 1663977600000,
        y: 0.15,
      },
      {
        x: 1665532800000,
        y: 0.46,
      },
      {
        x: 1666224000000,
        y: 0.55,
      },
      {
        x: 1667174400000,
        y: 0.65,
      },
      {
        x: 1667606400000,
        y: 0.68,
      },
      {
        x: 1668643200000,
        y: 0.72,
      },
      {
        x: 1669593600000,
        y: 0.75,
      },
      {
        x: 1670025600000,
        y: 0.74,
      },
    ],
  },
  {
    index: 'EVI',
    standardized: [
      {
        x: 1664150400000,
        y: 0.5,
      },
      {
        x: 1667520000000,
        y: 0.5,
      },
      {
        x: 1670198400000,
        y: 0.5,
      },
      {
        x: 1672012800000,
        y: 0.5,
      },
    ],
    estimated: [
      {
        x: 1663977600000,
        y: 0.2,
      },
      {
        x: 1665532800000,
        y: 0.3,
      },
      {
        x: 1666224000000,
        y: 0.4,
      },
      {
        x: 1667174400000,
        y: 0.5,
      },
      {
        x: 1668643200000,
        y: 0.6,
      },
      {
        x: 1669593600000,
        y: 0.7,
      },
      {
        x: 1670025600000,
        y: 0.8,
      },
    ],
  },
];

export const tempChartOptions: Options = {
  chart: {
    borderColor: '#BBBBBB',
  },
  title: {
    text: 'NDVI',
  },
  xAxis: {
    type: 'datetime',
    minPadding: 0,
    maxPadding: 0.05,
    plotLines: [
      {
        value: 1664150400000,
      },
      {
        value: 1667520000000,
      },
      {
        value: 1670198400000,
      },
      {
        value: 1672012800000,
      },
    ],
  },
  series: [
    {
      name: 'Modelo estándar',
      type: 'line',
      color: '#00FF00',
      marker: {
        symbol: 'circle',
      },
      data: [
        {
          x: 1664150400000,
          y: 0.2,
        },
        {
          x: 1667520000000,
          y: 0.62,
        },
        {
          x: 1670198400000,
          y: 0.78,
        },
        {
          x: 1672012800000,
          y: 0.5,
        },
      ],
    },
    {
      name: 'Índice Real',
      type: 'line',
      color: '#FF0000',
      data: [
        {
          x: 1663977600000,
          y: 0.15,
        },
        {
          x: 1665532800000,
          y: 0.46,
        },
        {
          x: 1666224000000,
          y: 0.55,
        },
        {
          x: 1667174400000,
          y: 0.65,
        },
        {
          x: 1667606400000,
          y: 0.68,
        },
        {
          x: 1668643200000,
          y: 0.72,
        },
        {
          x: 1669593600000,
          y: 0.75,
        },
        {
          x: 1670025600000,
          y: 0.74,
        },
      ],
    },
  ],
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    floating: false,
  },
};
