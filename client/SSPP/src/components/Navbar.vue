<template>
    <div class="head">
        <img src="../assets/sclogo.svg" alt="SC logo">
        <div class="card">
        <TabMenu :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span v-bind="props.icon" />
                    <span v-bind="props.label">{{ item.label }}</span>
                </a>
            </template>
        </TabMenu>
    </div>
    </div>
    
</template>

<script>
import TabMenu from 'primevue/tabmenu';
export default {
    name: "Navbar",
    components:{
        TabMenu,
    },
    data() {
        return {
            state: "",
            items: [
                {   
                    label: 'Главная', 
                    icon: 'pi pi-globe', 
                    command: () => {
                        this.$router.push('/');
                    } },
                {
                    label: 'Notes beta(v0.1.0)',
                    icon: 'pi pi-paperclip',
                    command: () => {
                        this.$router.push('/notes');
                    }
                },
                // { label: 'External', icon: 'pi pi-link', url: 'https://vuejs.org/' }
            ]
        }
    }
}
</script>

<style scoped>
.head {
    display: inline;
}
</style>