<script>
    import {createEventDispatcher} from 'svelte';
    import Select from 'svelte-select';
    import CustomThrownWeaponModal from './CustomThrownWeaponModal.svelte';

    export let thrownWeapons = [];

    let selectedWeapon = null;
    let customThrownWeaponModalOpen = false;

    const dispatch = createEventDispatcher();

    function addWeapon() {
        if (!selectedWeapon) return;
        const detail = {
            type: 'thrown',
            weapon: {
                id: selectedWeapon.id,
                weapon: selectedWeapon.weapon,
                dof_i: selectedWeapon.dof_i,
                dof_m: selectedWeapon.dof_m,
                dof_s: selectedWeapon.dof_s,
                va: selectedWeapon.va,
                power: selectedWeapon.power
            },
        };
        dispatch('addWeapon', detail);
        selectedWeapon = null;
    }

    function openCustomThrownWeaponModal() {
        customThrownWeaponModalOpen = true;
    }
</script>

<div class="field">
    <label class="label">Select a thrown weapon:</label>
    <div class="control">
        <Select bind:value="{selectedWeapon}"
                label="weapon"
                items="{thrownWeapons}"
                itemID="id"
                placeholder="Choose a weapon..."
        />
    </div>
</div>

<div class="control">
    <button class="button is-primary" on:click="{addWeapon}" disabled="{!selectedWeapon}">
        Add Weapon
    </button>
    <button class="button is-primary is-info ml-2" on:click="{openCustomThrownWeaponModal}">
        Custom Thrown Weapon
    </button>
</div>

{#if customThrownWeaponModalOpen}
    <CustomThrownWeaponModal on:close="{() => (customThrownWeaponModalOpen = false)}"
                             on:addWeapon="{(event) => dispatch('addWeapon', event.detail)}"/>
{/if}
