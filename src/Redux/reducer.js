import { ASSIGN_TASK, RESET_ASSIGNMENTS, EDIT_TOGGLE, REMOVE_TASK, LOWER_PRIORITY, HIGHER_PRIORITY, SHUFFLE_THEN_SORT_ARR } from './actions';
import { agents, tasks, editMode } from './states';

export let reducer = (state = { agents, tasks, editMode }, action) => {
    let newState = {...state};
    const maxIndex = newState.tasks.length;

    switch(action.type){
        case EDIT_TOGGLE:
            return {
                ...state,
                editMode: !state.editMode
            };
        case REMOVE_TASK:
            return {
                ...state,
                tasks: [...action.tasks],
            };
        case LOWER_PRIORITY:
            newState.tasks[action.payload-1].priority = action.payload + 1;
            newState.tasks[action.payload].priority = action.payload;
            return newState;
        case HIGHER_PRIORITY:
            for (let taskIndex = 0; taskIndex < maxIndex; taskIndex++) {
                if (taskIndex + 1 === action.payload && action.payload > 1) {
                    newState.tasks[taskIndex - 1].priority = action.payload;
                    newState.tasks[taskIndex].priority = action.payload - 1;
                    break;
                }
            }
            newState.tasks = newState.tasks.sort((a, b) => a.priority > b.priority);
            return newState;
        case ASSIGN_TASK:
            newState.tasks[action.payload.taskIndex].assignedAgent = newState.agents[action.payload.agentIndex].firstName;
            newState.agents[action.payload.agentIndex].load += newState.tasks[action.payload.taskIndex].loadScore;
            // run for loop then dispatch here to set result of loop
            // each loop iteration will call dispatch
            return newState;
        case RESET_ASSIGNMENTS:
            newState.agents[action.payload].load = 0;
            return newState;
        case SHUFFLE_THEN_SORT_ARR:
            return {
                ...state,
                agents: [...action.agents]
            };
        default:
            break;
    }
    return state;
}