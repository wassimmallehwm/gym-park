import React from 'react'

const CourseLevelBadge = ({
    level
}: any) => {
    const levelColor = (level: string) => {
        let color = 'success'
        if (level == 'ADVANCED') {
            color = 'secondary'
        } else if (level == 'INTERMEDIATE') {
            color = 'primary'
        }
        return `text-${color}-500 bg-${color}-50 border border-${color}-500`
    }
    return (
        <span className={`flex items-center justify-center gap-1 text-xs p-1 py-2 rounded-2xl ${levelColor(level)}`}>
            {level}
        </span>
    )
}

export default CourseLevelBadge