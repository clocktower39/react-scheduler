export const EDIT_TOGGLE = "EDIT_TOGGLE";
export const FLIP_CARD_TOGGLE = "FLIP_CARD_TOGGLE";
export const ASSIGN_TASK = "ASSIGN_TASK";
export const RESET_STATE = "RESET_STATE";
export const RESET_ASSIGNMENTS = "RESET_ASSIGNMENTS";
export const MODIFY_TASKS = "MODIFY_TASKS";
export const MODIFY_AGENTS = "MODIFY_AGENTS";
export const SHUFFLE_THEN_SORT_ARR = "SHUFFLE_THEN_SORT_ARR";

export function editToggle() {
  return {
    type: EDIT_TOGGLE,
  };
}

export function toggleAvailable(index) {
  return async (dispatch, getState) => {
    const state = getState();
  
    const agents = state.agents
      .sort((a, b) => b.firstName < a.firstName)
      .map((agent, i) => {
          if(i === index){
              agent.available = !agent.available;
          }          
          return agent;
        });
  
    return dispatch({
      type: MODIFY_AGENTS,
      agents,
    })
  };
}

export function flipCardToggle() {
  return {
    type: FLIP_CARD_TOGGLE,
  };
}

export function assignTask(agentIndex, taskIndex) {
  return async (dispatch, getState) => {
    const state = getState();
    const tasks = state.tasks;
    const agents = state.agents;

    tasks[taskIndex].assignedAgent = agents[agentIndex].firstName;
    agents[agentIndex].load += tasks[taskIndex].loadScore;
    agents[agentIndex].assignedJobs.push(tasks[taskIndex].task);

    return dispatch({
      type: ASSIGN_TASK,
      agents: [...agents],
      tasks: [...tasks],
    });
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

export function resetAssignments(index) {
  return async (dispatch, getState) => {
    const state = getState();

    state.agents.map((agent) => {
      agent.load = 0;
      agent.assignedJobs = [];

      return agent;
    });

    state.tasks.map((task) => (task.assignedAgent = "Unassigned"));

    return dispatch({
      type: RESET_ASSIGNMENTS,
      payload: index,
    });
  };
}

export function removeTask(priority) {
  return async (dispatch, getState) => {
    const state = getState();

    const filtered = state.tasks.filter((task) => task.priority !== priority);
    const tasks = filtered.map((task, index) => {
      task.priority = index + 1;
      return task;
    });

    return dispatch({
      type: MODIFY_TASKS,
      tasks,
    });
  };
}
export function addTask(newTask) {
  return async (dispatch, getState) => {
    const state = getState();

    const tasks = state.tasks;
    newTask.assigned = false;
    newTask.assignedAgent = "Unassigned";
    newTask.priority = tasks.length+1;
    tasks.push(newTask);
  

    return dispatch({
      type: MODIFY_TASKS,
      tasks,
    });
  };
}
export function addAgent(newAgent) {
  return async (dispatch, getState) => {
    const state = getState();

    const agents = state.agents;
    newAgent.load = 0;
    newAgent.assignedJobs = [];
    newAgent.available = true;
    agents.push(newAgent);

    return dispatch({
      type: MODIFY_AGENTS,
      agents,
    });
  };
}

export function removeAgent(index) {
  return async (dispatch, getState) => {
    const state = getState();

    const agents = state.agents
      .sort((a, b) => b.firstName < a.firstName)
      .filter((agent, i) => i !== index);

    return dispatch({
      type: MODIFY_AGENTS,
      agents,
    });
  };
}


export function removeProgramFromAgent(programToRemove, removeFromAgent) {
  return async (dispatch, getState) => {
    const state = getState();


    const agents = state.agents.map(agent => {
      if(agent === removeFromAgent){
        agent.programs = agent.programs.filter( p => p !== programToRemove);
      }
      return agent;
    })

  return dispatch({
    type: MODIFY_AGENTS,
    agents,
  });
  };
}
export function addProgramToAgent(programToAdd, addToAgent) {
  return async (dispatch, getState) => {
    const state = getState();

    const agents = state.agents.map(agent => {
        if(agent === addToAgent){
          agent.programs.push(programToAdd);
        }
        return agent;
      })

    return dispatch({
      type: MODIFY_AGENTS,
      agents,
    });
  };
}

export function lowerPriority(priority) {
  return async (dispatch, getState) => {
    const state = getState();

    let tasks = state.tasks;

    if (priority < tasks.length) {
      //raise target priority value to lower on scale
      //current target
      tasks[priority - 1].priority = priority + 1;
      //transpose with target
      tasks[priority].priority = priority;
      tasks.sort((a, b) => a.priority - b.priority);
    }

    return dispatch({
      type: MODIFY_TASKS,
      tasks,
    });
  };
}
export function higherPriority(priority) {
  return async (dispatch, getState) => {
    const state = getState();

    let tasks = state.tasks;

    if (priority >= 2) {
      //lower target priority value to raise on scale
      //current target
      tasks[priority - 1].priority = priority - 1;
      //transpose with target
      tasks[priority - 2].priority = priority;
      tasks.sort((a, b) => a.priority - b.priority);
    }

    return dispatch({
      type: MODIFY_TASKS,
      tasks,
    });
  };
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
    };
    const newAgents = shuffle(agents).sort((a, b) => a.load > b.load);

    return dispatch({
      type: SHUFFLE_THEN_SORT_ARR,
      agents: newAgents,
    });
  };
}
export function changeProjectName(task, newProjectName){
  return async (dispatch, getState) => {
    const state = getState();
    const tasks = state.tasks;

    tasks.map(t => {
      if(t === task){
        t.task = newProjectName;
      }
      return t;
    })

    return dispatch({
      type: MODIFY_TASKS,
      tasks
    });
  };
}
export function changeTaskLoadScore(task, newTaskLoadScore){
  return async (dispatch, getState) => {
    const state = getState();
    const tasks = state.tasks;

    tasks.map(t => {
      if(t === task && !isNaN(newTaskLoadScore)){
        t.loadScore = newTaskLoadScore;
      }
      return t;
    })

    return dispatch({
      type: MODIFY_TASKS,
      tasks
    });
  };
}
export function changeAssociatedProgram(task, newAssociatedProgram){
  return async (dispatch, getState) => {
    const state = getState();
    const tasks = state.tasks;

    tasks.map(t => {
      if(t === task){
        t.associatedProgram = newAssociatedProgram;
      }
      return t;
    })

    return dispatch({
      type: MODIFY_TASKS,
      tasks
    });
  };
}