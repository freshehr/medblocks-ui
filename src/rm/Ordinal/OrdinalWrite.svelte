<script lang="ts">
    import type { Writable } from "svelte/store";
    import type { keyValue, Tree } from "../../types/types";
    import Error from "../helpers/Error.svelte";
    import { onMount } from "svelte";
    import { triggerDestroy } from "../utils";
    // Setup
    export let store: Writable<keyValue>;
    export let path: string;
    export let tree: Tree;
    export let defaultOrdinal: number | undefined = undefined;
    export let wrapperClass: string = "field"
    export let labelClass: string = "label"
    export let selectWrapperClass: string = "select"
    let internalPath: string;
    let selected: number;
    
    // Computed
    $: internalPath = path.replace("/ordinal_value", "");
    $: selected = $store[internalPath + "|ordinal"];
    $: if (selected) {
        if (tree.inputs && tree.inputs[0].list) {
            let option = tree.inputs[0].list.filter(
                (option) => option.ordinal == selected
            )[0];
            let { label, value } = option;
            store.update((store) => ({
                ...store,
                [internalPath + "|code"]: value,
                [internalPath + "|value"]: label,
            }));
        } else {
            console.error("Tree does not have input/ input.list");
        }
    }

    //Triggers
    triggerDestroy(
        ["|ordinal", "|code", "|value"].map((a) => internalPath + a),
        store
    );
    onMount(() => {
        if (defaultOrdinal) {
            $store[internalPath + "|ordinal"] = defaultOrdinal;
        }
    });
</script>

<div class={wrapperClass}>
    <label class={labelClass} for={path}>{tree.name}</label>
    {#if tree.inputs && tree.inputs[0].list}
        <div class={selectWrapperClass}>
            <select
                id={path}
                name="code"
                bind:value={$store[internalPath + '|ordinal']}
                disabled={tree.inputs[0].list.length === 1}>
                <option value={undefined} selected disabled>
                    Select an option
                </option>
                {#each tree.inputs[0].list as option}
                    <option
                        value={option.ordinal}
                        label={option.ordinal ? `${option.ordinal}. ${option.label}` : option.label} />
                {/each}
            </select>
        </div>
    {:else}
        <Error>Tree does not have inputs/inputs does not have list</Error>
    {/if}
</div>