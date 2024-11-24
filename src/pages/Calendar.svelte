<script>
  import { generateYearGrid } from "../util/calendarDateUtil.js";
  import CalendarItems from "../components/CalendarItems.svelte";

  let currentYear = 2024;
  let currentHalf = 0;
  let calendarYearGrid = generateYearGrid(currentYear);

  let weekDays = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
  let selectedWeek = [];
  let isModalOpen = false;
  let weekNumber;

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
    weekNumber = clickedDay.weekNumber;
    const clickedDate = new Date(currentYear, parseInt(clickedDay.date.split(" ")[1]) - 1, clickedDay.dayOfMonth);
    const startOfWeek = new Date(clickedDate);
    const dayOfWeek = (clickedDate.getDay() + 6) % 7 +1;
    startOfWeek.setDate(clickedDate.getDate() - dayOfWeek);
    
    selectedWeek = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        day: weekDays[index],
        date: date.toLocaleDateString(),
      };
    });

    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
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

{#if isModalOpen}
<div id="default-modal" tabindex="-1" class="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
  <div class="bg-white rounded-lg shadow w-11/12 max-w-4xl h-5/6 overflow-auto">
    <div class="sticky top-0 bg-white z-10 flex items-center justify-between p-4 md:p-5 border-b rounded-t">
      <h3 class="text-xl font-semibold text-gray-900">Uge {weekNumber} overblik</h3>
      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" on:click={closeModal}>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>
    </div>
    <div class="p-4 md:p-5">
      <table class="w-full text-sm text-left text-gray-500 border-collapse border border-gray-300">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-2 border border-gray-300 text-center">Tidsregistrering</th>
            {#each selectedWeek as { day, date }}
              <th class="p-2 border border-gray-300 text-center">{day}<br/><span class="text-xs">{date}</span></th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each Array.from({ length: 24 }, (_, i) => i + 1) as hour}
          <tr>
            <td class="p-2 border border-gray-300 text-center">{hour.toString().padStart(2, "0")}:00</td>
            {#each selectedWeek as _}
              <td class="p-2 border border-gray-300"></td>
            {/each}
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="sticky bottom-0 bg-white z-10 flex items-center p-4 md:p-5 border-t">
      <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" on:click={closeModal}>
        Luk
      </button>
    </div>
  </div>
</div>
{/if}

