<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { fetchPost } from "../util/api.js";
  import { BASE_URL } from "../stores/generalStore.js";
  import { navigate, useLocation } from "svelte-navigator";
  import toast, { Toaster } from "svelte-french-toast";

  const location = useLocation();

  const {
    form: form1,
    errors: errors1,
    handleChange: handleChange1,
    handleSubmit: handleSubmit1,
  } = createForm({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup.string().email().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const body = {
        username: values.username,
        password: values.password,
      };
      const result = await fetchPost($BASE_URL + "/auth/login", body);
      if (result) {
        localStorage.setItem("username", result.username);
        localStorage.setItem("token", result.token);
        localStorage.setItem("roles", result.roles);
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, { replace: true });
      } else {
        toast.error("Error processing login.", {
          position: "bottom-center",
        });
      }
    },
  });
</script>

<div class="authcard relative md:px-10 pt-20">
  <div class="flex flex-col items-center px-6 py-8 md:h-full lg:py-0">
    <div
      class="w-full bg-white rounded-lg shadow dark:border mx-auto md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="mt-2 text-sm font-medium text-gray-900 dark:text-red-500 text-center"
      >
        Log ind for at komme videre
      </div>
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="space-y-4 md:space-y-6" on:submit={handleSubmit1}>
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your username</label
            >
            <input
              type="email"
              name="username"
              on:change={handleChange1}
              on:blur={handleChange1}
              bind:value={$form1.username}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@email.dk"
            />
            {#if $errors1.username}
              <small>{$errors1.username}</small>
            {/if}
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              on:change={handleChange1}
              on:blur={handleChange1}
              bind:value={$form1.password}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {#if $errors1.password}
              <small>{$errors1.password}</small>
            {/if}
          </div>
          <button
            type="submit"
            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >Log ind</button
          >
        </form>
      </div>
    </div>
  </div>
  <Toaster />
</div>
