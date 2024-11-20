<script>
  import toast, { Toaster } from "svelte-french-toast";
  import { useNavigate, useLocation } from "svelte-navigator";

  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    toast.success("Logged out.", {
      position: "bottom-center",
    });
    navigate("/auth", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="nav-link active">
      <img src="/images/logo.png" class="h-11 mr-4" alt="Logo" />
    </a>
    <ul
      class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700"
    >
      <slot></slot>
    </ul>

    <a
      href="/"
      on:click|preventDefault={logout}
      class="nav-link active ml-auto"
    >
      <img src="/images/logout-64.png" class="h-8" alt="Logout" />
    </a>
  </div>
  <Toaster />
</nav>
