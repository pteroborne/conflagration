<script>
    import {createEventDispatcher} from 'svelte';
    import CharacterFormField from './CharacterFormField.svelte';
    import CharacterFormShadedField from './CharacterFormShadedField.svelte';
    import SkillsTab from './SkillsTab.svelte';
    import {characterStore} from "$lib/characterStore.js";
    import WeaponsTab from "./WeaponsTab.svelte";
    import ArmorTab from "./ArmorTab.svelte";


    const dispatch = createEventDispatcher();

    const basicInfoFields = [
        {label: 'Name', type: 'text', key: 'name'},
        {label: 'Stock', type: 'select', key: 'stock', items: ['man', 'orc', 'troll', 'wolf', 'dwarf', 'elf', 'rat']},
        {label: 'Fate', type: 'number', key: 'fate'},
        {label: 'Persona', type: 'number', key: 'persona'},
        {label: 'Deed', type: 'number', key: 'deed'},
    ];

    const statFields = [
        {label: 'Will', key: 'will', shadeKey: 'will_shade', exponentKey: 'will_exponent'},
        {label: 'Power', key: 'power', shadeKey: 'power_shade', exponentKey: 'power_exponent'},
        {label: 'Agility', key: 'agility', shadeKey: 'agility_shade', exponentKey: 'agility_exponent'},
        {label: 'Perception', key: 'perception', shadeKey: 'perception_shade', exponentKey: 'perception_exponent'},
        {label: 'Forte', key: 'forte', shadeKey: 'forte_shade', exponentKey: 'forte_exponent'},
        {label: 'Speed', key: 'speed', shadeKey: 'speed_shade', exponentKey: 'speed_exponent'},
    ];

    const attributeFields = [
        {label: 'Health', key: 'health', shadeKey: 'health_shade', exponentKey: 'health_exponent', auto: false},
        {label: 'Reflexes', key: 'reflexes', shadeKey: 'reflexes_shade', exponentKey: 'reflexes_exponent', auto: true},
        {label: 'Steel', key: 'steel', shadeKey: 'steel_shade', exponentKey: 'steel_exponent', auto: false},
        {
            label: 'Mortal Wound (MW)',
            key: 'mortal_wound',
            shadeKey: 'mortal_wound_shade',
            exponentKey: 'mortal_wound_exponent',
            auto: true
        },
        {label: 'Hesitation', key: 'hesitation', auto: true},
        {
            label: 'Emotional Attribute',
            nameKey: 'emotional_attribute_name',
            shadeKey: 'emotional_attribute_shade',
            exponentKey: 'emotional_attribute_exponent',
            auto: false,
            isEmotionalAttribute: true
        },
    ];

    const physicalTolerancesFields = [
        {label: 'Su', type: 'select', bindValue: 'su_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'su_exponent', fieldClass: 'is-inline'},
        {label: 'Li', type: 'select', bindValue: 'li_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'li_exponent', fieldClass: 'is-inline'},
        {label: 'Mi', type: 'select', bindValue: 'mi_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'mi_exponent', fieldClass: 'is-inline'},
        {label: 'Se', type: 'select', bindValue: 'se_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'se_exponent', fieldClass: 'is-inline'},
        {label: 'Tr', type: 'select', bindValue: 'tr_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'tr_exponent', fieldClass: 'is-inline'},
        {label: 'Mo', type: 'select', bindValue: 'mo_shade', items: ['B', 'G', 'W'], fieldClass: 'is-inline'},
        {label: '', type: 'number', bindValue: 'mo_exponent', fieldClass: 'is-inline'},
    ];


    function handleSubmit() {
        // Submit the character data to the parent component
        dispatch('submit', $characterStore);
    }

    // Function to handle toggling of auto-calculation for attributes

    function calculateTolerances() {
        let su_exponent = Math.floor($characterStore.forte_exponent / 2) + 1;
        let max_gap = Math.ceil($characterStore.forte_exponent / 2);

        let li_exponent = su_exponent + Math.min(max_gap, $characterStore.mortal_wound_exponent - su_exponent - 1);
        let mi_exponent = li_exponent + Math.min(max_gap, $characterStore.mortal_wound_exponent - li_exponent - 1);
        let se_exponent = Math.max(mi_exponent, $characterStore.mortal_wound_exponent - 2);
        let tr_exponent = Math.max(se_exponent, $characterStore.mortal_wound_exponent - 1);
        let mo_exponent = $characterStore.mortal_wound_exponent;

        return {
            su_exponent,
            li_exponent,
            mi_exponent,
            se_exponent,
            tr_exponent,
            mo_exponent
        };
    }


    let enforceRules = true;

    function updateDependentValues() {
        if (enforceRules) {
            $characterStore.reflexes_exponent = Math.floor(($characterStore.agility_exponent + $characterStore.perception_exponent + $characterStore.speed_exponent) / 3);
            $characterStore.mortal_wound_exponent = Math.floor(($characterStore.power_exponent + $characterStore.forte_exponent) / 2 + 6);
            $characterStore.hesitation = 10 - $characterStore.will_exponent;
            $characterStore.su_exponent = Math.floor($characterStore.forte_exponent / 2) + 1;
            const {li_exponent, mi_exponent, se_exponent, tr_exponent, mo_exponent} = calculateTolerances();
            $characterStore = {...$characterStore, li_exponent, mi_exponent, se_exponent, tr_exponent, mo_exponent};
        }
    }

    $: {
        $characterStore;
        enforceRules;
        updateDependentValues();
        console.log('reactive')
    }


    let activeTab = 'basic';
</script>

<form class="box">
    <!--    nav tabs    -->

    <div class="tabs">
        <ul>
            <li class="{activeTab === 'basic' ? 'is-active' : ''}" on:click={() => (activeTab = 'basic')}><a>Basic
                Info</a></li>
            <li class="{activeTab === 'stats' ? 'is-active' : ''}" on:click={() => (activeTab = 'stats')}><a>Stats</a>
            </li>
            <li class="{activeTab === 'attributes' ? 'is-active' : ''}" on:click={() => (activeTab = 'attributes')}><a>Attributes</a>
            </li>
            <li class="{activeTab === 'physicalTolerances' ? 'is-active' : ''}"
                on:click={() => (activeTab = 'physicalTolerances')}><a>Physical Tolerances</a></li>
            <li class="{activeTab === 'skills' ? 'is-active' : ''}"
                on:click={() => (activeTab = 'skills')}><a>Skills</a></li>
            <li class="{activeTab === 'weapons' ? 'is-active' : ''}"
                on:click={() => (activeTab = 'weapons')}><a>Weapons</a></li>
            <li class="{activeTab === 'armor' ? 'is-active' : ''}"
                on:click={() => (activeTab = 'armor')}><a>Armor</a></li>
        </ul>
    </div>


    <!--    Basic Info  -->
    <div class="{activeTab === 'basic' ? 'is-active' : ''}">
        <fieldset class="mb-4">
            <legend class="title is-4">Basic Info</legend>
            <div class="columns is-multiline">
                {#each basicInfoFields as field}
                    <div class="column is-half">
                        <CharacterFormField
                                label="{field.label}"
                                type="{field.type}"
                                bind:value="{$characterStore[field.key]}"
                                placeholder="{field.label}"
                                items="{field.items}"
                        />
                    </div>
                {/each}
            </div>
        </fieldset>
    </div>
    <!--    Stats       -->
    <div class="{activeTab === 'stats' ? 'is-active' : ''}">
        <fieldset class="mb-4">
            <legend class="title is-4">Stats</legend>
            <div class="columns is-multiline">
                {#each statFields as field}
                    <div class="column is-half">
                        <CharacterFormShadedField
                                label="{field.label}"
                                bind:bindShade="{$characterStore[field.shadeKey]}"
                                bind:bindExponent="{$characterStore[field.exponentKey]}"
                                disabled="{enforceRules && field.auto}"
                                enforceRules="{enforceRules}"
                        />

                    </div>
                {/each}

            </div>
        </fieldset>
    </div>
    <!--    Attributes-->
    <div class="{activeTab === 'attributes' ? 'is-active' : ''}">
        <fieldset class="mb-4">
            <legend class="title is-4">Attributes</legend>
            <div class="columns is-multiline">
                {#each attributeFields as field}
                    <div class="column is-half">
                        {#if field.isEmotionalAttribute}
                            <div class="field">
                                <label class="label">{field.label}</label>
                                <div class="control">
                                    <input
                                            class="input"
                                            type="text"
                                            bind:value="{$characterStore[field.nameKey]}"
                                            placeholder="{field.label} Name"
                                    />
                                </div>
                            </div>
                            <CharacterFormShadedField
                                    label=""
                                    bind:bindShade="{$characterStore[field.shadeKey]}"
                                    bind:bindExponent="{$characterStore[field.exponentKey]}"
                                    disabled="{enforceRules && field.auto}"
                            />
                        {:else if field.shadeKey && field.exponentKey}
                            <CharacterFormShadedField
                                    label="{field.label}"
                                    bind:bindShade="{$characterStore[field.shadeKey]}"
                                    bind:bindExponent="{$characterStore[field.exponentKey]}"
                                    disabled="{enforceRules && field.auto}"
                            />
                        {:else if field.auto}
                            <div class="field">
                                <label class="label">{field.label}</label>
                                <div class="control">
                                    <input
                                            class="input"
                                            type="number"
                                            bind:value="{$characterStore[field.key]}"
                                            placeholder="{field.label}"
                                            readonly
                                    />
                                </div>
                            </div>
                        {:else}
                            <div class="control">
                                <input
                                        class="input"
                                        type="text"
                                        bind:value="{$characterStore[field.key]}"
                                        placeholder="{field.label}"
                                />
                            </div>
                        {/if}
                    </div>
                {/each}


            </div>
        </fieldset>
    </div>
    <!--    Tolerances  -->
    <div class="tab-pane {activeTab === 'physicalTolerances' ? 'is-active' : ''}">
        <fieldset>
            <legend>Physical Tolerances</legend>
            <div class="columns">
                <div class="column is-half">
                    {#each physicalTolerancesFields as field, index}
                        {#if index % 2 === 0 && index < 6}
                            <CharacterFormShadedField
                                    label="{field.label}"
                                    bind:bindShade="{$characterStore[field.bindValue]}"
                                    bind:bindExponent="{$characterStore[physicalTolerancesFields[index + 1].bindValue]}"
                                    disabled="{enforceRules}"
                            />
                        {/if}
                    {/each}
                </div>
                <div class="column is-half">
                    {#each physicalTolerancesFields as field, index}
                        {#if index % 2 === 0 && index >= 6}
                            <CharacterFormShadedField
                                    label="{field.label}"
                                    bind:bindShade="{$characterStore[field.bindValue]}"
                                    bind:bindExponent="{$characterStore[physicalTolerancesFields[index + 1].bindValue]}"
                                    disabled="{enforceRules}"
                            />
                        {/if}
                    {/each}
                </div>
            </div>
        </fieldset>
    </div>

    <div class="tab-pane {activeTab === 'skills' ? 'is-active' : ''}">
        {#if activeTab === 'skills'}
            <SkillsTab/>
        {/if}
    </div>

    <div class="tab-pane {activeTab === 'weapons' ? 'is-active' : ''}">
        {#if activeTab === 'weapons'}
            <WeaponsTab/>
        {/if}
    </div>

    <div class="tab-pane {activeTab === 'armor' ? 'is-active' : ''}">
        {#if activeTab === 'armor'}
            <ArmorTab/>
        {/if}
    </div>


    <div class="field">
        <div class="control">
            <button type="submit" class="button is-primary">Create Character</button>
            <div class="field is-horizontal">
                <label class="field-label is-normal">
                    <p class="label">Enforce Rules</p>
                </label>
                <div class="field-body">
                    <div class="field">
                        <label for="enforceRules" class="toggle">
                            <input id="enforceRules" class="toggle-checkbox" type="checkbox"
                                   bind:checked="{enforceRules}"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>


</form>


<style>
    .tabs {
        margin-bottom: 1em;
    }

    fieldset {
        display: none;
    }

    .is-active fieldset {
        display: block;
    }

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