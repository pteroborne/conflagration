<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let weapon = {
        name: '',
        i: '',
        m: '',
        s: '',
        power: '',
    };

    const isValidRange = (value) => /^([1-6]{1})-([1-6]{1})$/.test(value);

    function validateInput(value, validatorFn) {
        if (!value || validatorFn(value)) {
            return null;
        }
        return 'Invalid input';
    }

    const textFields = [
        {field: 'i', label: 'I', type: 'text'},
        {field: 'm', label: 'M', type: 'text'},
        {field: 's', label: 'S', type: 'text'},
    ];

    function closeModal() {
        dispatch('close');
    }

    function addWeapon() {
        if (!weapon.name) return;
        const detail = {
            type: 'thrown',
            weapon: {
                weapon: weapon.name,
                i: weapon.i,
                m: weapon.m,
                s: weapon.s,
                va: weapon.va,
                power: weapon.power
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
            <p class="modal-card-title">Add Custom Thrown Weapon</p>
            <button class="delete" aria-label="close" on:click="{closeModal}"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Name
                    <div class="control">
                        <input class="input" type="text" placeholder="Weapon Name" bind:value="{weapon.name}"/>
                    </div>
                </label>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each textFields as field}
                        <div class="field">
                            <label class="label">{field.label}
                                <div class="control">
                                    <input class="input" use:setInputType="{field.type}" placeholder="1-2"
                                           bind:value="{weapon[field.field]}"/>
                                    {#if validateInput(weapon[field.field], isValidRange)}
                                        <p class="help is-danger">Please enter a valid range (e.g., 1-2)</p>
                                    {/if}
                                </div>
                            </label>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field"><label class="label">Power
                        <div class="control">
                            <input class="input" type="number" placeholder="0" bind:value="{weapon.power}"/>
                        </div>
                    </label>
                    </div>
                    <div class="field">
                        <label class="label">VA
                            <div class="control">
                                <input class="input" type="number" placeholder="0" bind:value="{weapon.VA}"/>
                            </div>
                        </label>
                    </div>
                </div>

            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{addWeapon}" disabled="{!weapon.name}">Add Weapon</button>
            <button class="button" on:click="{closeModal}">Cancel</button>
        </footer>
    </div>
</div>
