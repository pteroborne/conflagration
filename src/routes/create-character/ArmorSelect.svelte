<script>
    import { createEventDispatcher } from 'svelte';

    export let label = '';
    export let options = [];
    export let defaultOption = 'None';
    export let position = { top: '0', left: '0' };
    export let showHalfArmorCheckbox = false;

    let selectedOption = defaultOption;
    let halfArmorCheckboxDisabled = true;
    const dispatch = createEventDispatcher();

    function handleArmorChange(event) {
        selectedOption = event.target.value;
        halfArmorCheckboxDisabled = selectedOption === defaultOption;
        const armor = options.find((option) => option.id === parseInt(selectedOption));
        const halfArmorCheckbox = document.getElementById(`${label}-half-armor`);
        const isHalfArmor = halfArmorCheckbox ? halfArmorCheckbox.checked : false;

        const armorData = armor ? { ...armor, isHalfArmor } : null;
        dispatch('armorSelected', { label, armorData });
    }



    function handleHalfArmorChange(event) {
        const armor = options.find((option) => option.id === parseInt(selectedOption));
        if (armor) {
            const armorData = { ...armor, isHalfArmor: event.target.checked };
            dispatch('armorSelected', { label, armorData });
        }
    }

</script>

<div class="armor-select" style="position: absolute; top: {position.top}; left: {position.left};">
    <label>{label}:</label>
    <div class="select">
        <select on:change="{handleArmorChange}">
            <option value="{defaultOption}">{defaultOption}</option>
            {#each options as option}
                <option value="{option.id}">{option.name}</option>
            {/each}
        </select>
    </div>
    {#if showHalfArmorCheckbox}
        <div style="margin-top: 8px;">
            <input
                    type="checkbox"
                    id="{label}-half-armor"
                    class="toggle-checkbox"
                    on:change="{handleHalfArmorChange}"
                    disabled="{halfArmorCheckboxDisabled}"
            />
            <label for="{label}-half-armor" class="toggle"></label>
            <label for="{label}-half-armor" style="margin-left: 4px;">Half Armor</label>
        </div>
    {/if}
</div>


<style>
    .toggle {
        display: inline-block;
        position: relative;
        width: 48px;
        height: 24px;
        border-radius: 24px;
        background-color: #d5d5d5;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .toggle-checkbox {
        display: none;
    }

    .toggle-checkbox:checked + .toggle {
        background-color: #00d1b2;
    }

    .toggle::before {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: white;
        transition: left 0.3s;
    }

    .toggle-checkbox:checked + .toggle::before {
        left: 26px;
    }
</style>