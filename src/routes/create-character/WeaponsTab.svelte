<script>
    import {onMount} from 'svelte';
    import {supabase} from "$lib/supabaseClient.js";
    import {chosenWeaponsStore, characterArrowheads} from "$lib/characterStore.js";
    import MeleeWeapons from './MeleeWeapons.svelte';
    import RangedWeapons from './RangedWeapons.svelte';
    import ThrownWeapons from './ThrownWeapons.svelte';
    import FoundWeapons from './FoundWeapons.svelte';
    import MeleeCustomization from './MeleeCustomization.svelte';
    import Arrowheads from "./Arrowheads.svelte";


    let meleeWeapons = [];
    let rangedWeapons = [];
    let arrowheads = [];
    let thrownWeapons = [];
    let foundWeapons = [];
    let customizationModal = null;
    let weaponBeingCustomized = null;

    async function fetchWeapons() {
        const {data: meleeData} = await supabase.from('melee_weapons').select('*');
        meleeWeapons = meleeData;

        const {data: rangedData} = await supabase.from('missile_weapon').select('*');
        rangedWeapons = rangedData;

        const {data: arrowheadsData} = await supabase.from('arrowheads').select('*');
        arrowheads = arrowheadsData;

        const {data: thrownData} = await supabase.from('thrown_weapons').select('*');
        thrownWeapons = thrownData;

        const {data: foundData} = await supabase.from('found_weapons').select('*');
        foundWeapons = foundData;
    }

    onMount(() => {
        fetchWeapons();
    });

    function handleWeaponSelected(event) {
        chosenWeaponsStore.update((weapons) => {
            return [...weapons, event.detail];
        });
    }

    function customizeWeapon(weapon) {
        weaponBeingCustomized = weapon;
        if (weapon.type === 'melee') {
            customizationModal = 'melee';
        } else if (weapon.type === 'ranged') {
            customizationModal = 'arrowheads';
        }
        // No customization for thrown or found weapons
    }

    function handleCloseCustomizationModal() {
        customizationModal = null;
    }

    function handleCustomizeWeapon(event) {
        // Update the chosen weapon in the store with the customized version
        let index = $chosenWeaponsStore.findIndex((w) => w.id === event.detail.weapon.id);
        if (index !== -1) {
            $chosenWeaponsStore[index] = event.detail.weapon;
            chosenWeaponsStore.set($chosenWeaponsStore);
        }
        customizationModal = null;
    }


    function groupBy(array, key) {
        return array.reduce((result, currentItem) => {
            (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
            return result;
        }, {});
    }

</script>

<h2>Melee Weapons</h2>
<MeleeWeapons {meleeWeapons} on:addWeapon="{handleWeaponSelected}"/>

<h2>Ranged Weapons</h2>
<RangedWeapons {rangedWeapons} on:addWeapon="{handleWeaponSelected}"/>

<h2>Thrown Weapons</h2>
<ThrownWeapons {thrownWeapons} on:addWeapon="{handleWeaponSelected}"/>

<h2>Found Weapons</h2>
<FoundWeapons {foundWeapons} on:addWeapon="{handleWeaponSelected}"/>

<h2>Chosen Weapons</h2>
<div class="weapons-container">
    {#each Object.entries(groupBy($chosenWeaponsStore, 'type')) as [type, weapons]}
        <h3>{type[0].toUpperCase() + type.slice(1)} Weapons</h3>
        <ul class="weapons-list">
            {#each weapons as weapon}
                <li>
                    {weapon.weapon.weapon}
                    {#if weapon.type === 'melee' || weapon.type === 'ranged'}
                        <button class="button is-small is-primary is-light is-pulled-right"
                                on:click={() => customizeWeapon(weapon)}>
                            Customize
                        </button>
                    {/if}
                    {#if weapon.type === 'ranged'}
                        <ul class="arrowheads-list">
                            {#each $characterArrowheads.filter(arrowhead => arrowhead.weaponId === weapon.weapon.id) as arrowhead}
                                <li>{arrowhead.name}</li>
                            {/each}
                        </ul>
                    {/if}
                </li>
            {/each}
        </ul>
    {/each}
</div>

<!--Modal for Customizing the Melee Weapons-->
{#if customizationModal === 'melee'}
    <MeleeCustomization
            weapon="{weaponBeingCustomized}"
            on:close="{handleCloseCustomizationModal}"
            on:customizeWeapon="{handleCustomizeWeapon}"
    />
{/if}

<!-- Modal for Arrowheads -->
{#if customizationModal === 'arrowheads'}
    <Arrowheads
            weapon="{weaponBeingCustomized}"
            on:close="{handleCloseCustomizationModal}"
            on:addArrowhead="{handleCustomizeWeapon}"
    />
{/if}



<!-- WeaponsTab.svelte -->

<style>
    .weapons-list {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        padding: 0;
    }

    .weapons-list li {
        background-color: #f5f5f5;
        border: 1px solid #ddd;
        margin: 0 0 10px;
        padding: 10px;
        font-size: 1.1em;
        position: relative;
    }

    .arrowheads-list {
        list-style-type: none;
        padding: 0;
        margin: 10px 0 0;
        font-size: 0.9em;
    }

    .arrowheads-list li {
        background-color: #e6e6e6;
        border: 1px solid #ddd;
        margin: 0 0 5px;
        padding: 5px;
        border-radius: 4px;
    }
</style>
