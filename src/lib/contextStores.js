// contextStores.js
import { writable } from 'svelte/store';

export const characterContext = writable(null);
export const characterSkillsContext = writable([]);
export const characterArrowheadsContext = writable([]);
export const chosenWeaponsContext = writable([]);
export const characterArmorContext = writable([]);
