<!--/create-character/ArmorTab.svelte-->
<script>
    import {onMount} from "svelte";
    import {supabase} from "$lib/supabaseClient.js";
    import ArmorSelect from "./ArmorSelect.svelte";
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

    function handleArmorSelected(event) {
        characterArmor.update((store) => {
            const updatedStore = { ...store };
            updatedStore[event.detail.label] = event.detail.armorData;
            return updatedStore;
        });
    }
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

    <ArmorSelect
            label="Helmet"
            options="{helmets}"
            defaultOption="None"
            position="{{ top: '5%', left: '30%' }}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Right Arm"
            options="{armors}"
            defaultOption="None"
            position="{{ top: '25%', left: '2%' }}"
            showHalfArmorCheckbox="{true}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Left Arm"
            options="{armors}"
            defaultOption="None"
            position="{{ top: '25%', left: '52%' }}"
            showHalfArmorCheckbox="{true}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Right Leg"
            options="{armors}"
            defaultOption="None"
            position="{{ top: '70%', left: '2%' }}"
            showHalfArmorCheckbox="{true}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Left Leg"
            options="{armors}"
            defaultOption="None"
            position="{{ top: '70%', left: '52%' }}"
            showHalfArmorCheckbox="{true}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Torso"
            options="{armors}"
            defaultOption="None"
            position="{{ top: '45%', left: '2%' }}"
            on:armorSelected="{handleArmorSelected}"
    />
    <ArmorSelect
            label="Shield"
            options="{shields}"
            defaultOption="None"
            position="{{ top: '45%', left: '52%' }}"
            on:armorSelected="{handleArmorSelected}"
    />
</div>



