<script>
  import { createEventDispatcher } from "svelte";

  export let calendarYearGrid;
  export let currentHalf;
  
  const months = [
    "Januar",
    "Februar",
    "Marts",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  let visibleMonths = [];
  let distributedCalendar = {};

  const dispatch = createEventDispatcher();

  function distributeCalendarItems() {
    distributedCalendar = {};
    visibleMonths = [];

    const startMonth = currentHalf === 0 ? 0 : 6;
    const endMonth = currentHalf === 0 ? 6 : 12;

    for (let i = 0; i < calendarYearGrid.length; i++) {
      const week = calendarYearGrid[i];
      for (let j = 0; j < week.days.length; j++) {
        const day = week.days[j];
        const dateObj = new Date(day.date);
        const monthIndex = dateObj.getMonth();

        if (monthIndex >= startMonth && monthIndex < endMonth) {
          if (!distributedCalendar[monthIndex]) {
            distributedCalendar[monthIndex] = {};
          }

          if (!distributedCalendar[monthIndex][week.weekNumber]) {
            distributedCalendar[monthIndex][week.weekNumber] = {
              days: [],
            };
          }

          const formattedDay = (() => {
            switch (day.dayOfWeek.toLowerCase()) {
              case "monday":
                return "M";
              case "tuesday":
                return "T";
              case "wednesday":
                return "O";
              case "thursday":
                return "T";
              case "friday":
                return "F";
              case "saturday":
                return "L";
              case "sunday":
                return "S";
              default:
                return "";
            }
          })();

          distributedCalendar[monthIndex][week.weekNumber].days.push({
            dayOfMonth: dateObj.getDate(),
            formattedDay,
            state: day.dayOfWeek.toLowerCase() === "sunday" ? 1 : 0,
            date: dateObj.getDate() + " " + (dateObj.getMonth()+1),
            weekNumber: week.weekNumber,
          });
        }
      }
    }

    if (distributedCalendar[11] && distributedCalendar[11][1]) {
      const week1 = distributedCalendar[11][1];
      delete distributedCalendar[11][1];
      distributedCalendar[11][53] = week1;
    }

    for (let i = startMonth; i < endMonth; i++) {
      visibleMonths.push({
        month: i,
        name: months[i],
      });
    }
  }

  function handleDayClick(day) {
    dispatch("dayClick", day);
  }

  $: {
    distributeCalendarItems();
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-6">
  {#each visibleMonths as month}
    <div class="p-2">
      <div class="font-bold text-lg">
        {month.name}
      </div>
      <div>
        {#if distributedCalendar[month.month]}
          {#each Object.entries(distributedCalendar[month.month]) as [weekNumber, { year, days }]}
            <div class="week relative border rounded-lg shadow">
              <div
                class="weekNumber absolute top-0 right-2 text-3xl text-gray-500"
              >
                {#if weekNumber == "53"}
                  1
                {:else}
                  {weekNumber}
                {/if}
              </div>
              {#each days.sort((a, b) => a.dayOfMonth - b.dayOfMonth) as day}
                <button
                  class="day flex w-full border-b py-1 px-2 rounded-lg
                           {day.state === 1 ? 'bg-gray-300' : 'bg-white'} 
                           hover:bg-gray-200"
                  on:click={() => handleDayClick(day)}
                  data-week={day.weekNumber}
                  data-date={day.date.toString()}
                >
                  <span>{day.dayOfMonth}&nbsp;</span>
                  <span>{day.formattedDay}</span>
                </button>
              {/each}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/each}
</div>
