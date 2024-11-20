<script>
  export let tableHeaders;
  export let items;
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
  <table
    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden"
  >
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        {#each Object.keys(tableHeaders[0]) as headerKey}
          <th scope="col" class="px-6 py-3">
            {tableHeaders[0][headerKey]}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each items as item}
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {#each Object.keys(item) as key}
            <td class="px-6 py-4">{item[key]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
