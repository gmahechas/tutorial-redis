import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car1', {
		color: 'red',
		year: 1951
	});
	await client.hSet('car2', {
		color: 'green',
		year: 1952
	});
	await client.hSet('car3', {
		color: 'blue',
		year: 1953
	});

	const result = await Promise.allSettled([
		client.hGetAll('car1'),
		client.hGetAll('car2'),
		client.hGetAll('car3'),
		Promise.reject('one'),
		new  Promise((resolve) => setTimeout(() => resolve('two'), 2000)),
	]);

	console.log(result);
};
run();
