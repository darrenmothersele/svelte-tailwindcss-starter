<script>
    import Layout from './app/layout.svelte';
    export let name = 'World';
</script>

<style>
    h1 {
        @apply text-xl font-semibold mb-4;
    }
</style>

<Layout>
    <h1>Hello {name}!</h1>
    <p>Welcome to the starter kit for using Svelte and Tailwind CSS.</p>
</Layout>
