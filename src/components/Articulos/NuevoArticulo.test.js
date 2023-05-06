import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import NuevoArticulo from './NuevoArticulo'


test('renders content', ()=>{

    const component = render(<NuevoArticulo/>)

    console.log(component)
})