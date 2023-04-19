<!-- Arrowheads.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { supabase } from '$lib/supabaseClient.js';
    import {characterArrowheads} from "$lib/characterStore.js";

    export let weapon = null;

    const dispatch = createEventDispatcher();

    let arrowheads = [];
    let filteredArrowheads = [];
    let selectedArrowhead = null;

    async function fetchArrowheads() {
        const { data, error } = await supabase.from('arrowheads').select('*');
        if (data) {
            arrowheads = data;
        } else {
            console.error('Error fetching arrowheads:', error);
        }
    }

    $: if (weapon || arrowheads) {
        filterArrowheads();
    }

    function filterArrowheads() {
        const weaponAction = weapon.weapon.actions;
        const weaponType = weaponAction === 'Nock and Draw' ? 'Bow' : weaponAction === 'Fire Crossbow' ? 'Crossbow' : '';

        filteredArrowheads = arrowheads.filter((arrowhead) => arrowhead.type === weaponType);
    }

    function closeModal() {
        dispatch('close');
    }

    function addArrowhead() {
        if (!selectedArrowhead) return;

        characterArrowheads.update((store) => {
            const updatedStore = [...store];
            updatedStore.push({ ...selectedArrowhead, weaponId: weapon.weapon.id });
            return updatedStore;
        });

        closeModal();
    }


    fetchArrowheads();
</script>

<div class="modal is-active">
    <div class="modal-background" on:click="{closeModal}"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Arrowhead/Bolt for: {weapon.weapon.weapon}</p>
            <button class="delete" aria-label="close" on:click="{closeModal}"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Select Arrowhead/Bolt</label>
                <div class="control">
                    <div class="select">
                        <select bind:value="{selectedArrowhead}">
                            <option value="">Select Arrowhead/Bolt</option>
                            {#each filteredArrowheads as arrowhead}
                                <option value="{arrowhead}">{arrowhead.name}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{addArrowhead}" disabled="{!selectedArrowhead}">
                Add Arrowhead/Bolt
            </button>
            <button class="button" on:click="{closeModal}">Cancel</button>
        </footer>
    </div>
</div>
