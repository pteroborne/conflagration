<script>
    import {createEventDispatcher} from 'svelte';
    import Select from 'svelte-select';
    import CustomMissileModal from './CustomMissileModal.svelte';

    export let rangedWeapons = [];

    let selectedWeapon = null;
    let arrowheadsModalOpen = false;

    const dispatch = createEventDispatcher();

    function addWeapon() {
        if (!selectedWeapon) return;
        const detail = {
            type: 'ranged',
            weapon: {
                id: selectedWeapon.id,
                weapon: selectedWeapon.weapon,
                I: selectedWeapon.I,
                M: selectedWeapon.M,
                S: selectedWeapon.S,
                DOF_I: selectedWeapon.DOF_I,
                DOF_M: selectedWeapon.DOF_M,
                DOF_S: selectedWeapon.DOF_S,
                VA: selectedWeapon.VA,
                actions: selectedWeapon.actions,
            },
        };
        dispatch('addWeapon', detail);
        selectedWeapon = null;
    }

    function openCustomMissileModal() {
        arrowheadsModalOpen = true;
    }
</script>

<div class="field">
    <label class="label">Select a ranged weapon:</label>
    <div class="control">
        <Select bind:value="{selectedWeapon}"
                label="weapon"
                items="{rangedWeapons}"
                itemID="id"
                placeholder="Choose a weapon..."
        />
    </div>
</div>

<div class="control">
    <button class="button is-primary" on:click="{addWeapon}" disabled="{!selectedWeapon}">
        Add Weapon
    </button>
    <button class="button is-primary is-info ml-2" on:click="{openCustomMissileModal}">
        Custom Missile Weapon
    </button>
</div>

{#if arrowheadsModalOpen}
    <CustomMissileModal on:close="{() => (arrowheadsModalOpen = false)}"
                        on:addWeapon="{(event) => dispatch('addWeapon', event.detail)}"/>
{/if}
