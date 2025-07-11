export const STATUS = {
    TODO: 'todo',
    IN_PROGRESS: 'inProgress',
    DONE: 'done'
};

export const PRIORITY = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
};

export const DATE_FILTERS = {
    TODAY: 'today',
    WEEK: 'week',
    MONTH: 'month',
    OVERDUE: 'overdue'
};

export const PRIORITY_COLORS = {
    [PRIORITY.LOW]: 'text-green-500',
    [PRIORITY.MEDIUM]: 'text-yellow-500',
    [PRIORITY.HIGH]: 'text-red-500'
};

export const PRIORITY_ICONS = {
    [PRIORITY.LOW]: '⬇️',
    [PRIORITY.MEDIUM]: '⏺️',
    [PRIORITY.HIGH]: '⬆️'
};

export const STATUS_LABELS = {
    [STATUS.TODO]: 'To Do',
    [STATUS.IN_PROGRESS]: 'In Progress',
    [STATUS.DONE]: 'Done'
};