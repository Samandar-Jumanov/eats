#!/usr/bin/env ts-node

import {program} from 'commander';
import axios from 'axios';


program.
command('extract to-do')
.description('Get all to do')
.action(async () =>{
       try {
        const response = await axios.get('localhost:3001/')
        console.log(response.data)
       } catch (error : any ) {
             console.error(error.message)
       }
});



program
  .command('set <key> <value>')
  .description('Set a key-value pair in the Redis server.')
  .action(async (key, value) => {
    try {
      const response = await axios.post('http://localhost:3000/set', { key, value });
      console.log(response.data);
    } catch (error : any ) {
      console.error(error.message);
    }
  });

program.parse(process.argv);
