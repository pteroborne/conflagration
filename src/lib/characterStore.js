// lib/characterStore.js
import { writable } from 'svelte/store';

const initialCharacter = {
    name: 'Unnamed',
    stock: 'man',
    fate: 0,
    persona: 0,
    deed: 0,
    will_shade: 'B',
    will_exponent: 4,
    power_shade: 'B',
    power_exponent: 4,
    agility_shade: 'B',
    agility_exponent: 4,
    perception_shade: 'B',
    perception_exponent: 4,
    forte_shade: 'B',
    forte_exponent: 4,
    speed_shade: 'B',
    speed_exponent: 4,
    health_shade: 'B',
    health_exponent: 4,
    reflexes_shade: 'B',
    reflexes_exponent: 0,
    steel_shade: 'B',
    steel_exponent: 0,
    mortal_wound_shade: 'B',
    mortal_wound_exponent: 0,
    hesitation: 0,
    emotional_attribute_name: '',
    emotional_attribute_shade: 'B',
    emotional_attribute_exponent: 0,
    su_shade: 'B',
    su_exponent: 3,
    li_shade: 'B',
    li_exponent: 4,
    mi_shade: 'B',
    mi_exponent: 5,
    se_shade: 'B',
    se_exponent: 6,
    tr_shade: 'B',
    tr_exponent: 7,
    mo_shade: 'B',
    mo_exponent: 8,
};

export const characterStore = writable(initialCharacter);

export const characterSkillsStore = writable([]);

export const characterArrowheads = writable([]);

export const chosenWeaponsStore = writable([]);

export const characterArmor = writable([]);

