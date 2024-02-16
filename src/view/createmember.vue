<template>
    <div id="app">
            <newMmeberBody></newMmeberBody>
        </div>

</template>

<script>
    import newMmeberBody from '@/components/newmemberbody.vue'

    import '@/css/style.css'
    export default {
        name: 'CreateMembersView',
        components: {
            newMmeberBody
        }
    }

</script>
