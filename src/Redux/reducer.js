import { ASSIGN_TASK, RESET_ASSIGNMENTS, EDIT_TOGGLE, FLIP_CARD_TOGGLE, MODIFY_TASKS, MODIFY_AGENTS, SHUFFLE_THEN_SORT_ARR } from './actions';
import { agents, tasks, editMode, flipCardToggle } from './states';

export let reducer = (state = { agents, tasks, editMode, flipCardToggle }, action) => {

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
        case MODIFY_AGENTS:
            return {
                ...state,
                agents: [...action.agents],
            };
        case ASSIGN_TASK:
            return{
                ...state,
                tasks: [...action.tasks],
                agents: [...action.agents],
            }
        case RESET_ASSIGNMENTS:
            // newState.agents[action.payload].load = 0;
            return {
                ...state,
            }
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