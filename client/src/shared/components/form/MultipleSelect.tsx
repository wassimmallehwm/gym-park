import React from 'react'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';

const MultipleSelect = ({
    isLoading,
    id = "multiselect",
    placeholder,
    options,
    labelKey = (option: any) => `${option}`,
    renderMenuItemChildren = (option: any) => <span>{option}</span>,
    onChange,
    onInputChange,
    selected,
    filterBy = () => true
}: any) => {
    return (
        <AsyncTypeahead
            className='w-full rounded mt-1 outline-hidden focus:border-blue-300 focus:outline-none focus:ring-1'
            multiple
            selected={selected}
            onChange={onChange}
            filterBy={filterBy}
            id={id}
            isLoading={isLoading}
            labelKey={labelKey}
            onSearch={onInputChange}
            options={options}
            placeholder={placeholder}
            renderMenuItemChildren={renderMenuItemChildren}
        />
    )
}

export default MultipleSelect
