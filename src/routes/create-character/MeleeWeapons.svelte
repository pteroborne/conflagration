<script>
    import {createEventDispatcher} from 'svelte';
    import Select from 'svelte-select';
    import CustomItemModal from './CustomItemModal.svelte';

    export let meleeWeapons = [];

    const dispatch = createEventDispatcher();
    let selectedWeapon = null;
    let isModalOpen = false;

    // MeleeWeapons.svelte
    function addWeapon() {
        if (!selectedWeapon) return;
        const detail = {
            type: 'melee',
            weapon: {
                id: selectedWeapon.id,
                weapon: selectedWeapon.weapon,
                power: selectedWeapon.power,
                add: selectedWeapon.add,
                ws: selectedWeapon.ws,
                va: selectedWeapon.va,
                wl: selectedWeapon.wl,
                handedness: selectedWeapon.handedness,
                quality: selectedWeapon.quality,
            },
        };
        dispatch('addWeapon', detail);
        selectedWeapon = null;
    }


    function openCustomItemModal() {
        isModalOpen = true;
    }

    function closeCustomItemModal() {
        isModalOpen = false;
    }

    const groupBy = (item) => item.quality;
</script>

<div class="container">
    <div class="field">
        <label class="label">Select a melee weapon</label>
        <div class="control">
            <Select
                    bind:value="{selectedWeapon}"
                    items="{meleeWeapons}"
                    groupBy="{groupBy}"
                    itemId="id"
                    label="weapon"
                    placeholder="Choose a weapon..."
                    class="is-fullwidth"
            />
        </div>
    </div>

    <div class="field is-grouped">
        <div class="control">
            <button class="button is-primary" on:click="{addWeapon}" disabled="{!selectedWeapon}">Add Weapon
            </button>
        </div>
        <div class="control">
            <button class="button is-info" on:click="{openCustomItemModal}">Add Custom Melee Weapon</button>
        </div>
    </div>

    {#if isModalOpen}
        <CustomItemModal on:close="{closeCustomItemModal}"
                         on:addWeapon="{(event) => dispatch('addWeapon', event.detail)}"/>
    {/if}
</div>
