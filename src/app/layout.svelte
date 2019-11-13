<style>
    main {
        @apply bg-white mx-4 my-2 p-4;
    }
</style>

<div class="px-8 pt-4 pb-2 flex items-center">
    <div class="h-8 w-8">
        <img src="/assets/logo.png" alt="Logo">
    </div>
    <span class="ml-2 font-semibold text-gray-800">Logo</span>
</div>

<main>
    <slot></slot>
</main>
