<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let weapon = {
        name: '',
        pow: '',
        add: '',
        ws: '',
        va: '',
        wl: '',
        handedness: '',
        quality: '',
    };

    const numberFields = [
        { field: 'pow', label: 'Power', type: 'number' },
        { field: 'add', label: 'Add', type: 'number' },
        { field: 'ws', label: 'Weapon Speed', type: 'number' },
        { field: 'va', label: 'Versus Armor', type: 'number' },
    ];

    const selectFields = [
        { field: 'wl', label: 'Weapon Length', type: 'select', options: ['Shortest', 'Short', 'Long', 'Longer', 'Longest'] },
        { field: 'handedness', label: 'Handedness', type: 'select', options: ['One handed', 'Two handed'] },
        { field: 'quality', label: 'Quality', type: 'select', options: ['Basic', 'Poor', 'Run of the Mill', 'Superior Quality Weapons'] },
    ];


    function closeModal() {
        dispatch('close');
    }

    function addWeapon() {
        if (!weapon.name) return;
        const detail = {
            type: 'melee',
            weapon: {
                weapon: weapon.name,
                pow: weapon.pow,
                add: weapon.add,
                ws: weapon.ws,
                va: weapon.va,
                wl: weapon.wl,
                handedness: weapon.handedness,
                quality: weapon.quality,
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
            <p class="modal-card-title">Add Custom Melee Weapon</p>
            <button class="delete" aria-label="close" on:click="{closeModal}"></button>
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
            <div class="field is-horizontal">
                <div class="field-body">
                    {#each selectFields as field}
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
                </div>
            </div>
        </section>

        <footer class="modal-card-foot">
            <button class="button is-success" on:click="{addWeapon}" disabled="{!weapon.name}">Add Weapon</button>
            <button class="button" on:click="{closeModal}">Cancel</button>
        </footer>
    </div>
</div>
