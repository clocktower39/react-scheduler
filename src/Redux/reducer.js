import { ASSIGN_TASK, RESET_ASSIGNMENTS, EDIT_TOGGLE, LEFT_TOGGLE, REMOVE_TASK, LOWER_PRIORITY, HIGHER_PRIORITY } from './actions';
import { agents, tasks, editMode, left } from './states';

export let reducer = (state = { agents, tasks, editMode, left }, action) => {
    const newState = {...state};
    const maxIndex = newState.tasks.length;
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

    switch(action.type){
        case EDIT_TOGGLE:
            console.log('EDIT_TOGGLE');
            newState.editMode = !state.editMode;
            return newState;
        case LEFT_TOGGLE:
            console.log('LEFT_TOGGLE');
            newState.left = !state.left;
            return newState;
        case REMOVE_TASK:
            console.log('REMOVE_TASK');
            newState.tasks = newState.tasks.filter((task) => task.priority !== action.payload);
            newState.tasks.forEach((task, index) => {
                task.priority = index + 1;
            });
            return newState;
        case LOWER_PRIORITY:
            console.log('LOWER_PRIORITY');
            newState.tasks[action.payload-1].priority = action.payload + 1;
            newState.tasks[action.payload].priority = action.payload - 1;
            return newState;
        case HIGHER_PRIORITY:
            console.log('HIGHER_PRIORITY');
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
            console.log('ASSIGN_TASK');
            console.log(action.payload)
            newState.tasks[action.payload.taskIndex].assignedAgent = newState.agents[action.payload.agentIndex].firstName;
            newState.agents[action.payload.agentIndex].load += newState.tasks[action.payload.taskIndex].loadScore;
            // run for loop then dispatch here to set result of loop
            // each loop iteration will call dispatch
            return newState;
        case RESET_ASSIGNMENTS:
            console.log('RESET_ASSIGNMENTS');
            newState.agents[action.payload].load = 0;
            return newState;
        default:
            break;
    }
    return state;
}