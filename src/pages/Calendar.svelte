<script>
  import { generateYearGrid } from "../util/calendarDateUtil.js";
  import CalendarItems from "../components/CalendarItems.svelte";

  let currentYear = 2024;
  let currentHalf = 0;
  let calendarYearGrid = generateYearGrid(currentYear);

  function updateYearGrid() {
    calendarYearGrid = generateYearGrid(currentYear);
  }

  function nextHalf() {
    if (currentHalf === 0) {
      currentHalf = 1;
    } else {
      currentHalf = 0;
      currentYear++;
    }
    updateYearGrid();
  }

  function prevHalf() {
    if (currentHalf === 1) {
      currentHalf = 0;
    } else {
      currentHalf = 1;
      currentYear--;
    }
    updateYearGrid();
  }

  function handleDayClick(event) {
    const clickedDay = event.detail;
    console.log("Clicked day:", clickedDay);
  }
</script>

<div
  id="calendarContainer"
  class="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg"
>
  <div class="flex justify-between items-center">
    <button class="text-4xl font-bold ml-5" on:click={prevHalf}>←</button>
    <div class="text-4xl text-center">Kalender {currentYear}</div>
    <button class="text-4xl font-bold mr-5" on:click={nextHalf}>→</button>
  </div>
  {#key currentHalf}
    <CalendarItems {calendarYearGrid} {currentHalf} on:dayClick={handleDayClick} />
  {/key}
</div>
