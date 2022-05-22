import React from 'react'
import { Typeahead, AsyncTypeahead } from 'react-bootstrap-typeahead';

const MultipleSelect = ({
    isLoading,
    id = "multiselect",
    placeholder,
    options,
    labelKey = (option) => `${option}`,
    renderMenuItemChildren = (option) => <span>{option}</span>,
    onChange,
    onInputChange,
    selected,
    filterBy = () => true
}) => {
    return (
        <AsyncTypeahead
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
