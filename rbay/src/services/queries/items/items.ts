import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis';
import { serialize } from './serialize';
import { deserialize } from './deserialize';
import { genId } from '$services/utils';
import { itemsKeys } from '$services/keys';

export const getItem = async (id: string) => {
	const item = await client.hGetAll(itemsKeys(id));

	if(!Object.keys(item).length) {
		return null;
	}

	return deserialize(id, item);
};

export const getItems = async (ids: string[]) => { };

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
	const id = genId();
	const serialized = serialize(attrs);
	await client.hSet(itemsKeys(id), serialized);

	return id;
};
