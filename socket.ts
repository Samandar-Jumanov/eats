import { Server, Socket } from 'socket.io';
import Chef from './utils/chef';
import getLocationInfo from './location';
import OrderType from './interface';

export default (io: Server) => {
   io.on('connection', async (socket: Socket) => {
      const newChef = new Chef('Chef', socket.id);
      let location;

      socket.on('userLocation', async (lat: number, long: number) => {
         location = await getLocationInfo(lat, long);
      });

      const userInfo = {
         location,
         Id: socket.id
      };

      socket.emit('userInfo', userInfo);

      socket.on('send-order', async (order: OrderType) => {
         socket.emit('response-order', 'Order is being prepared');
      });
   });
};
