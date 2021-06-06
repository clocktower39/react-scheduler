import { ASSIGN_TASK, RESET_ASSIGNMENTS, EDIT_TOGGLE, FLIP_CARD_TOGGLE, MODIFY_TASKS, SHUFFLE_THEN_SORT_ARR } from './actions';
import { agents, tasks, editMode, flipCardToggle } from './states';

export let reducer = (state = { agents, tasks, editMode, flipCardToggle }, action) => {
    let newState = {...state};

    switch(action.type){
        case EDIT_TOGGLE:
            return {
                ...state,
                editMode: !state.editMode
            };
        case FLIP_CARD_TOGGLE:
            return {
                ...state,
                flipCardToggle: !state.flipCardToggle
            };
        case MODIFY_TASKS:
            return {
                ...state,
                tasks: [...action.tasks],
            };
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