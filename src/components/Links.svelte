<script>
  import { Link } from "svelte-navigator";
  export let nameText;
  export let pathText;
</script>

<li>
  <Link
    to={pathText}
    class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg 
          dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
  >
    <span>{nameText}</span>
  </Link>
</li>
