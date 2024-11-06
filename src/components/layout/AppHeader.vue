<template>
    <div class="header">
        <!-- header area content -->
        <div class="content">
            <div class="banner">
                <router-link v-slot="{ navigate }" :to="'/about'" custom>
                    <img src="/banner.png" class="large-banner" width="350px" @click="navigate"/>
                    <img src="/banner.png" class="small-banner" width="200px" @click="navigate"/>
                </router-link>
            </div>
            <div class="menu">
                <TabMenu :model="items">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <img src="/icon.png" style="width: 28px; margin-right: 10px;" />
                                <span v-bind="props.label">{{ item.label }}</span>
                            </a>
                        </router-link>
                    </template>
                </TabMenu>
                <Button type="button" icon="pi pi-bars" @click="toggle" aria-haspopup="true"
                    aria-controls="overlay_menu"></Button>
                <Menu ref="popupMenu" id="overlay_menu" :model="items" :popup="true">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                            <a :href="href" v-bind="props.action" @click="navigate">
                                <span v-bind="props.label">{{ item.label }}</span>
                            </a>
                        </router-link>
                    </template>
                </Menu>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { jwtDecode } from "jwt-decode";
import { JwtPayload, MenuItem } from '../../interfaces/interface';
import { onMounted, ref } from 'vue';
const items = ref<MenuItem[]>([
    { label: '關於我們', route: '/about' },
    { label: '經營團隊', route: '/manager' },
    { label: '活動資訊', route: '/activity' },
]);
const popupMenu = ref();
const toggle = (event: any) => {
    popupMenu.value.toggle(event);
}
const authCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        const payload = jwtDecode<JwtPayload>(jwt);
        if (payload.roles.includes('ROLE_ADMIN')) {
            items.value.push({label: '後台管理', route: '/admin'});
        }
    }
}
onMounted( () => {
    authCheck();
})
</script>

<style scoped>
.header {
    height: 100px;
    background-color: #ffffff;
}
.content {
    position: absolute;
    left: 8%;
    width: 92%;
    padding-top: 10px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
}

.banner {
    position: relative;
}

.large-banner {
    display: block;
    cursor: pointer;
}

.small-banner {
    display: none;
    cursor: pointer;
}

.menu {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding-top: 20px;
    font-size: 25px;
}

.p-button {
    display: none;
}

@media (max-width: 800px) {
    .header {
        height: 60px;
        background-color: #ffffff;
    }

    .content {
        position: absolute;
        left: 5%;
        width: 95%;
        padding-top: 10px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
    }

    .large-banner {
        display: none;
        cursor: pointer;
    }

    .small-banner {
        display: block;
        cursor: pointer;
    }

    .menu {
        display: flex;
        flex-direction: row-reverse;
        padding-top: 5px;
        padding-right:5px;
        width: 100%;
    }

    .p-tabmenu {
        display: none;
    }

    .p-button {
        display: block;
        background-color: rgba(23, 187, 239);
        width: 35px;
        height: 35px;
    }
}
</style>