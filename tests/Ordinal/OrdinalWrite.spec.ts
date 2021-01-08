import OrdinalWrite from "../../src/rm/Ordinal/OrdinalWrite.svelte"
import Leaf from "../../src/form/Leaf.svelte"
import { fireEvent, Matcher, render, RenderResult } from "@testing-library/svelte"
import { get, writable } from "svelte/store"
import '@testing-library/jest-dom'
import type { writableKeyValue } from "../../src/types/types"
import { tick } from "svelte"
import {rawTree} from "./webtemplate"
import { mockChanges } from "../utils"


describe('Basic Write - OrdinalWrite', () => {
    let ordinal: RenderResult
    let store: writableKeyValue
    let tree
    beforeEach(() => {
        tree = mockChanges(rawTree)
        store = writable({})
        const props = {
            tree,
            path: 'testing/path',
            store
        }
        ordinal = render(OrdinalWrite, { props })
    })
    it('must render all options', () => {
        const options = ordinal.getAllByRole("option")
        expect(options.map(option => option.textContent)).toEqual([
            'Select an option',
            '1. None',
            '2. To pressure',
            '3. To sound',
            '4. Spontaneous'
        ])
    })
    it('must select correct values', async () => {
        let select = ordinal.getByLabelText(tree.name)
        expect(select).toBeInTheDocument()
        expect(select).toHaveTextContent('Select an option')
        await fireEvent.change(select, { target: { value: "2" } })
        expect(select).toHaveTextContent('2. To pressure')
        expect(get(store)).toEqual({
            'testing/path|ordinal': 2,
            'testing/path|code': 'at0011',
            'testing/path|value': 'To pressure'
        })
    })

    it('it must display correct value', async () => {
        let select = ordinal.getByLabelText(tree.name)
        store.set({
            'testing/path|ordinal': 3,
            'testing/path|code': 'at0012',
            'testing/path|value': 'To sound'
        })
        await tick()
        expect(select).toHaveTextContent('3. To sound')
    })
})
