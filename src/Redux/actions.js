export const EDIT_TOGGLE = 'EDIT_TOGGLE';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const RESET_STATE = 'RESET_STATE';
export const RESET_ASSIGNMENTS = 'RESET_ASSIGNMENTS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const LOWER_PRIORITY = 'LOWER_PRIORITY';
export const HIGHER_PRIORITY = 'HIGHER_PRIORITY';
export const SHUFFLE_THEN_SORT_ARR = 'SHUFFLE_THEN_SORT_ARR';

export function editToggle() {
    return {
        type: EDIT_TOGGLE,
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
    return async (dispatch, getState) => {
        const state = getState();
        const filtered = state.tasks.filter((task) => task.priority !== priority);
        const tasks = filtered.map((task, index) => {
            task.priority = index + 1
            return task;
        });

        return dispatch({
            type: REMOVE_TASK,
            tasks,
        });
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
export function shuffleThenSortArr(agents) {
    return async (dispatch, getState) => {
        const shuffle = (array) => {
            var currentIndex = array.length,
              temporaryValue,
              randomIndex;
        
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
              // Pick a remaining element...
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
        
              // And swap it with the current element.
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
        
            return array;
          }
        const newAgents = shuffle(agents).sort((a, b) => a.load > b.load);

        return dispatch({
            type: SHUFFLE_THEN_SORT_ARR,
            agents: newAgents,
        })
    }
}