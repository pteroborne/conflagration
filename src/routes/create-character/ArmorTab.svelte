<script>
    import {onMount} from "svelte";
    import {supabase} from "$lib/supabaseClient.js";
    import {characterArmor} from "$lib/characterStore.js";

    let armors = [];
    let helmets = [];
    let shields = [];

    async function fetchArmorData() {
        const {data: armorData} = await supabase.from("armor").select("*");
        armors = armorData;

        const {data: helmetData} = await supabase.from("Helmets").select("*");
        helmets = helmetData;

        const {data: shieldData} = await supabase.from("shields").select("*");
        shields = shieldData;
    }

    onMount(() => {
        fetchArmorData();
    });

    // Update characterArmor store as needed when selections are made
</script>

<!-- Stick figure body parts -->
<div style="position: relative;">
    <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            style="border: 1px solid #ccc; position: relative; width: 100%; height: 100%;"
    >
        <circle cx="50" cy="20" r="5" fill="none" stroke="black"/>
        <line x1="50" y1="25" x2="50" y2="50" stroke="black"/>
        <line x1="50" y1="35" x2="30" y2="40" stroke="black"/>
        <line x1="50" y1="35" x2="70" y2="40" stroke="black"/>
        <line x1="50" y1="50" x2="30" y2="70" stroke="black"/>
        <line x1="50" y1="50" x2="70" y2="70" stroke="black"/>
    </svg>

    <!-- Helmet select box -->
    <label for="helmet" class="label" style="position: absolute; top: 5%; left: 35%;">Helmet:</label>
    <div class="select" style="position: absolute; top: 5%; left: 45%;">
        <select id="helmet">
            {#each helmets as helmet}
                <option value="{helmet.id}">{helmet.name}</option>
            {/each}
        </select>
    </div>

    <!-- Right Arm select box -->
    <label for="right_arm" class="label" style="position: absolute; top: 25%; left: 65%;">Right Arm:</label>
    <div class="select" style="position: absolute; top: 25%; left: 80%;">
        <select id="right_arm">
            {#each armors as armor}
                <option value="{armor.id}">{armor.name}</option>
            {/each}
        </select>
    </div>

    <!-- Left Arm select box -->
    <label for="left_arm" class="label" style="position: absolute; top: 25%; left: 5%;">Left Arm:</label>
    <div class="select" style="position: absolute; top: 25%; left: 20%;">
        <select id="left_arm">
            {#each armors as armor}
                <option value="{armor.id}">{armor.name}</option>
            {/each}
        </select>
    </div>

    <!-- Right Leg select box -->
    <label for="right_leg" class="label" style="position: absolute; top: 70%; left: 60%;">Right Leg:</label>
    <div class="select" style="position: absolute; top: 70%; left: 75%;">
        <select id="right_leg">
            {#each armors as armor}
                <option value="{armor.id}">{armor.name}</option>
            {/each}
        </select>
    </div>

    <!-- Left Leg select box -->
    <label for="left_leg" class="label" style="position: absolute; top: 70%; left: 5%;">Left Leg:</label>
    <div class="select" style="position: absolute; top: 70%; left: 20%;">
        <select id="left_leg">
            {#each armors as armor}
                <option value="{armor.id}">{armor.name}</option>
            {/each}
        </select>
    </div>
</div>



