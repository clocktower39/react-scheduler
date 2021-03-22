import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import ProjectAssignments from './Components/ProjectAssignments';
import Footer from './Components/Footer';
import { agents, tasks } from './store';
import './App.css';

const INITIAL_STATE = {
  tasks: [...tasks],
  agents: [...agents]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(JSON.stringify(INITIAL_STATE));

    this.shuffle = this.shuffle.bind(this);
    this.resetState = this.resetState.bind(this);
    this.resetAssignments = this.resetAssignments.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
  }
  resetState = () => {
    this.setState(JSON.parse(JSON.stringify(INITIAL_STATE)));
  };
  resetAssignments = () => {
    this.setState((state) => {
      const newTasks = state.tasks.forEach((task) => {
        task.assigned = false;
        task.assignedAgent = "Unassigned";
      });
      const newAgents = state.agents.forEach((agent) => {
        agent.load = 0;
        agent.assignedJobs = [];
      });

      return {
        newTasks,
        newAgents,
      };
    });
  };
  handleShuffle = () => {
    this.resetAssignments();
    this.setState((state) => {
      let newTasks = [...state.tasks];
      let newAgents = [...state.agents];
      /* 
          loop through copy of tasks
          loop through the agents and if the agent is available, change available to false and push task to assignedJobs
          push to new agent array

      */
      newTasks.forEach((taskLoop, taskLoopIndex) => {
        newAgents = this.shuffle(newAgents);
        for (
          let agentLoopIndex = 0;
          newAgents.length > agentLoopIndex;
          agentLoopIndex++
        ) {
          if (
            newAgents[agentLoopIndex].load + taskLoop.loadScore <= 15 &&
            newAgents[agentLoopIndex].available === true &&
            newAgents[agentLoopIndex].programs.includes(
              taskLoop.associatedProgram
            )
          ) {
            newAgents[agentLoopIndex].load += taskLoop.loadScore;
            newAgents[agentLoopIndex].assignedJobs.push(taskLoop);
            taskLoop.assignedAgent = newAgents[agentLoopIndex].firstName;
            break;
          }
        }
      });
      return {
        newTasks,
        newAgents,
      };
    });
  };
  shuffle(array) {
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
  handlePriorityChange = (currentPriority, direction) => {
    const maxIndex = this.state.tasks.length;

    this.setState((state) => {
      let newTasks = [...state.tasks];
      let newAgents = [...state.agents];
      if (direction === "up") {
        for (let taskIndex = 0; taskIndex < maxIndex; taskIndex++) {
          if (taskIndex + 1 === currentPriority && currentPriority < maxIndex) {
            newTasks[taskIndex + 1].priority = currentPriority;
            newTasks[taskIndex].priority = currentPriority + 1;
            break;
          }
        }
      } else {
        for (let taskIndex = 0; taskIndex < maxIndex; taskIndex++) {
          if (taskIndex + 1 === currentPriority && currentPriority > 1) {
            newTasks[taskIndex - 1].priority = currentPriority;
            newTasks[taskIndex].priority = currentPriority - 1;
            break;
          }
        }
      }
      newTasks = newTasks.sort((a, b) => a.priority > b.priority);
      return {
        tasks: newTasks,
        agents: newAgents,
      };
    });
  };
  handleRemoveTask = (priority) => {
    this.setState((state) => {
      // remove target task from state task array by priority param
      const newTasks = state.tasks.filter((task) => task.priority !== priority);

      // modify each task priority to realign due to removed task
      newTasks.forEach((task, index) => {
        task.priority = index + 1;
      });

      // dont touch agents, no need
      const newAgents = [...state.agents];

      return {
        tasks: newTasks,
        agents: newAgents,
      };
    });

    this.setState((state) => {
      // modify each task priority to realign due to removed task
      const newTasks = state.tasks.map((task, index) => {
        task.priority = index + 1;
        return task
      });

      // dont touch agents, no need
      const newAgents = [...state.agents];

      return {
        tasks: newTasks,
        agents: newAgents,
      };
    });

    this.state.tasks.forEach(task=> {
      console.log(`${task.task} : ${task.priority}`)
    })
  };

  render() {
    return (
      <div className="App">
        <Navbar />

        <ProjectAssignments
          agents={this.state.agents}
          tasks={this.state.tasks}
          changePriority={this.handlePriorityChange}
          removeTask={this.handleRemoveTask}
        />

        <Footer
          resetState={this.resetState}
          shuffleSchedule={this.handleShuffle}
        />
      </div>
    );
  }
}

export default App;