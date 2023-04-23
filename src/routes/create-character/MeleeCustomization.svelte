<script>
    import {supabase} from "$lib/supabaseClient.js";
    import {createEventDispatcher} from 'svelte';

    $: if (weapon || miscWeaponGear) {
        filterCustomizations(weapon);
    }
    export let weapon = null;

    const dispatch = createEventDispatcher();

    let miscWeaponGear = [];
    let selectedMiscGear = null;
    let weaponLengthValues = ['Shortest', 'Short', 'Long', 'Longer', 'Longest'];
    let filteredCustomizations = [];

    async function fetchMiscWeaponGear() {
        const {data, error} = await supabase.from('misc_weapon_gear').select('*');
        if (data) {
            miscWeaponGear = data;
        } else {
            console.error('Error fetching misc_weapon_gear:', error);
        }
    }

    function filterCustomizations(weapon) {
        filteredCustomizations = miscWeaponGear.filter((customization) => {
            if (customization.restrictions === 'Any') {
                return true;
            }

            const restrictions = customization.restrictions.split(',').map((r) => r.trim());
            return restrictions.some((r) => weapon.weapon.weapon.includes(r));
        });
    }


    function closeModal() {
        dispatch('close');
    }

    function customizeWeapon() {
        if (!selectedMiscGear) return;

        let customizedWeapon = {...weapon.weapon};
        customizedWeapon.weapon = `${customizedWeapon.weapon} with ${selectedMiscGear.weapon}`;
        customizedWeapon.power += selectedMiscGear.power;
        customizedWeapon.add += selectedMiscGear.add;
        customizedWeapon.ws += selectedMiscGear.ws;
        customizedWeapon.va += selectedMiscGear.va;

        if (selectedMiscGear.wl !== 0) {
            let currentWlIndex = weaponLengthValues.indexOf(customizedWeapon.wl);
            let newIndex = currentWlIndex + selectedMiscGear.wl;
            newIndex = Math.max(0, Math.min(newIndex, weaponLengthValues.length - 1));
            customizedWeapon.wl = weaponLengthValues[newIndex];
        }

        dispatch('customizeWeapon', {weapon: {...weapon, weapon: customizedWeapon}});
        closeModal();
    }

    fetchMiscWeaponGear();
</script>

<div class="modal is-active">
    <div class="modal-background" on:click="{closeModal}"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Customize Melee Weapon: {weapon.weapon.weapon}</p>
            <button class="delete" aria-label="close" on:click="{closeModal}"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Select Misc Weapon Gear</label>
                <div class="control">
                    <div class="select">
                        <select bind:value="{selectedMiscGear}">
                            <option value="">Select Customization</option>
                            {#each filteredCustomizations as customization}
                                <option value="{customization}">{customization.weapon}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{customizeWeapon}" disabled="{!selectedMiscGear}">
                Customize Weapon
            </button>
            <button class="button" on:click="{closeModal}">Cancel</button>
        </footer>
    </div>
</div>
