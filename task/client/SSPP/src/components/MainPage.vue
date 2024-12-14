<template>
    <div class="card">
        <Panel header="Описание сервиса">
            <p class="mp-0">
                <b>Notes SC</b> - сервис, предназначенный для создания и хранения корпоративных заметок. Он обладает высоким уровнем безопасности, что позволяет сохранять 
                конфиденциальность информации. Удобный и минималистичный интерфейс делает использование сервиса максимально простым для пользователей. Теперь процесс создание, редактирование 
                и обмен корпоротивными заметками стал ещё более эффективным благодаря Notes SC. 
                <br>
                На данный момент сервис находится в бета версии, так как мы устали сидеть на дейликах официальный релиз будет в марте 2028 года :)
            </p>

            <div class="plan">
                <Timeline :value="events" align="alternate" class="w-full md:w-20rem">
                    <template #content="slotProps">
                        {{ slotProps.item.status }}
                    </template>
                </Timeline>
            </div>
          
        </Panel>
    </div>
</template>

<script>
import Panel from 'primevue/panel';
import Timeline from 'primevue/timeline';
export default {
    name: "MainPage",
    components: {
        Panel,
        Timeline
    },
    data() {
        return {
            events: [
                { status: '(09.02.2010) Планирование'},
                { status: '(10.12.2020) Начало разработки'},
                { status: '(??.05.2024) Бета 0.1.0'},
                { status: '(??.09.2027) Фикс багов'},
                { status: '(??.03.2028) Официальный релиз'}
            ]
        };
    }

}
</script>

<style scoped>
.card {
    padding-top: 10px;
}

.plan {
    padding-top: 5%;
    padding-bottom: 5%;
}
</style>