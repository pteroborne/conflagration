// contextSetup.js
import {
    characterContext,
    characterSkillsContext,
    characterArrowheadsContext,
    chosenWeaponsContext,
    characterArmorContext,
} from './contextStores.js';
import {
    characterStore,
    characterSkillsStore,
    chosenWeaponsStore,
    characterArmor,
    characterArrowheads
} from './characterStore.js';
import {get} from "svelte/store";

export function updateContext(contextData) {
    if (contextData.mode === 'create') {
        characterContext.set(get(characterStore));
        characterSkillsContext.set(get(characterSkillsStore));
        characterArrowheadsContext.set(get(characterArrowheads));
        chosenWeaponsContext.set(get(chosenWeaponsStore));
        characterArmorContext.set(get(characterArmor));
    } else {
        characterContext.set(contextData.character);
        characterSkillsContext.set(contextData.characterSkills);
        characterArrowheadsContext.set(contextData.characterArrowheads);
        chosenWeaponsContext.set(contextData.chosenWeapons);
        characterArmorContext.set(contextData.characterArmor);
    }
}
