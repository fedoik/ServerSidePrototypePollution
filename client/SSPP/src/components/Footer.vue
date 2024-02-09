<template>
    <footer>
        <!-- <h1>here</h1> -->
        <div class="contacts">
            <i class="pi pi-telegram"></i>
            <a href="https://t.me/fed01k">Created by</a>
        </div>
    </footer>
   </template>
   

<script>

export default {
    name: "Footer",
    components: {

    },
    data() {
        return {
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times'
                }
            ]
        };
    }

}
</script>

<style scoped>

/* footer {
    background: #eee;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
} */

footer {
  background: #eee;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contacts a {
  color: green;
  padding-left: 10px;
}

i {
    color: green;
}
</style>