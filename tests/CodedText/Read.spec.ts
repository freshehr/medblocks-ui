import '@testing-library/jest-dom'
import Leaf from "../../src/composition/Leaf.svelte"
import { fireEvent, render, RenderResult } from "@testing-library/svelte"
import { get, writable } from "svelte/store"
import type { writableKeyValue } from "../../src/types/types"
import { tick } from "svelte"
import { rawTree } from "./webtemplate"
import { mockChanges } from "../utils"
import userEvent from '@testing-library/user-event'

describe('basic', () => {
    let component: RenderResult
    let store: writableKeyValue
    let tree
    beforeEach(() => {
        tree = mockChanges(rawTree)
        store = writable({})
        const props = {
            tree,
            path: 'testing/path',
            store,
            readOnly: true,
            type: 'Leaf'
        }
        component = render(Leaf, { props })
    })
    it('must render value and label given an input', async () => {
        store.set({
            'testing/path|terminology': 'local',
            'testing/path|code': 'at1024',
            'testing/path|value': 'Present'
        })
        await tick()
        expect(component.getByText('Presence')).toBeInTheDocument()
        expect(component.getByText('Present')).toBeInTheDocument()
    })
    it('must react to input change and change value', async () => {
        store.set({
            'testing/path|terminology': 'local',
            'testing/path|code': 'at1024',
            'testing/path|value': 'Present'
        })
        await tick()
        expect(component.getByText('Presence')).toBeInTheDocument()
        expect(component.getByText('Present')).toBeInTheDocument()
        store.set({
            'testing/path|terminology': 'local',
            'testing/path|code': 'at1024',
            'testing/path|value': 'Absent'
        
        })
        await tick()
        expect(component.getByText('Presence')).toBeInTheDocument()
        expect(component.getByText('Absent')).toBeInTheDocument()
    })

    it('must display label and null value when no input', async () => {
        expect(component.getByText('Presence')).toBeInTheDocument()
        expect(component.getByText('-')).toBeInTheDocument()
    })

    it('must not change the store in any way', async ()=> {
        store.set({
            'testing/path|terminology': 'local',
            'testing/path|code': 'at1024',
            'testing/path|value': 'Present'
        })
        await tick()
        expect(component.getByText('Presence')).toBeInTheDocument()
        expect(component.getByText('Present')).toBeInTheDocument()
        component.unmount()
        expect(get(store)).toEqual({
            'testing/path|terminology': 'local',
            'testing/path|code': 'at1024',
            'testing/path|value': 'Present'
        })
    })
})


describe('advance', ()=>{
    
})