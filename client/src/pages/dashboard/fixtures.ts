import { ParcelStatus } from '../../enums';

export const fixtures = {
  allUsers: 1_000,
  incomes: 20_000,
  expenses: 5_425,
  orders: [
    {
      id: '1',
      receiver: 'User 1',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Kyiv',
        street: 'Khreshchatyk 1',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 100,
      createdAt: '12/05/2023',
    },
    {
      id: '2',
      receiver: 'User 2',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Lviv',
        street: 'Khreshchatyk 2',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 200,
      createdAt: '12/06/2023',
    },
    {
      id: '3',
      receiver: 'User 3',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Odessa',
        street: 'Khreshchatyk 3',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 300,
      createdAt: '12/07/2023',
    },
    {
      id: '4',
      receiver: 'User 4',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Dnipro',
        street: 'Khreshchatyk 4',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 400,
      createdAt: '12/08/2023',
    },
    {
      id: '5',
      receiver: 'User 5',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Chernivtsi',
        street: 'Khreshchatyk 5',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 500,
      createdAt: '12/09/2023',
    },
    {
      id: '6',
      receiver: 'User 6',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Zhytomyr',
        street: 'Khreshchatyk 6',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 600,
      createdAt: '12/12/2023',
    },
    {
      id: '7',
      receiver: 'User 7',
      destinationPostOffice: null,
      destinationAddress: {
        city: 'Vinnytsia',
        street: 'Khreshchatyk 7',
        tel: '+380123456789',
      },
      status: ParcelStatus.REGISTERED,
      price: 700,
      createdAt: '12/11/2023',
    },
  ],
  packages: {
    week: {
      dataPoints: {
        All: [
          {
            date: '12/05/2023',
            value: 636,
          },
          {
            date: '12/06/2023',
            value: 276,
          },
          {
            date: '12/07/2023',
            value: 477,
          },
          {
            date: '12/08/2023',
            value: 781,
          },
          {
            date: '12/09/2023',
            value: 967,
          },
          {
            date: '12/12/2023',
            value: 1067,
          },
          {
            date: '12/11/2023',
            value: 904,
          },
        ],
        Kyiv: [
          { date: '12/05/2023', value: 117 },
          { date: '12/06/2023', value: 13 },
          { date: '12/07/2023', value: 45 },
          { date: '12/08/2023', value: 9 },
          { date: '12/09/2023', value: 651 },
          { date: '12/12/2023', value: 458 },
          { date: '12/11/2023', value: 14 },
        ],
        Lviv: [
          { date: '12/05/2023', value: 67 },
          { date: '12/06/2023', value: 1 },
          { date: '12/07/2023', value: 79 },
          { date: '12/08/2023', value: 13 },
          { date: '12/09/2023', value: 12 },
          { date: '12/12/2023', value: 2 },
          { date: '12/11/2023', value: 5 },
        ],
        Odessa: [
          { date: '12/05/2023', value: 11 },
          { date: '12/06/2023', value: 2 },
          { date: '12/07/2023', value: 21 },
          { date: '12/08/2023', value: 89 },
          { date: '12/09/2023', value: 204 },
          { date: '12/12/2023', value: 80 },
          { date: '12/11/2023', value: 54 },
        ],
        Dnipro: [
          { date: '12/05/2023', value: 23 },
          { date: '12/06/2023', value: 4 },
          { date: '12/07/2023', value: 173 },
          { date: '12/08/2023', value: 0 },
          { date: '12/09/2023', value: 86 },
          { date: '12/12/2023', value: 421 },
          { date: '12/11/2023', value: 173 },
        ],
        Chernivtsi: [
          { date: '12/05/2023', value: 409 },
          { date: '12/06/2023', value: 2 },
          { date: '12/07/2023', value: 0 },
          { date: '12/08/2023', value: 644 },
          { date: '12/09/2023', value: 6 },
          { date: '12/12/2023', value: 63 },
          { date: '12/11/2023', value: 555 },
        ],
        Zhytomyr: [
          { date: '12/05/2023', value: 6 },
          { date: '12/06/2023', value: 82 },
          { date: '12/07/2023', value: 132 },
          { date: '12/08/2023', value: 3 },
          { date: '12/09/2023', value: 0 },
          { date: '12/12/2023', value: 41 },
          { date: '12/11/2023', value: 85 },
        ],
        Vinnytsia: [
          { date: '12/05/2023', value: 3 },
          { date: '12/06/2023', value: 172 },
          { date: '12/07/2023', value: 27 },
          { date: '12/08/2023', value: 23 },
          { date: '12/09/2023', value: 8 },
          { date: '12/12/2023', value: 2 },
          { date: '12/11/2023', value: 18 },
        ],
      },
    },
    month: {
      dataPoints: {
        All: [
          {
            date: '09/11/2023',
            value: 598,
          },
          {
            date: '09/12/2023',
            value: 307,
          },
          {
            date: '09/13/2023',
            value: 931,
          },
          {
            date: '09/14/2023',
            value: 377,
          },
          {
            date: '09/15/2023',
            value: 616,
          },
          {
            date: '09/16/2023',
            value: 981,
          },
          {
            date: '09/17/2023',
            value: 1155,
          },
          {
            date: '09/18/2023',
            value: 500,
          },
          {
            date: '09/19/2023',
            value: 506,
          },
          {
            date: '09/20/2023',
            value: 1126,
          },
          {
            date: '09/21/2023',
            value: 222,
          },
          {
            date: '09/22/2023',
            value: 932,
          },
          {
            date: '09/23/2023',
            value: 814,
          },
          {
            date: '09/24/2023',
            value: 800,
          },
          {
            date: '09/25/2023',
            value: 1004,
          },
          {
            date: '09/26/2023',
            value: 1006,
          },
          {
            date: '09/27/2023',
            value: 445,
          },
          {
            date: '09/28/2023',
            value: 468,
          },
          {
            date: '09/29/2023',
            value: 1092,
          },
          {
            date: '09/30/2023',
            value: 939,
          },
          {
            date: '12/01/2023',
            value: 620,
          },
          {
            date: '12/02/2023',
            value: 638,
          },
          {
            date: '12/03/2023',
            value: 680,
          },
          {
            date: '12/04/2023',
            value: 1100,
          },
          {
            date: '12/05/2023',
            value: 636,
          },
          {
            date: '12/06/2023',
            value: 276,
          },
          {
            date: '12/07/2023',
            value: 477,
          },
          {
            date: '12/08/2023',
            value: 781,
          },
          {
            date: '12/09/2023',
            value: 967,
          },
          {
            date: '12/12/2023',
            value: 1067,
          },
          {
            date: '12/11/2023',
            value: 904,
          },
        ],
        Kyiv: [
          {
            date: '09/11/2023',
            value: 91,
          },
          {
            date: '09/12/2023',
            value: 45,
          },
          {
            date: '09/13/2023',
            value: 92,
          },
          {
            date: '09/14/2023',
            value: 61,
          },
          {
            date: '09/15/2023',
            value: 35,
          },
          {
            date: '09/16/2023',
            value: 60,
          },
          {
            date: '09/17/2023',
            value: 37,
          },
          {
            date: '09/18/2023',
            value: 75,
          },
          {
            date: '09/19/2023',
            value: 26,
          },
          {
            date: '09/20/2023',
            value: 45,
          },
          {
            date: '09/21/2023',
            value: 100,
          },
          {
            date: '09/22/2023',
            value: 69,
          },
          {
            date: '09/23/2023',
            value: 40,
          },
          {
            date: '09/24/2023',
            value: 71,
          },
          {
            date: '09/25/2023',
            value: 59,
          },
          {
            date: '09/26/2023',
            value: 78,
          },
          {
            date: '09/27/2023',
            value: 59,
          },
          {
            date: '09/28/2023',
            value: 67,
          },
          {
            date: '09/29/2023',
            value: 38,
          },
          {
            date: '09/30/2023',
            value: 81,
          },
          {
            date: '12/01/2023',
            value: 66,
          },
          {
            date: '12/02/2023',
            value: 37,
          },
          {
            date: '12/03/2023',
            value: 62,
          },
          {
            date: '12/04/2023',
            value: 29,
          },
          {
            date: '12/05/2023',
            value: 45,
          },
          {
            date: '12/06/2023',
            value: 71,
          },
          {
            date: '12/07/2023',
            value: 46,
          },
          {
            date: '12/08/2023',
            value: 11,
          },
          {
            date: '12/09/2023',
            value: 42,
          },
          {
            date: '12/12/2023',
            value: 13,
          },
          {
            date: '12/11/2023',
            value: 97,
          },
        ],
        Lviv: [
          {
            date: '09/11/2023',
            value: 44,
          },
          {
            date: '09/12/2023',
            value: 17,
          },
          {
            date: '09/13/2023',
            value: 15,
          },
          {
            date: '09/14/2023',
            value: 97,
          },
          {
            date: '09/15/2023',
            value: 69,
          },
          {
            date: '09/16/2023',
            value: 13,
          },
          {
            date: '09/17/2023',
            value: 89,
          },
          {
            date: '09/18/2023',
            value: 7,
          },
          {
            date: '09/19/2023',
            value: 71,
          },
          {
            date: '09/20/2023',
            value: 45,
          },
          {
            date: '09/21/2023',
            value: 3,
          },
          {
            date: '09/22/2023',
            value: 63,
          },
          {
            date: '09/23/2023',
            value: 3,
          },
          {
            date: '09/24/2023',
            value: 6,
          },
          {
            date: '09/25/2023',
            value: 4,
          },
          {
            date: '09/26/2023',
            value: 68,
          },
          {
            date: '09/27/2023',
            value: 94,
          },
          {
            date: '09/28/2023',
            value: 76,
          },
          {
            date: '09/29/2023',
            value: 5,
          },
          {
            date: '09/30/2023',
            value: 18,
          },
          {
            date: '12/01/2023',
            value: 100,
          },
          {
            date: '12/02/2023',
            value: 94,
          },
          {
            date: '12/03/2023',
            value: 94,
          },
          {
            date: '12/04/2023',
            value: 48,
          },
          {
            date: '12/05/2023',
            value: 1,
          },
          {
            date: '12/06/2023',
            value: 100,
          },
          {
            date: '12/07/2023',
            value: 91,
          },
          {
            date: '12/08/2023',
            value: 88,
          },
          {
            date: '12/09/2023',
            value: 64,
          },
          {
            date: '12/12/2023',
            value: 100,
          },
          {
            date: '12/11/2023',
            value: 76,
          },
        ],
        Odessa: [
          {
            date: '09/11/2023',
            value: 78,
          },
          {
            date: '09/12/2023',
            value: 34,
          },
          {
            date: '09/13/2023',
            value: 3,
          },
          {
            date: '09/14/2023',
            value: 51,
          },
          {
            date: '09/15/2023',
            value: 89,
          },
          {
            date: '09/16/2023',
            value: 72,
          },
          {
            date: '09/17/2023',
            value: 50,
          },
          {
            date: '09/18/2023',
            value: 27,
          },
          {
            date: '09/19/2023',
            value: 51,
          },
          {
            date: '09/20/2023',
            value: 17,
          },
          {
            date: '09/21/2023',
            value: 9,
          },
          {
            date: '09/22/2023',
            value: 98,
          },
          {
            date: '09/23/2023',
            value: 20,
          },
          {
            date: '09/24/2023',
            value: 80,
          },
          {
            date: '09/25/2023',
            value: 100,
          },
          {
            date: '09/26/2023',
            value: 52,
          },
          {
            date: '09/27/2023',
            value: 32,
          },
          {
            date: '09/28/2023',
            value: 70,
          },
          {
            date: '09/29/2023',
            value: 52,
          },
          {
            date: '09/30/2023',
            value: 69,
          },
          {
            date: '12/01/2023',
            value: 90,
          },
          {
            date: '12/02/2023',
            value: 73,
          },
          {
            date: '12/03/2023',
            value: 27,
          },
          {
            date: '12/04/2023',
            value: 89,
          },
          {
            date: '12/05/2023',
            value: 98,
          },
          {
            date: '12/06/2023',
            value: 32,
          },
          {
            date: '12/07/2023',
            value: 35,
          },
          {
            date: '12/08/2023',
            value: 78,
          },
          {
            date: '12/09/2023',
            value: 84,
          },
          {
            date: '12/12/2023',
            value: 77,
          },
          {
            date: '12/11/2023',
            value: 4,
          },
        ],
        Dnipro: [
          {
            date: '09/11/2023',
            value: 38,
          },
          {
            date: '09/12/2023',
            value: 58,
          },
          {
            date: '09/13/2023',
            value: 30,
          },
          {
            date: '09/14/2023',
            value: 9,
          },
          {
            date: '09/15/2023',
            value: 27,
          },
          {
            date: '09/16/2023',
            value: 79,
          },
          {
            date: '09/17/2023',
            value: 5,
          },
          {
            date: '09/18/2023',
            value: 13,
          },
          {
            date: '09/19/2023',
            value: 53,
          },
          {
            date: '09/20/2023',
            value: 24,
          },
          {
            date: '09/21/2023',
            value: 79,
          },
          {
            date: '09/22/2023',
            value: 10,
          },
          {
            date: '09/23/2023',
            value: 62,
          },
          {
            date: '09/24/2023',
            value: 60,
          },
          {
            date: '09/25/2023',
            value: 85,
          },
          {
            date: '09/26/2023',
            value: 90,
          },
          {
            date: '09/27/2023',
            value: 39,
          },
          {
            date: '09/28/2023',
            value: 72,
          },
          {
            date: '09/29/2023',
            value: 82,
          },
          {
            date: '09/30/2023',
            value: 3,
          },
          {
            date: '12/01/2023',
            value: 3,
          },
          {
            date: '12/02/2023',
            value: 75,
          },
          {
            date: '12/03/2023',
            value: 28,
          },
          {
            date: '12/04/2023',
            value: 63,
          },
          {
            date: '12/05/2023',
            value: 94,
          },
          {
            date: '12/06/2023',
            value: 36,
          },
          {
            date: '12/07/2023',
            value: 3,
          },
          {
            date: '12/08/2023',
            value: 49,
          },
          {
            date: '12/09/2023',
            value: 45,
          },
          {
            date: '12/12/2023',
            value: 42,
          },
          {
            date: '12/11/2023',
            value: 86,
          },
        ],
        Chernivtsi: [
          {
            date: '09/11/2023',
            value: 34,
          },
          {
            date: '09/12/2023',
            value: 81,
          },
          {
            date: '09/13/2023',
            value: 96,
          },
          {
            date: '09/14/2023',
            value: 81,
          },
          {
            date: '09/15/2023',
            value: 48,
          },
          {
            date: '09/16/2023',
            value: 62,
          },
          {
            date: '09/17/2023',
            value: 14,
          },
          {
            date: '09/18/2023',
            value: 91,
          },
          {
            date: '09/19/2023',
            value: 45,
          },
          {
            date: '09/20/2023',
            value: 70,
          },
          {
            date: '09/21/2023',
            value: 30,
          },
          {
            date: '09/22/2023',
            value: 14,
          },
          {
            date: '09/23/2023',
            value: 54,
          },
          {
            date: '09/24/2023',
            value: 99,
          },
          {
            date: '09/25/2023',
            value: 42,
          },
          {
            date: '09/26/2023',
            value: 16,
          },
          {
            date: '09/27/2023',
            value: 17,
          },
          {
            date: '09/28/2023',
            value: 41,
          },
          {
            date: '09/29/2023',
            value: 26,
          },
          {
            date: '09/30/2023',
            value: 25,
          },
          {
            date: '12/01/2023',
            value: 67,
          },
          {
            date: '12/02/2023',
            value: 3,
          },
          {
            date: '12/03/2023',
            value: 20,
          },
          {
            date: '12/04/2023',
            value: 35,
          },
          {
            date: '12/05/2023',
            value: 52,
          },
          {
            date: '12/06/2023',
            value: 53,
          },
          {
            date: '12/07/2023',
            value: 24,
          },
          {
            date: '12/08/2023',
            value: 69,
          },
          {
            date: '12/09/2023',
            value: 82,
          },
          {
            date: '12/12/2023',
            value: 98,
          },
          {
            date: '12/11/2023',
            value: 92,
          },
        ],
        Zhytomyr: [
          {
            date: '09/11/2023',
            value: 70,
          },
          {
            date: '09/12/2023',
            value: 42,
          },
          {
            date: '09/13/2023',
            value: 42,
          },
          {
            date: '09/14/2023',
            value: 26,
          },
          {
            date: '09/15/2023',
            value: 25,
          },
          {
            date: '09/16/2023',
            value: 14,
          },
          {
            date: '09/17/2023',
            value: 96,
          },
          {
            date: '09/18/2023',
            value: 41,
          },
          {
            date: '09/19/2023',
            value: 71,
          },
          {
            date: '09/20/2023',
            value: 99,
          },
          {
            date: '09/21/2023',
            value: 89,
          },
          {
            date: '09/22/2023',
            value: 73,
          },
          {
            date: '09/23/2023',
            value: 19,
          },
          {
            date: '09/24/2023',
            value: 1,
          },
          {
            date: '09/25/2023',
            value: 27,
          },
          {
            date: '09/26/2023',
            value: 69,
          },
          {
            date: '09/27/2023',
            value: 33,
          },
          {
            date: '09/28/2023',
            value: 28,
          },
          {
            date: '09/29/2023',
            value: 24,
          },
          {
            date: '09/30/2023',
            value: 41,
          },
          {
            date: '12/01/2023',
            value: 50,
          },
          {
            date: '12/02/2023',
            value: 49,
          },
          {
            date: '12/03/2023',
            value: 78,
          },
          {
            date: '12/04/2023',
            value: 53,
          },
          {
            date: '12/05/2023',
            value: 79,
          },
          {
            date: '12/06/2023',
            value: 93,
          },
          {
            date: '12/07/2023',
            value: 58,
          },
          {
            date: '12/08/2023',
            value: 100,
          },
          {
            date: '12/09/2023',
            value: 49,
          },
          {
            date: '12/12/2023',
            value: 78,
          },
          {
            date: '12/11/2023',
            value: 15,
          },
        ],
        Vinnytsia: [
          {
            date: '09/11/2023',
            value: 4,
          },
          {
            date: '09/12/2023',
            value: 8,
          },
          {
            date: '09/13/2023',
            value: 55,
          },
          {
            date: '09/14/2023',
            value: 38,
          },
          {
            date: '09/15/2023',
            value: 66,
          },
          {
            date: '09/16/2023',
            value: 43,
          },
          {
            date: '09/17/2023',
            value: 54,
          },
          {
            date: '09/18/2023',
            value: 50,
          },
          {
            date: '09/19/2023',
            value: 11,
          },
          {
            date: '09/20/2023',
            value: 47,
          },
          {
            date: '09/21/2023',
            value: 68,
          },
          {
            date: '09/22/2023',
            value: 51,
          },
          {
            date: '09/23/2023',
            value: 20,
          },
          {
            date: '09/24/2023',
            value: 41,
          },
          {
            date: '09/25/2023',
            value: 13,
          },
          {
            date: '09/26/2023',
            value: 45,
          },
          {
            date: '09/27/2023',
            value: 97,
          },
          {
            date: '09/28/2023',
            value: 84,
          },
          {
            date: '09/29/2023',
            value: 66,
          },
          {
            date: '09/30/2023',
            value: 80,
          },
          {
            date: '12/01/2023',
            value: 81,
          },
          {
            date: '12/02/2023',
            value: 94,
          },
          {
            date: '12/03/2023',
            value: 8,
          },
          {
            date: '12/04/2023',
            value: 47,
          },
          {
            date: '12/05/2023',
            value: 38,
          },
          {
            date: '12/06/2023',
            value: 51,
          },
          {
            date: '12/07/2023',
            value: 68,
          },
          {
            date: '12/08/2023',
            value: 32,
          },
          {
            date: '12/09/2023',
            value: 82,
          },
          {
            date: '12/12/2023',
            value: 60,
          },
          {
            date: '12/11/2023',
            value: 71,
          },
        ],
      },
    },
  },
  notifications: [
    {
      title: 'NEWS  Package Delivery Update: Expedited Shipping Now Available',
      body: "Great news for our customers! We've introduced expedited shipping options for urgent deliveries. Now, send your packages faster to any global destination. Check our website for rates and delivery timelines.",
      date: '01/12/2024',
      group: 'news',
      isUnread: true,
    },
    {
      title: 'TRACKING Update: Your Package is On Its Way!',
      body: 'Your package has been dispatched and is on its way to its destination. Track its journey with our real-time tracking system. Stay updated on the estimated delivery time and any transit updates.',
      date: '01/09/2024',
      group: 'tracking',
      isUnread: true,
    },
    {
      title: 'ACCOUNT Update: New Branch Openings',
      body: "We're expanding! New EquatorExpress branches are opening in several cities, enhancing our network and providing you with more convenient shipping and pickup options. Visit our website to find the nearest branch.",
      date: '12/12/2023',
      group: 'account',
      isUnread: true,
    },
  ],
};
