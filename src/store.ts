import { writable } from "svelte/store"
import type { Link, Car } from "../types"

const searchData: Link = { baseLink: "https://www.hemmings.com/stories-api/search/listings?adtype=cars-for-sale&page=1&sort_by=recommended", max_price: "", max_year: "", min_price: '', min_year: "", query: "", companies: "", category: ""}
export let data = writable(searchData); 
export let blurCars = writable<boolean>(false);
export let query = writable<Car[] | null | "loading">(null) 
export let ip = writable<string>("http://localhost:3000")