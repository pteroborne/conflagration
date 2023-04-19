<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let weapon = {
        name: '',
        power: '',
        ws: '',
        add: '',
    };

    const numberFields = [
        { field: 'power', label: 'Power', type: 'number' },
        { field: 'ws', label: 'Weapon Speed', type: 'number' },
        { field: 'add', label: 'Add', type: 'number' },
    ];

    function closeModal() {
        dispatch('close');
    }

    function addWeapon() {
        if (!weapon.name) return;
        const detail = {
            type: 'found',
            weapon: {
                weapon: weapon.name,
                power: weapon.power,
                ws: weapon.ws,
                add: weapon.add,
            },
        };
        dispatch('addWeapon', detail);
        closeModal();
    }

    function setInputType(node, type) {
        node.type = type;
        return {
            update(newType) {
                node.type = newType;
            },
        };
    }
</script>

<div class="modal is-active">
    <div class="modal-background" on:click="{closeModal}"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Custom Found Weapon
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Weapon Name" bind:value="{weapon.name}" />
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each numberFields as field}
                        <div class="field">
                            <label class="label">{field.label}</label>
                            <div class="control">
                                <input class="input" use:setInputType="{field.type}" placeholder="{field.label}" bind:value="{weapon[field.field]}" />
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{addWeapon}" disabled="{!weapon.name}">Add Weapon</button>
            <button class="button" on:click="{closeModal}">Cancel</button>
        </footer>
    </div>
</div>
