<script setup lang="ts">
const props = defineProps<{
    pageCount: number;
}>();
</script>

<template>
    <nav>
        <ul>
            <li v-for="i in pageCount" v-bind:key="i">
                <RouterLink :to="{ name: 'blog', query: { page: i } }">{{
                        i
                }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
    margin: 20px 10px;

    li {
        display: inline-block;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid gray;
            color: black;
            margin: 5px;
            text-decoration: none;

            &:hover {
                background-color: lightgray;
            }
        }
    }
}
</style>