import todo from './assets/Day1/todo-bg.jpg'
import day1 from './assets/Day1/day1.PNG'
import checked from './assets/Day1/checked.png'
import unchecked from './assets/Day1/unchecked.png'
import todoicon from './assets/Day1/icon.png'
import trash from './assets/Day11/trash.svg'
import edit from './assets/Day11/edit.svg'

import sunset from './assets/Day2/sunset.jpg'
import clear from './assets/Day2/clear.png'
import cloud from './assets/Day2/cloud.png'
import drizzle from './assets/Day2/drizzle.png'
import humidity from './assets/Day2/humidity.png'
import rain from './assets/Day2/rain.png'
import search from './assets/Day2/search.png'
import snow from './assets/Day2/snow.png'
import wind from './assets/Day2/wind.png'

import bg from './assets/Day5/bg.png'
import bg6 from './assets/Day6/bg6.jpg'
export const images = {
    todo,
    day1,
    checked,
    unchecked,
    todoicon
}
export const day2imgs = {
  clear,
  cloud,
  drizzle,
  humidity,
  rain,
  search,
  snow,
  wind,
  sunset
}
export const day5img = {
  bg,
}
export const day6img = {
  bg6,
}

export const day11img = {
  trash,
  edit,
}
export const project = [
    {
      day:'Day1',
      title:'Todo App',
      description:'A simple app to add,edit and delete tasks',
      Concepts:'State management, list rendering, events',
    },
    {
      day:'Day2',
      title:'Weather App',
      description:'Fetch weather data from a public OpenWeatherMap API',
      Concepts:'Axios API, state management, conditional rendering',
    },
    {
      day:'Day3',
      title:'BMI Calculator App',
      description:'',
      Concepts:'useState, conditional rendering, DOM manipulation, event handling.',
    },
    {
      day:'Day4',
      title:'Digital Clock App',
      description:' Display the current time that updates every second for different time zones, Display the timer with stop and restart options',
      Concepts:'state management, useEffect, and setInterval',
    },
    {
      day:'Day5',
      title:'Recipe Card Generator',
      description:'Used spoonacular API to Create Recipe Card.',
      Concepts: 'API requests, Axios, mapping data, useRef hook, state management, conditional rendering.',
    },
    {
      day:'Day6',
      title:'Random Joke Generator',
      description:'Fetch random jokes from an API and display them.',
      Concepts: 'useEffect, API calls, displaying dynamic data.',
    },
    {
      day:'Day7',
      title:'Calculator',
      description:'Build a basic calculator with buttons for operations like add, subtract, multiply, and divide.',
      Concepts: 'state management, event handling.',
    },
    {
      day:'Day8',
      title:'Color Picker',
      description:'A tool that allows users to pick colors from a color palette. Based on the chosen color and mode, the app dynamically fetches and displays a matching color scheme in real-time',
      Concepts: 'State management, dynamic styling, API calls',
    },
    {
      day:'Day9',
      title:'Password Strength Checker',
      description:'Check the strength of a password based on length, numbers, and special characters.',
      Concepts: 'Form handling, regular expressions.',
    },
    {
      day:'Day10',
      title:'Budget Tracker',
      description:'Track expenses and income, and calculate the balance.',
      Concepts: 'useState, input handling, list rendering.',
    },
    {
      day:'Day11',
      title:'Notes App',
      description:'Create a note-taking app that allows adding, editing, and deleting notes.',
      Concepts: 'State management, CRUD operations.',
    },
  ];


 