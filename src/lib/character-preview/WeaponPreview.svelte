<script>
    import {characterContext, chosenWeaponsContext, characterArrowheadsContext} from "$lib/contextStores.js";

    let chosenWeapons = [];
    let arrowheads = []
    $: chosenWeapons = $chosenWeaponsContext;
    $: power = $characterContext.power_exponent;
    $: arrowheads = $characterArrowheadsContext;

    function calculateIMS(weaponPower) {
        const I = Math.ceil((power + weaponPower) / 2);
        const M = power + weaponPower;
        const S = Math.ceil((power + weaponPower) * 1.5);

        return {
            I: `B${I}`,
            M: `B${M}`,
            S: `B${S}`
        };
    }

    let ims = [];

    $: {
        ims = chosenWeapons.map(weaponData => {
            let weapon = weaponData.weapon || weaponData;
            let type = weaponData.type || weaponData.weapon_type;

            if (type === 'ranged') {
                return {
                    ...weapon,
                    type,
                    weapon: weapon.weapon_name,
                    DOF_I: weapon.dof_i_range,
                    DOF_M: weapon.dof_m_range,
                    DOF_S: weapon.dof_s_range,
                    I: weapon.i_value,
                    M: weapon.m_value,
                    S: weapon.s_value,
                    actions: weapon.actions
                };
            } else if (type === 'melee' || type === 'thrown' || type === 'found') {
                const ims = calculateIMS(weapon.power);
                return {
                    ...weapon,
                    type,
                    weapon: weapon.weapon_name,
                    ws: weapon.weapon_speed,
                    va: weapon.va,
                    wl: weapon.weapon_length,
                    handedness: weapon.handedness,
                    quality: weapon.quality,
                    ...ims
                };
            }
        });

        // Update categorized weapon arrays when ims changes
        meleeWeapons = ims.filter(weapon => weapon.type === 'melee');
        foundWeapons = ims.filter(weapon => weapon.type === 'found');
        rangedWeapons = ims.filter(weapon => weapon.type === 'ranged');
        thrownWeapons = ims.filter(weapon => weapon.type === 'thrown');
    }

    let meleeWeapons = [];
    let foundWeapons = [];
    let rangedWeapons = [];
    let thrownWeapons = [];

</script>


<div class="weapons-table">
    <!-- Melee Weapons -->
    {#if meleeWeapons.length > 0}
        <div class="weapons-section">
            <h3 class="title is-4">Melee Weapons</h3>
            <div class="weapon-grid weapon-grid-header">
                <div>Weapon</div>
                <div>I</div>
                <div>M</div>
                <div>S</div>
                <div>WS</div>
                <div>VA</div>
                <div>WL</div>
                <div>Handedness</div>
            </div>
            {#each meleeWeapons as weapon}
                <div class="weapon-grid">
                    <div>{weapon.weapon}</div>
                    <div>{weapon.I}</div>
                    <div>{weapon.M}</div>
                    <div>{weapon.S}</div>
                    <div>{weapon.ws}</div>
                    <div>{weapon.va}</div>
                    <div>{weapon.wl}</div>
                    <div>{weapon.handedness}</div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Found Weapons -->
    {#if foundWeapons.length > 0}
        <div class="weapons-section">
            <h3 class="title is-4">Found Weapons</h3>
            <div class="weapon-grid weapon-grid-header">
                <div>Weapon</div>
                <div>I</div>
                <div>M</div>
                <div>S</div>
                <div>WS</div>
            </div>
            {#each foundWeapons as weapon}
                <div class="weapon-grid">
                    <div>{weapon.weapon}</div>
                    <div>{weapon.I}</div>
                    <div>{weapon.M}</div>
                    <div>{weapon.S}</div>
                    <div>{weapon.ws}</div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- Ranged Weapons -->
    {#if rangedWeapons.length > 0}
        <div class="weapons-section">
            <h3 class="title is-4">Ranged Weapons</h3>
            <div class="weapon-grid weapon-grid-header">
                <div>Weapon</div>
                <div>I</div>
                <div>M</div>
                <div>S</div>
                <div>VA</div>
                <div>Actions</div>
                <div>DoF mod</div>
                <div>Ob mod</div>
            </div>
            {#each rangedWeapons as weapon}
                <div class="weapon-grid">
                    <div>{weapon.weapon}</div>
                    <div>{weapon.DOF_I}: {weapon.I}</div>
                    <div>{weapon.DOF_M}: {weapon.M}</div>
                    <div>{weapon.DOF_S}: {weapon.S}</div>
                    <div>{weapon.va}</div>
                    <div>{weapon.actions}</div>
                </div>
                {#each arrowheads as arrowhead}
                    {#if arrowhead.weaponId === weapon.id}
                        <div class="weapon-grid weapon-grid-arrowhead">
                            <div>With {arrowhead.name}</div>
                            <div>{weapon.DOF_I}: B{+weapon.I.substring(1) + arrowhead.i}</div>
                            <div>{weapon.DOF_M}: B{+weapon.M.substring(1) + arrowhead.m}</div>
                            <div>{weapon.DOF_S}: B{+weapon.S.substring(1) + arrowhead.s}</div>
                            <div>{weapon.va + arrowhead.va}</div>
                            <div>--</div>
                            <div>{arrowhead.dof}</div>
                            <div>{arrowhead.ob}</div>
                        </div>
                    {/if}
                {/each}
            {/each}
        </div>
    {/if}



    <!-- Thrown Weapons -->
    {#if thrownWeapons.length > 0}
        <div class="weapons-section">
            <h3 class="title is-4">Thrown Weapons</h3>
            <div class="weapon-grid weapon-grid-header">
                <div>Weapon</div>
                <div>I</div>
                <div>M</div>
                <div>S</div>
                <div>VA</div>
            </div>
            {#each thrownWeapons as weapon}
                <div class="weapon-grid">
                    <div>{weapon.weapon}</div>
                    <div>{weapon.dof_i_range}: {weapon.I}</div>
                    <div>{weapon.dof_m_range}: {weapon.M}</div>
                    <div>{weapon.dof_s_range}: {weapon.S}</div>
                    <div>{weapon.va}</div>
                </div>
            {/each}
        </div>
    {/if}

</div>


<style>
    .weapons-table {
        display: flex;
        flex-direction: column;
    }

    .weapons-section {
        display: grid;
        gap: 0.5rem;
    }

    .weapon-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 0.5rem;
        align-items: center;
    }

    .weapon-grid-header {
        font-weight: bold;
    }
</style>