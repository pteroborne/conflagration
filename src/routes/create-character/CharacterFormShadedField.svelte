<script>
    export let label = "";
    export let shadeKey = "";
    export let exponentKey = "";
    export let bindShade = "";
    export let bindExponent = "";
    export let disabled = false;
</script>

<div class="field is-horizontal">
    <label class="field-label is-normal">
        <p class="label">{label}</p>
    </label>
    <div class="field-body">
        <div class="field">
            <div class="control">
                <div class="select">
                    <select bind:value="{bindShade}" disabled="{disabled}">
                        <option value="B" selected="{bindShade === 'B'}">B</option>
                        <option value="G" selected="{bindShade === 'G'}">G</option>
                        <option value="W" selected="{bindShade === 'W'}">W</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <input
                        class="input"
                        type="number"
                        min="1"
                        bind:value="{bindExponent}"
                        placeholder="{label} Exponent"
                        disabled="{disabled}"
                />
            </div>
        </div>
    </div>
</div>
