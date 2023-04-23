<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    let weapon = {
        name: '',
        i: '',
        m: '',
        s: '',
        dof_i: '',
        dof_m: '',
        dof_s: '',
        va: '',
        actions: '',
        action_count: '',
    };

    const isValidDOF = (value) => /^([1-6]{1})-([1-6]{1})$/.test(value);
    const isValidRange = (value) => /^[BWG]{1}\d+$/.test(value);

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
        {field: 'dof_i', label: 'DoF I', type: 'text'},
        {field: 'dof_m', label: 'DoF M', type: 'text'},
        {field: 'dof_s', label: 'DoF S', type: 'text'},
    ];

    const selectFields = [
        {field: 'actions', label: 'Actions', type: 'select', options: ['Nock and Draw', 'Fire Gun', 'Fire Crossbow']},
    ];

    function closeModal() {
        dispatch('close');
    }

    function addWeapon() {
        if (!weapon.name) return;
        const detail = {
            type: 'ranged',
            weapon: {
                weapon: weapon.name,
                i: weapon.i,
                m: weapon.m,
                s: weapon.s,
                dof_i: weapon.dof_i,
                dof_m: weapon.dof_m,
                dof_s: weapon.dof_s,
                va: weapon.va,
                actions: weapon.actions,
                action_count: weapon.action_count,
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
            <p class="modal-card-title">Add Custom Missile Weapon</p>
            <button class="delete" aria-label="close" on:click="{closeModal}"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Weapon Name" bind:value="{weapon.name}"/>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each textFields.slice(3) as field}
                        <div class="field">
                            <label class="label">{field.label}</label>
                            <div class="control">
                                <input class="input" use:setInputType="{field.type}" placeholder="1-2"
                                       bind:value="{weapon[field.field]}"/>
                                {#if validateInput(weapon[field.field], isValidDOF)}
                                    <p class="help is-danger">Please enter a valid range (e.g., 1-2)</p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each textFields.slice(0, 3) as field}
                        <div class="field">
                            <label class="label">{field.label}</label>
                            <div class="control">
                                <input class="input" use:setInputType="{field.type}" placeholder="B4"
                                       bind:value="{weapon[field.field]}"/>
                                {#if validateInput(weapon[field.field], isValidRange)}
                                    <p class="help is-danger">Please enter a valid value (e.g., B10)</p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">VA</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="0" bind:value="{weapon.VA}"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each selectFields.slice(-1) as field}
                        <div class="field">
                            <label class="label">{field.label}</label>
                            <div class="control">
                                <div class="select">
                                    <select bind:value="{weapon[field.field]}">
                                        <option value="">Select {field.label}</option>
                                        {#each field.options as option}
                                            <option>{option}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/each}
                    <div class="field">
                        <label class="label">Number of Actions</label>
                        <div class="control">
                            <input class="input" type="number" placeholder="Number of Actions" bind:value="{weapon.action_count}" />
                        </div>
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
