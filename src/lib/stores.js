import { writable } from "svelte/store";
import { supabase } from "./supabaseClient";

//export const session = writable({});

export let todo = writable("");
export let todos = writable([]);
//export const user = writable(false);