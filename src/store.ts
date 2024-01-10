import { writable } from 'svelte/store';
import type {Car} from '../types'

// Sample data store
export const search = writable<string>('Initial Data');

export const query = writable <Car[] | null>(null);