<script>
  import { useNavigate, useLocation } from "svelte-navigator";

  const navigate = useNavigate();
  const location = useLocation();

  if (localStorage.getItem("username") === null) {
    navigate("/auth", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if localStorage.getItem("username")}
  <slot />
{/if}
