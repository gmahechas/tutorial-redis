import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	const result = await client.hSet('car', {
		color: 'red',
		year: 1950,
	});
	console.log('result:::', result);
	const car = await client.hGetAll('car#ksj');

	if(!Object.keys(car).length) {
		console.log('car not found');
		return;
	}
	console.log('car:::', car);
};

run();
