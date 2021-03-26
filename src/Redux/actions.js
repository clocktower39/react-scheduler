export const EDIT_TOGGLE = 'EDIT_TOGGLE';
export const LEFT_TOGGLE = 'LEFT_TOGGLE';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const RESET_STATE = 'RESET_STATE';
export const RESET_ASSIGNMENTS = 'RESET_ASSIGNMENTS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const LOWER_PRIORITY = 'LOWER_PRIORITY';
export const HIGHER_PRIORITY = 'HIGHER_PRIORITY';

export function editToggle() {
    return {
        type: EDIT_TOGGLE,
    }
}

export function leftToggle() {
    return {
        type: LEFT_TOGGLE,
    }
}

export function assignTask(agentIndex, taskIndex) {
    return {
        type: ASSIGN_TASK,
        payload: {
            agentIndex: agentIndex,
            taskIndex: taskIndex,
        }
    }
}

export function resetState() {
    return {
        type: RESET_STATE,
    }
}

export function resetAssignments(index) {
    return {
        type: RESET_ASSIGNMENTS,
        payload: index
    }
}

export function removeTask(priority) {
    return {
        type: REMOVE_TASK,
        payload: priority
    }
}

export function lowerPriority(priority) {
    return {
        type: LOWER_PRIORITY,
        payload: priority
    }
}
export function higherPriority(priority) {
    return {
        type: HIGHER_PRIORITY,
        payload: priority
    }
}