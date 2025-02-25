import todo from './assets/Day1/todo-bg.jpg'
import day1 from './assets/Day1/day1.PNG'
import checked from './assets/Day1/checked.png'
import unchecked from './assets/Day1/unchecked.png'
import todoicon from './assets/Day1/icon.png'

import sunset from './assets/Day2/sunset.jpg'
import clear from './assets/Day2/clear.png'
import cloud from './assets/Day2/cloud.png'
import drizzle from './assets/Day2/drizzle.png'
import humidity from './assets/Day2/humidity.png'
import rain from './assets/Day2/rain.png'
import search from './assets/Day2/search.png'
import snow from './assets/Day2/snow.png'
import wind from './assets/Day2/wind.png'

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
    }
  ];