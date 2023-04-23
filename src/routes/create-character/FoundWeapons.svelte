<script>
    import { createEventDispatcher } from 'svelte';
    import Select from 'svelte-select';
    import CustomFoundWeaponModal from './CustomFoundWeaponModal.svelte';

    export let foundWeapons = [];

    const dispatch = createEventDispatcher();
    let selectedWeapon = null;
    let isModalOpen = false;

    function addWeapon() {
        if (!selectedWeapon) return;
        const detail = {
            type: 'found',
            weapon: {
                id: selectedWeapon.id,
                weapon: selectedWeapon.weapon,
                power: selectedWeapon.power,
                ws: selectedWeapon.ws,
                add: selectedWeapon.add,
            },
        };
        dispatch('addWeapon', detail);
        selectedWeapon = null;
    }

    function openCustomWeaponModal() {
        isModalOpen = true;
    }

    function closeCustomWeaponModal() {
        isModalOpen = false;
    }

    function handleCustomWeapon(event) {
        dispatch('addWeapon', {weapon: event.detail.weapon});
        closeCustomWeaponModal();
    }
</script>

<div class="container">
    <div class="field">
        <label class="label">Select a found weapon</label>
        <div class="control">
            <Select
                    bind:value="{selectedWeapon}"
                    items="{foundWeapons}"
                    itemId="id"
                    label="weapon"
                    placeholder="Choose a weapon..."
                    class="is-fullwidth"
            />
        </div>
    </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" on:click="{addWeapon}" disabled="{!selectedWeapon}">Add Weapon</button>
        </div>
        <div class="control">
            <button class="button is-info" on:click="{openCustomWeaponModal}">Add Custom Found Weapon</button>
        </div>
    </div>

    {#if isModalOpen}
        <CustomFoundWeaponModal on:close="{closeCustomWeaponModal}"
                                on:addWeapon="{(event) => dispatch('addWeapon', event.detail)}"/>
    {/if}
</div>
