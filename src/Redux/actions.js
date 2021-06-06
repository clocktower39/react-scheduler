export const EDIT_TOGGLE = 'EDIT_TOGGLE';
export const FLIP_CARD_TOGGLE = 'FLIP_CARD_TOGGLE';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const RESET_STATE = 'RESET_STATE';
export const RESET_ASSIGNMENTS = 'RESET_ASSIGNMENTS';
export const MODIFY_TASKS = 'MODIFY_TASKS';
export const SHUFFLE_THEN_SORT_ARR = 'SHUFFLE_THEN_SORT_ARR';

export function editToggle() {
    return {
        type: EDIT_TOGGLE,
    }
}

export function flipCardToggle() {
    return {
        type: FLIP_CARD_TOGGLE,
    }
}

export function assignTask(agentIndex, taskIndex) {
    return async (dispatch, getState) => {
        const state = getState();
        const tasks = state.tasks;
        const agents = state.agents;
        console.log(taskIndex)
        console.log(tasks[taskIndex])
        
        tasks[taskIndex].assignedAgent = agents[agentIndex].firstName;
        agents[agentIndex].load += tasks[taskIndex].loadScore;
        agents[agentIndex].assignedJobs.push(tasks[taskIndex].task);

        console.log(tasks)
        return dispatch({
            type: ASSIGN_TASK,
            agents: [...agents],
            tasks: [...tasks],
        });
    }
}

export function resetState() {
    return {
        type: RESET_STATE,
    }
}

export function resetAssignments(index) {
    return async (dispatch, getState) => {
        const state = getState();

        state.agents.map(agent=> {
            agent.load = 0;
            agent.assignedJobs = [];

            return agent;
        });

        state.tasks.map(task => task.assignedAgent='Unassigned')

        return dispatch({
            type: RESET_ASSIGNMENTS,
            payload: index
        });
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
            type: MODIFY_TASKS,
            tasks,
        });
    }
}

export function lowerPriority(priority) {
    return async (dispatch, getState) => {
        const state = getState();

        let tasks = state.tasks;

        if(priority < tasks.length){
            //raise target priority value to lower on scale
            //current target
            tasks[priority-1].priority = priority + 1;
            //transpose with target
            tasks[priority].priority = priority;
            tasks.sort((a,b) => a.priority - b.priority);
        }

        return dispatch({
            type: MODIFY_TASKS,
            tasks,
        });
    }
}
export function higherPriority(priority) {
    return async (dispatch, getState) => {
        const state = getState();

        let tasks = state.tasks;

        if(priority >= 2){
            //lower target priority value to raise on scale
            //current target
            tasks[priority-1].priority = priority - 1;
            //transpose with target
            tasks[priority-2].priority = priority;
            tasks.sort((a,b) => a.priority - b.priority);
        }

        return dispatch({
            type: MODIFY_TASKS,
            tasks,
        });
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